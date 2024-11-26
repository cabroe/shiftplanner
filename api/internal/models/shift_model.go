package models

import (
	"time"

	"gorm.io/gorm"
)

type Shift struct {
	gorm.Model
	EmployeeID  uint      `json:"employee_id"`
	ShiftTypeID uint      `json:"shift_type_id"`
	ShiftType   ShiftType `json:"shift_type"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
	Description string    `json:"description"`
}
