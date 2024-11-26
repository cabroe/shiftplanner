package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"shift-planner/api/internal/handlers"
	"shift-planner/api/internal/models"
	"time"

	"github.com/gorilla/mux"
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
	dsn := fmt.Sprintf("host=%s user=postgres password=postgres dbname=shiftplanner port=5432 sslmode=disable", dbHost)n
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

	// Auto-Migration in korrekter Reihenfolge
	db.AutoMigrate(&models.Department{}) // Erst Department
	db.AutoMigrate(&models.Employee{})   // Dann Employee
	db.AutoMigrate(&models.ShiftType{})
	db.AutoMigrate(&models.Shift{})      // Dann Shifts
	db.AutoMigrate(&models.ShiftBlock{}) // Zuletzt ShiftBlocks

	// Router initialisieren
	router := mux.NewRouter()

	// Handler definieren
	shiftHandler := handlers.NewShiftHandler(db)
	employeeHandler := handlers.NewEmployeeHandler(db)
	shiftTypeHandler := handlers.NewShiftTypeHandler(db)
	shiftBlockHandler := handlers.NewShiftBlockHandler(db)
	departmentHandler := handlers.NewDepartmentHandler(db)

	// Department Routen
	router.HandleFunc("/api/departments", departmentHandler.GetDepartments).Methods("GET")
	router.HandleFunc("/api/departments", departmentHandler.CreateDepartment).Methods("POST")
	router.HandleFunc("/api/departments/{id}", departmentHandler.GetDepartment).Methods("GET")
	router.HandleFunc("/api/departments/{id}", departmentHandler.UpdateDepartment).Methods("PUT")
	router.HandleFunc("/api/departments/{id}", departmentHandler.DeleteDepartment).Methods("DELETE")

	// ShiftType Routen
	router.HandleFunc("/api/shifts", shiftHandler.GetShifts).Methods("GET")
	router.HandleFunc("/api/shifts", shiftHandler.CreateShift).Methods("POST")
	router.HandleFunc("/api/shifts/{id}", shiftHandler.GetShift).Methods("GET")
	router.HandleFunc("/api/shifts/{id}", shiftHandler.UpdateShift).Methods("PUT")
	router.HandleFunc("/api/shifts/{id}", shiftHandler.DeleteShift).Methods("DELETE")

	// ShiftBlock Routen
	router.HandleFunc("/api/employees", employeeHandler.GetEmployees).Methods("GET")
	router.HandleFunc("/api/employees", employeeHandler.CreateEmployee).Methods("POST")
	router.HandleFunc("/api/employees/{id}", employeeHandler.GetEmployee).Methods("GET")
	router.HandleFunc("/api/employees/{id}", employeeHandler.UpdateEmployee).Methods("PUT")
	router.HandleFunc("/api/employees/{id}", employeeHandler.DeleteEmployee).Methods("DELETE")

	// ShiftType Routen
	router.HandleFunc("/api/shifttypes", shiftTypeHandler.GetShiftTypes).Methods("GET")
	router.HandleFunc("/api/shifttypes", shiftTypeHandler.CreateShiftType).Methods("POST")
	router.HandleFunc("/api/shifttypes/{id}", shiftTypeHandler.GetShiftType).Methods("GET")
	router.HandleFunc("/api/shifttypes/{id}", shiftTypeHandler.UpdateShiftType).Methods("PUT")
	router.HandleFunc("/api/shifttypes/{id}", shiftTypeHandler.DeleteShiftType).Methods("DELETE")

	// ShiftBlock Routen
	router.HandleFunc("/api/shiftblocks", shiftBlockHandler.GetShiftBlocks).Methods("GET")
	router.HandleFunc("/api/shiftblocks", shiftBlockHandler.CreateShiftBlock).Methods("POST")
	router.HandleFunc("/api/shiftblocks/{id}", shiftBlockHandler.GetShiftBlock).Methods("GET")
	router.HandleFunc("/api/shiftblocks/{id}", shiftBlockHandler.UpdateShiftBlock).Methods("PUT")
	router.HandleFunc("/api/shiftblocks/{id}", shiftBlockHandler.DeleteShiftBlock).Methods("DELETE")

	log.Println("Server startet auf Port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
