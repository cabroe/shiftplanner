package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"shift-planner/api/internal/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type EmployeeHandler struct {
	db *gorm.DB
}

func NewEmployeeHandler(db *gorm.DB) *EmployeeHandler {
	return &EmployeeHandler{db: db}
}

func (h *EmployeeHandler) GetEmployees(w http.ResponseWriter, r *http.Request) {
	var employees []models.Employee
	result := h.db.Preload("Department").
		Order("first_name ASC, last_name ASC"). // Sortierung nach Nachname, dann Vorname
		Find(&employees)

	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Abrufen der Mitarbeiter",
			Data:    nil,
		}
		log.Printf("GetEmployees Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Mitarbeiter erfolgreich abgerufen",
		Data:    employees,
	}
	log.Printf("GetEmployees Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *EmployeeHandler) CreateEmployee(w http.ResponseWriter, r *http.Request) {
	var employee models.Employee
	if err := json.NewDecoder(r.Body).Decode(&employee); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		log.Printf("CreateEmployee Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	result := h.db.Create(&employee)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Erstellen des Mitarbeiters",
			Data:    nil,
		}
		log.Printf("CreateEmployee Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Preload("Department").First(&employee, employee.ID)

	response := ApiResponse{
		Success: true,
		Message: "Mitarbeiter erfolgreich erstellt",
		Data:    employee,
	}
	log.Printf("CreateEmployee Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *EmployeeHandler) GetEmployee(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var employee models.Employee

	result := h.db.Preload("Department").First(&employee, params["id"])
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Mitarbeiter nicht gefunden",
			Data:    nil,
		}
		log.Printf("GetEmployee Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Mitarbeiter erfolgreich abgerufen",
		Data:    employee,
	}
	log.Printf("GetEmployee Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *EmployeeHandler) UpdateEmployee(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var employee models.Employee

	if result := h.db.First(&employee, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Mitarbeiter nicht gefunden",
			Data:    nil,
		}
		log.Printf("UpdateEmployee Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&employee); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		log.Printf("UpdateEmployee Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Save(&employee)
	h.db.Preload("Department").First(&employee, employee.ID)

	response := ApiResponse{
		Success: true,
		Message: "Mitarbeiter erfolgreich aktualisiert",
		Data:    employee,
	}
	log.Printf("UpdateEmployee Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *EmployeeHandler) DeleteEmployee(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var employee models.Employee

	if result := h.db.First(&employee, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Mitarbeiter nicht gefunden",
			Data:    nil,
		}
		log.Printf("DeleteEmployee Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Delete(&employee)

	response := ApiResponse{
		Success: true,
		Message: "Mitarbeiter erfolgreich gelöscht",
		Data:    nil,
	}
	log.Printf("DeleteEmployee Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
