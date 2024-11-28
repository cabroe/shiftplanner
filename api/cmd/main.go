package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"shift-planner/api/internal/models"
	"shift-planner/api/internal/routes"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	var dbHost = os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}

	dsn := fmt.Sprintf("host=%s user=postgres password=postgres dbname=shiftplanner port=5432 sslmode=disable", dbHost)
	var db *gorm.DB
	var err error
	maxRetries := 5

	for i := 0; i < maxRetries; i++ {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			log.Printf("Datenbankverbindung erfolgreich hergestellt")
			break
		}
		log.Printf("Verbindungsversuch %d von %d, nächster Versuch in 5 Sekunden...", i+1, maxRetries)
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		log.Fatal("Fehler beim Verbinden zur Datenbank:", err)
	}

	// Datenbank-Reset
	db.Migrator().DropTable(&models.ShiftTemplate{})
	db.Migrator().DropTable(&models.Shift{})
	db.Migrator().DropTable(&models.Employee{})
	db.Migrator().DropTable(&models.ShiftType{})
	db.Migrator().DropTable(&models.Department{})
	log.Printf("Datenbank-Reset erfolgreich")

	// Auto-Migration
	db.AutoMigrate(&models.Department{})
	db.AutoMigrate(&models.Employee{})
	db.AutoMigrate(&models.ShiftType{})
	db.AutoMigrate(&models.Shift{})
	db.AutoMigrate(&models.ShiftTemplate{})
	log.Printf("Datenbank-Migration erfolgreich")

	models.SeedDatabase(db)
	log.Printf("Datenbank erfolgreich mit Standardwerten befüllt")

	router := mux.NewRouter()
	routes.SetupRoutes(router, db)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Println("Server startet auf Port 8080...")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server-Fehler: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Server wird heruntergefahren...")

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("Server Shutdown-Fehler: %v", err)
	}

	log.Println("Server wurde sauber beendet")
}
