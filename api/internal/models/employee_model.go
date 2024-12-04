package models

import (
	"time"
)

type Employee struct {
	ID           uint       `json:"id"`         // statt ID
	CreatedAt    time.Time  `json:"created_at"` // statt CreatedAt
	UpdatedAt    time.Time  `json:"updated_at"` // statt UpdatedAt
	DeletedAt    *time.Time `json:"deleted_at"` // statt DeletedAt
	FirstName    string     `json:"first_name"`
	LastName     string     `json:"last_name"`
	Email        string     `json:"email" gorm:"unique"`
	Password     string     `json:"password"`
	Color        string     `json:"color"`
	DepartmentID *uint      `json:"department_id"` // Pointer zu uint macht das Feld nullable
	Department   Department `json:"department"`
	Shifts       []Shift    `json:"shifts"`
}
