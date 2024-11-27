package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB) {
	// Check if admin already exists
	var adminCount int64
	db.Model(&Admin{}).Count(&adminCount)

	if adminCount == 0 {
		// Admin erstellen
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
		admin := Admin{
			Username:    "admin",
			Password:    string(hashedPassword),
			Email:       "admin@example.com",
			FirstName:   "Admin",
			LastName:    "User",
			IsActive:    true,
			IsSuperUser: true,
		}
		db.Create(&admin)
	}

	// Departments erstellen
	itDepartment := Department{
		Name:        "IT",
		Description: "Informationstechnologie Abteilung",
	}
	db.Create(&itDepartment)

	hrDepartment := Department{
		Name:        "HR",
		Description: "Human Resources Abteilung",
	}
	db.Create(&hrDepartment)

	// ShiftTypes erstellen
	früh := ShiftType{
		Name:        "Früh",
		Description: "Frühschicht",
		StartTime:   "06:00",
		EndTime:     "14:00",
	}
	db.Create(&früh)

	spät := ShiftType{
		Name:        "Spät",
		Description: "Spätschicht",
		StartTime:   "14:00",
		EndTime:     "22:00",
	}
	db.Create(&spät)

	nacht := ShiftType{
		Name:        "Nacht",
		Description: "Nachtschicht",
		StartTime:   "22:00",
		EndTime:     "06:00",
	}
	db.Create(&nacht)

	// Employees erstellen
	maxMustermann := Employee{
		FirstName:    "Max",
		LastName:     "Mustermann",
		Email:        "max@example.com",
		Password:     "password123",
		DepartmentID: itDepartment.ID,
	}
	db.Create(&maxMustermann)

	erikaMusterfrau := Employee{
		FirstName:    "Erika",
		LastName:     "Musterfrau",
		Email:        "erika@example.com",
		Password:     "password123",
		DepartmentID: hrDepartment.ID,
	}
	db.Create(&erikaMusterfrau)

	// Beispiel-ShiftBlock erstellen
	db.Create(&ShiftBlock{
		Name:        "Standardwoche",
		EmployeeID:  maxMustermann.ID,
		Description: "Normale Arbeitswoche",
		Monday:      ShiftDay{ShiftTypeID: früh.ID},
		Tuesday:     ShiftDay{ShiftTypeID: früh.ID},
		Wednesday:   ShiftDay{ShiftTypeID: spät.ID},
		Thursday:    ShiftDay{ShiftTypeID: spät.ID},
		Friday:      ShiftDay{ShiftTypeID: nacht.ID},
	})
}
