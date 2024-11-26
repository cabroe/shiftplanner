package models

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	FirstName    string     `json:"first_name"`
	LastName     string     `json:"last_name"`
	Email        string     `json:"email" gorm:"unique"`
	Password     string     `json:"password"`
	DepartmentID uint       `json:"department_id"`
	Department   Department `json:"department"`
	Shifts       []Shift    `json:"shifts"`
}
