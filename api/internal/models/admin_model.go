package models

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Username    string `json:"username" gorm:"unique"`
	Password    string `json:"-"` // "-" verhindert, dass das Passwort im JSON erscheint
	Email       string `json:"email" gorm:"unique"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	IsActive    bool   `json:"is_active" gorm:"default:true"`
	IsSuperUser bool   `json:"is_super_user" gorm:"default:false"`
}
