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
	// Docker oder Localhost?
	var dbHost = os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}

	// Datenbankverbindung konfigurieren
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
	db.Migrator().DropTable(&models.ShiftBlock{})
	db.Migrator().DropTable(&models.Shift{})
	db.Migrator().DropTable(&models.Employee{})
	db.Migrator().DropTable(&models.ShiftType{})
	db.Migrator().DropTable(&models.Department{})
	log.Printf("Datenbank-Reset erfolgreich")

	// Auto-Migration in korrekter Reihenfolge
	db.AutoMigrate(&models.Department{})
	db.AutoMigrate(&models.Employee{})
	db.AutoMigrate(&models.ShiftType{})
	db.AutoMigrate(&models.Shift{})
	db.AutoMigrate(&models.ShiftBlock{})
	log.Printf("Datenbank-Migration erfolgreich")

	models.SeedDatabase(db)
	log.Printf("Datenbank erfolgreich mit Standardwerten befüllt")

	// Router initialisieren
	router := mux.NewRouter()

	// Routes setup
	routes.SetupRoutes(router, db)

	// CORS Konfiguration
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	// Handler mit CORS wrappen
	handler := c.Handler(router)

	// Server mit Timeout-Einstellungen
	server := &http.Server{
		Addr:         ":8080",
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful Shutdown
	go func() {
		log.Println("Server startet auf Port 8080...")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server-Fehler: %v", err)
		}
	}()

	// Auf Shutdown-Signal warten
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
