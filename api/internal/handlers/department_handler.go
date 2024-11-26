package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"shift-planner/api/internal/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type DepartmentHandler struct {
	db *gorm.DB
}

func NewDepartmentHandler(db *gorm.DB) *DepartmentHandler {
	return &DepartmentHandler{db: db}
}

func (h *DepartmentHandler) GetDepartments(w http.ResponseWriter, r *http.Request) {
	var departments []models.Department
	result := h.db.Preload("Employees").Find(&departments)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Abrufen der Abteilungen",
			Data:    nil,
		}
		fmt.Printf("GetDepartments Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Abteilungen erfolgreich abgerufen",
		Data:    departments,
	}
	fmt.Printf("GetDepartments Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *DepartmentHandler) CreateDepartment(w http.ResponseWriter, r *http.Request) {
	var department models.Department
	if err := json.NewDecoder(r.Body).Decode(&department); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("CreateDepartment Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	result := h.db.Create(&department)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Erstellen der Abteilung",
			Data:    nil,
		}
		fmt.Printf("CreateDepartment Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Abteilung erfolgreich erstellt",
		Data:    department,
	}
	fmt.Printf("CreateDepartment Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *DepartmentHandler) GetDepartment(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var department models.Department

	result := h.db.Preload("Employees").First(&department, params["id"])
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Abteilung nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("GetDepartment Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Abteilung erfolgreich abgerufen",
		Data:    department,
	}
	fmt.Printf("GetDepartment Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *DepartmentHandler) UpdateDepartment(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var department models.Department

	if result := h.db.First(&department, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Abteilung nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("UpdateDepartment Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&department); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("UpdateDepartment Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Save(&department)

	response := ApiResponse{
		Success: true,
		Message: "Abteilung erfolgreich aktualisiert",
		Data:    department,
	}
	fmt.Printf("UpdateDepartment Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *DepartmentHandler) DeleteDepartment(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var department models.Department

	if result := h.db.First(&department, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Abteilung nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("DeleteDepartment Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if result := h.db.Delete(&department); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Löschen der Abteilung",
			Data:    nil,
		}
		fmt.Printf("DeleteDepartment Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Abteilung erfolgreich gelöscht",
		Data:    nil,
	}
	fmt.Printf("DeleteDepartment Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
