package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"shift-planner/api/internal/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type ShiftBlockHandler struct {
	db *gorm.DB
}

func NewShiftBlockHandler(db *gorm.DB) *ShiftBlockHandler {
	return &ShiftBlockHandler{db: db}
}

func (h *ShiftBlockHandler) GetShiftBlocks(w http.ResponseWriter, r *http.Request) {
	var shiftBlocks []models.ShiftBlock
	result := h.db.Preload("Employee").
		Preload("Monday.ShiftType").
		Preload("Tuesday.ShiftType").
		Preload("Wednesday.ShiftType").
		Preload("Thursday.ShiftType").
		Preload("Friday.ShiftType").
		Preload("Saturday.ShiftType").
		Preload("Sunday.ShiftType").
		Find(&shiftBlocks)

	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Abrufen der Schichtblöcke",
			Data:    nil,
		}
		fmt.Printf("GetShiftBlocks Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichtblöcke erfolgreich abgerufen",
		Data:    shiftBlocks,
	}
	fmt.Printf("GetShiftBlocks Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftBlockHandler) CreateShiftBlock(w http.ResponseWriter, r *http.Request) {
	var shiftBlock models.ShiftBlock
	if err := json.NewDecoder(r.Body).Decode(&shiftBlock); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("CreateShiftBlock Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	result := h.db.Create(&shiftBlock)
	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Erstellen des Schichtblocks",
			Data:    nil,
		}
		fmt.Printf("CreateShiftBlock Error: %v\n", response)
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
		First(&shiftBlock, shiftBlock.ID)

	response := ApiResponse{
		Success: true,
		Message: "Schichtblock erfolgreich erstellt",
		Data:    shiftBlock,
	}
	fmt.Printf("CreateShiftBlock Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftBlockHandler) GetShiftBlock(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftBlock models.ShiftBlock

	result := h.db.Preload("Employee").
		Preload("Monday.ShiftType").
		Preload("Tuesday.ShiftType").
		Preload("Wednesday.ShiftType").
		Preload("Thursday.ShiftType").
		Preload("Friday.ShiftType").
		Preload("Saturday.ShiftType").
		Preload("Sunday.ShiftType").
		First(&shiftBlock, params["id"])

	if result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichtblock nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("GetShiftBlock Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichtblock erfolgreich abgerufen",
		Data:    shiftBlock,
	}
	fmt.Printf("GetShiftBlock Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftBlockHandler) UpdateShiftBlock(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftBlock models.ShiftBlock

	if result := h.db.First(&shiftBlock, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichtblock nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("UpdateShiftBlock Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&shiftBlock); err != nil {
		response := ApiResponse{
			Success: false,
			Message: "Ungültige Eingabedaten",
			Data:    nil,
		}
		fmt.Printf("UpdateShiftBlock Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	h.db.Save(&shiftBlock)

	h.db.Preload("Employee").
		Preload("Monday.ShiftType").
		Preload("Tuesday.ShiftType").
		Preload("Wednesday.ShiftType").
		Preload("Thursday.ShiftType").
		Preload("Friday.ShiftType").
		Preload("Saturday.ShiftType").
		Preload("Sunday.ShiftType").
		First(&shiftBlock, shiftBlock.ID)

	response := ApiResponse{
		Success: true,
		Message: "Schichtblock erfolgreich aktualisiert",
		Data:    shiftBlock,
	}
	fmt.Printf("UpdateShiftBlock Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *ShiftBlockHandler) DeleteShiftBlock(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var shiftBlock models.ShiftBlock

	if result := h.db.First(&shiftBlock, params["id"]); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Schichtblock nicht gefunden",
			Data:    nil,
		}
		fmt.Printf("DeleteShiftBlock Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(response)
		return
	}

	if result := h.db.Delete(&shiftBlock); result.Error != nil {
		response := ApiResponse{
			Success: false,
			Message: "Fehler beim Löschen des Schichtblocks",
			Data:    nil,
		}
		fmt.Printf("DeleteShiftBlock Error: %v\n", response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ApiResponse{
		Success: true,
		Message: "Schichtblock erfolgreich gelöscht",
		Data:    nil,
	}
	fmt.Printf("DeleteShiftBlock Success: %+v\n", response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
