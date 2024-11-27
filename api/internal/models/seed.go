package models

import (
	"time"

	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB) {
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
		Description: "Frühschicht 6:00-14:00",
	}
	db.Create(&früh)

	spät := ShiftType{
		Name:        "Spät",
		Description: "Spätschicht 14:00-22:00",
	}
	db.Create(&spät)

	nacht := ShiftType{
		Name:        "Nacht",
		Description: "Nachtschicht 22:00-6:00",
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

	// Beispiel-Shifts erstellen
	db.Create(&Shift{
		EmployeeID:  maxMustermann.ID,
		ShiftTypeID: früh.ID,
		StartTime:   time.Now(),
		EndTime:     time.Now().Add(8 * time.Hour),
		Description: "Reguläre Frühschicht",
	})

	// Beispiel-ShiftBlock erstellen
	db.Create(&ShiftBlock{
		Name:        "Standardwoche",
		StartDate:   time.Now(),
		EmployeeID:  maxMustermann.ID,
		Description: "Normale Arbeitswoche",
		Monday:      ShiftDay{ShiftTypeID: früh.ID},
		Tuesday:     ShiftDay{ShiftTypeID: früh.ID},
		Wednesday:   ShiftDay{ShiftTypeID: spät.ID},
		Thursday:    ShiftDay{ShiftTypeID: spät.ID},
		Friday:      ShiftDay{ShiftTypeID: nacht.ID},
	})
}
