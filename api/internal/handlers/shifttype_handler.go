package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"shift-planner/api/internal/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type ShiftTypeHandler struct {
	db *gorm.DB
}

func NewShiftTypeHandler(db *gorm.DB) *ShiftTypeHandler {
	return &ShiftTypeHandler{db: db}
}

func (h *ShiftTypeHandler) GetShiftTypes(w http.ResponseWriter, r *http.Request) {
	var shiftTypes []models.ShiftType
	result := h.db.Find(&shiftTypes)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Abrufen der Schichttypen",
			Data:    nil,
		}
		fmt.Printf("GetShiftTypes Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichttypen erfolgreich abgerufen",
		Data:    shiftTypes,
	}
	fmt.Printf("GetShiftTypes Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTypeHandler) CreateShiftType(w http.ResponseWriter, r *http.Request) {
	var shiftType models.ShiftType
	if err := json.NewDecoder(r.Body).Decode(&shiftType); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("CreateShiftType Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	result := h.db.Create(&shiftType)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Erstellen des Schichttyps",
			Data:    nil,
		}
		fmt.Printf("CreateShiftType Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichttyp erfolgreich erstellt",
		Data:    shiftType,
	}
	fmt.Printf("CreateShiftType Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTypeHandler) GetShiftType(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftType models.ShiftType

	result := h.db.First(&shiftType, params["id"])
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichttyp nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("GetShiftType Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichttyp erfolgreich abgerufen",
		Data:    shiftType,
	}
	fmt.Printf("GetShiftType Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTypeHandler) UpdateShiftType(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftType models.ShiftType

	if result := h.db.First(&shiftType, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichttyp nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("UpdateShiftType Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&shiftType); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("UpdateShiftType Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Save(&shiftType)

	response := ApiResponse{
		Success: true,
		Message: "Schichttyp erfolgreich aktualisiert",
		Data:    shiftType,
	}
	fmt.Printf("UpdateShiftType Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftTypeHandler) DeleteShiftType(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftType models.ShiftType

	if result := h.db.First(&shiftType, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichttyp nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("DeleteShiftType Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if result := h.db.Delete(&shiftType); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Löschen des Schichttyps",
			Data:    nil,
		}
		fmt.Printf("DeleteShiftType Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichttyp erfolgreich gelöscht",
		Data:    nil,
	}
	fmt.Printf("DeleteShiftType Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
