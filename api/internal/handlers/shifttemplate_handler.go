package handlers

import (
	"encoding/json"
	"net/http"
	"shift-planner/api/internal/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type ShiftTemplateHandler struct {
	db *gorm.DB
}

func NewShiftTemplateHandler(db *gorm.DB) *ShiftTemplateHandler {
	return &ShiftTemplateHandler{db: db}
}

func (h *ShiftTemplateHandler) GetShiftTemplates(w http.ResponseWriter, r *http.Request) {
	var shiftTemplates []models.ShiftTemplate
	result := h.db.Preload("Employee").
		Preload("Monday.ShiftType").
		Preload("Tuesday.ShiftType").
		Preload("Wednesday.ShiftType").
		Preload("Thursday.ShiftType").
		Preload("Friday.ShiftType").
		Preload("Saturday.ShiftType").
		Preload("Sunday.ShiftType").
		Find(&shiftTemplates)

	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Abrufen der Schichtvorlagen",
			Data:    nil,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichtvorlagen erfolgreich abgerufen",
		Data:    shiftTemplates,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTemplateHandler) CreateShiftTemplate(w http.ResponseWriter, r *http.Request) {
	var shiftTemplate models.ShiftTemplate
	if err := json.NewDecoder(r.Body).Decode(&shiftTemplate); err != nil {
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

	if shiftTemplate.EmployeeID != nil {
		var employee models.Employee
		if result := h.db.First(&employee, *shiftTemplate.EmployeeID); result.Error != nil {
			response := ApiResponse{
				Success: false,
				Message: "Mitarbeiter nicht gefunden",
				Data:    nil,
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	result := h.db.Create(&shiftTemplate)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Erstellen der Schichtvorlage",
			Data:    nil,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Preload("Employee").
		Preload("Monday.ShiftType").
		Preload("Tuesday.ShiftType").
		Preload("Wednesday.ShiftType").
		Preload("Thursday.ShiftType").
		Preload("Friday.ShiftType").
		Preload("Saturday.ShiftType").
		Preload("Sunday.ShiftType").
		First(&shiftTemplate, shiftTemplate.ID)

	response := ApiResponse{
		Success: true,
		Message: "Schichtvorlage erfolgreich erstellt",
		Data:    shiftTemplate,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTemplateHandler) GetShiftTemplate(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftTemplate models.ShiftTemplate

	result := h.db.Preload("Employee").
		Preload("Monday.ShiftType").
		Preload("Tuesday.ShiftType").
		Preload("Wednesday.ShiftType").
		Preload("Thursday.ShiftType").
		Preload("Friday.ShiftType").
		Preload("Saturday.ShiftType").
		Preload("Sunday.ShiftType").
		First(&shiftTemplate, params["id"])

	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichtvorlage nicht gefunden",
			Data:    nil,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichtvorlage erfolgreich abgerufen",
		Data:    shiftTemplate,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTemplateHandler) UpdateShiftTemplate(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftTemplate models.ShiftTemplate

	if result := h.db.First(&shiftTemplate, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichtvorlage nicht gefunden",
			Data:    nil,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&shiftTemplate); err != nil {
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

	if shiftTemplate.EmployeeID != nil {
		var employee models.Employee
		if result := h.db.First(&employee, *shiftTemplate.EmployeeID); result.Error != nil {
			response := ApiResponse{
				Success: false,
				Message: "Mitarbeiter nicht gefunden",
				Data:    nil,
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	h.db.Save(&shiftTemplate)

	h.db.Preload("Employee").
		Preload("Monday.ShiftType").
		Preload("Tuesday.ShiftType").
		Preload("Wednesday.ShiftType").
		Preload("Thursday.ShiftType").
		Preload("Friday.ShiftType").
		Preload("Saturday.ShiftType").
		Preload("Sunday.ShiftType").
		First(&shiftTemplate, shiftTemplate.ID)

	response := ApiResponse{
		Success: true,
		Message: "Schichtvorlage erfolgreich aktualisiert",
		Data:    shiftTemplate,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTemplateHandler) DeleteShiftTemplate(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftTemplate models.ShiftTemplate

	if result := h.db.First(&shiftTemplate, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichtvorlage nicht gefunden",
			Data:    nil,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if result := h.db.Delete(&shiftTemplate); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Löschen der Schichtvorlage",
			Data:    nil,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichtvorlage erfolgreich gelöscht",
		Data:    nil,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
