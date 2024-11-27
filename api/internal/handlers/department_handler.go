package handlers

import (
	"encoding/json"
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
	result := h.db.Find(&departments)

	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Abrufen der Abteilungen",
			Data:    nil,
		}
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
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *DepartmentHandler) GetDepartment(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var department models.Department

	result := h.db.First(&department, params["id"])
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Abteilung nicht gefunden",
			Data:    nil,
		}
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
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Delete(&department)

	response := ApiResponse{
		Success: true,
		Message: "Abteilung erfolgreich gelöscht",
		Data:    nil,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
