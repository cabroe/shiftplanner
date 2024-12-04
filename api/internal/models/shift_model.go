package models

import (
	"time"
)

type Shift struct {
	ID          uint       `json:"id"`         // statt ID
	CreatedAt   time.Time  `json:"created_at"` // statt CreatedAt
	UpdatedAt   time.Time  `json:"updated_at"` // statt UpdatedAt
	DeletedAt   *time.Time `json:"deleted_at"` // statt DeletedAt
	EmployeeID  uint       `json:"employee_id"`
	ShiftTypeID uint       `json:"shift_type_id"`
	ShiftType   ShiftType  `json:"shift_type"`
	StartTime   time.Time  `json:"start_time"`
	EndTime     time.Time  `json:"end_time"`
	Description string     `json:"description"`
}
