package models

import (
	"gorm.io/gorm"
)

type ShiftBlock struct {
	gorm.Model
	Name        string   `json:"name"`
	EmployeeID  uint     `json:"employee_id"`
	Description string   `json:"description"`
	Monday      ShiftDay `json:"monday" gorm:"embedded;embedded_prefix:monday_"`
	Tuesday     ShiftDay `json:"tuesday" gorm:"embedded;embedded_prefix:tuesday_"`
	Wednesday   ShiftDay `json:"wednesday" gorm:"embedded;embedded_prefix:wednesday_"`
	Thursday    ShiftDay `json:"thursday" gorm:"embedded;embedded_prefix:thursday_"`
	Friday      ShiftDay `json:"friday" gorm:"embedded;embedded_prefix:friday_"`
	Saturday    ShiftDay `json:"saturday" gorm:"embedded;embedded_prefix:saturday_"`
	Sunday      ShiftDay `json:"sunday" gorm:"embedded;embedded_prefix:sunday_"`
}

type ShiftDay struct {
	ShiftTypeID uint      `json:"shift_type_id"`
	ShiftType   ShiftType `json:"shift_type" gorm:"foreignKey:ShiftTypeID"`
}
