package models

import (
	"time"
)

type Admin struct {
	ID          uint       `json:"id"`         // statt ID
	CreatedAt   time.Time  `json:"created_at"` // statt CreatedAt
	UpdatedAt   time.Time  `json:"updated_at"` // statt UpdatedAt
	DeletedAt   *time.Time `json:"deleted_at"` // statt DeletedAt
	Username    string     `json:"username" gorm:"unique"`
	Password    string     `json:"-"` // "-" verhindert, dass das Passwort im JSON erscheint
	Email       string     `json:"email" gorm:"unique"`
	FirstName   string     `json:"first_name"`
	LastName    string     `json:"last_name"`
	IsActive    bool       `json:"is_active" gorm:"default:true"`
	IsSuperUser bool       `json:"is_super_user" gorm:"default:false"`
}
