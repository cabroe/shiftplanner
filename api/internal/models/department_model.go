package models

import (
	"time"
)

type Department struct {
	ID          uint       `json:"id"`         // statt ID
	CreatedAt   time.Time  `json:"created_at"` // statt CreatedAt
	UpdatedAt   time.Time  `json:"updated_at"` // statt UpdatedAt
	DeletedAt   *time.Time `json:"deleted_at"` // statt DeletedAt
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Color       string     `json:"color"`
	Employees   []Employee `json:"employees"`
}
