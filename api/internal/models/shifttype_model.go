package models

import "gorm.io/gorm"

type ShiftType struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	StartTime   string  `json:"start_time"`
	EndTime     string  `json:"end_time"`
	Shifts      []Shift `json:"shifts"`
}
