package models

import "gorm.io/gorm"

type Department struct {
	gorm.Model
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Employees   []Employee `json:"employees"`
}
