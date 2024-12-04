package models

import (
	"time"
)

type ShiftType struct {
	ID          uint       `json:"id"`         // statt ID
	CreatedAt   time.Time  `json:"created_at"` // statt CreatedAt
	UpdatedAt   time.Time  `json:"updated_at"` // statt UpdatedAt
	DeletedAt   *time.Time `json:"deleted_at"` // statt DeletedAt
	Name        string     `json:"name"`
	Description string     `json:"description"`
	StartTime   string     `json:"start_time"`
	EndTime     string     `json:"end_time"`
	Color       string     `json:"color"`
	Shifts      []Shift    `json:"shifts"`
}
