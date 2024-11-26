package models

import "gorm.io/gorm"

type ShiftType struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Shifts      []Shift `json:"shifts"`
}
