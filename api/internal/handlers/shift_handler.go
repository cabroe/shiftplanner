package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"shift-planner/api/internal/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type ShiftHandler struct {
	db *gorm.DB
}

func NewShiftHandler(db *gorm.DB) *ShiftHandler {
	return &ShiftHandler{db: db}
}

func (h *ShiftHandler) GetShift(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shift models.Shift

	result := h.db.Preload("ShiftType").First(&shift, params["id"])
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schicht nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("GetShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schicht erfolgreich abgerufen",
		Data:    shift,
	}
	fmt.Printf("GetShift Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftHandler) GetShifts(w http.ResponseWriter, r *http.Request) {
	var shifts []models.Shift
	result := h.db.Preload("ShiftType").Find(&shifts)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Abrufen der Schichten",
			Data:    nil,
		}
		fmt.Printf("GetShifts Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichten erfolgreich abgerufen",
		Data:    shifts,
	}
	fmt.Printf("GetShifts Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftHandler) CreateShift(w http.ResponseWriter, r *http.Request) {
	var shift models.Shift
	if err := json.NewDecoder(r.Body).Decode(&shift); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("CreateShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	var shiftType models.ShiftType
	if result := h.db.First(&shiftType, shift.ShiftTypeID); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültiger Schichttyp",
			Data:    nil,
		}
		fmt.Printf("CreateShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	result := h.db.Create(&shift)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Erstellen der Schicht",
			Data:    nil,
		}
		fmt.Printf("CreateShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Preload("ShiftType").First(&shift, shift.ID)

	response := ApiResponse{
		Success: true,
		Message: "Schicht erfolgreich erstellt",
		Data:    shift,
	}
	fmt.Printf("CreateShift Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftHandler) UpdateShift(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shift models.Shift

	if result := h.db.First(&shift, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schicht nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("UpdateShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&shift); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("UpdateShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Save(&shift)

	response := ApiResponse{
		Success: true,
		Message: "Schicht erfolgreich aktualisiert",
		Data:    shift,
	}
	fmt.Printf("UpdateShift Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftHandler) DeleteShift(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shift models.Shift

	if result := h.db.First(&shift, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schicht nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("DeleteShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if result := h.db.Delete(&shift); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Löschen der Schicht",
			Data:    nil,
		}
		fmt.Printf("DeleteShift Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schicht erfolgreich gelöscht",
		Data:    nil,
	}
	fmt.Printf("DeleteShift Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
