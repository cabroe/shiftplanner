package models

import (
	"math/rand"
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB) {
	// Admin
	var adminCount int64
	db.Model(&Admin{}).Count(&adminCount)

	if adminCount == 0 {
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

	// Departments
	itDepartment := Department{
		Name:        "IT",
		Description: "Informationstechnologie Abteilung",
		Color:       "#3b82f6",
	}
	db.Create(&itDepartment)

	hrDepartment := Department{
		Name:        "HR",
		Description: "Human Resources Abteilung",
		Color:       "#22c55e",
	}
	db.Create(&hrDepartment)

	marketingDepartment := Department{
		Name:        "Marketing",
		Description: "Marketing Abteilung",
		Color:       "#f43f5e",
	}
	db.Create(&marketingDepartment)

	salesDepartment := Department{
		Name:        "Vertrieb",
		Description: "Vertriebsabteilung",
		Color:       "#a855f7",
	}
	db.Create(&salesDepartment)

	// ShiftTypes
	früh := ShiftType{
		Name:        "Früh",
		Description: "Frühschicht",
		StartTime:   "06:00",
		EndTime:     "14:00",
		Color:       "#0ea5e9",
	}
	db.Create(&früh)

	spät := ShiftType{
		Name:        "Spät",
		Description: "Spätschicht",
		StartTime:   "14:00",
		EndTime:     "22:00",
		Color:       "#6366f1",
	}
	db.Create(&spät)

	nacht := ShiftType{
		Name:        "Nacht",
		Description: "Nachtschicht",
		StartTime:   "22:00",
		EndTime:     "06:00",
		Color:       "#8b5cf6",
	}
	db.Create(&nacht)

	bereitschaft := ShiftType{
		Name:        "Bereitschaft",
		Description: "Bereitschaftsdienst",
		StartTime:   "00:00",
		EndTime:     "24:00",
		Color:       "#84cc16",
	}
	db.Create(&bereitschaft)

	teilzeit := ShiftType{
		Name:        "Teilzeit",
		Description: "Teilzeitschicht",
		StartTime:   "09:00",
		EndTime:     "15:00",
		Color:       "#f59e0b",
	}
	db.Create(&teilzeit)

	// 30 Mitarbeiter
	employeeNames := []struct {
		FirstName string
		LastName  string
		Color     string
	}{
		{"Anna", "Schmidt", "#ef4444"},
		{"Thomas", "Weber", "#f97316"},
		{"Sarah", "Meyer", "#84cc16"},
		{"Michael", "Wagner", "#06b6d4"},
		{"Laura", "Fischer", "#8b5cf6"},
		{"Felix", "Koch", "#ec4899"},
		{"Julia", "Becker", "#f43f5e"},
		{"David", "Hoffmann", "#10b981"},
		{"Lisa", "Schulz", "#6366f1"},
		{"Jonas", "Richter", "#14b8a6"},
		{"Nina", "Wolf", "#f59e0b"},
		{"Tim", "Schäfer", "#3b82f6"},
		{"Lena", "Bauer", "#a855f7"},
		{"Paul", "Klein", "#d946ef"},
		{"Marie", "Krause", "#0ea5e9"},
		{"Lukas", "Schwarz", "#22c55e"},
		{"Sophie", "Schneider", "#be123c"},
		{"Jan", "Zimmermann", "#7c3aed"},
		{"Emma", "König", "#0d9488"},
		{"Finn", "Lang", "#b91c1c"},
		{"Hannah", "Schmitt", "#c2410c"},
		{"Leon", "Werner", "#15803d"},
		{"Mia", "Peters", "#1d4ed8"},
		{"Ben", "Neumann", "#7e22ce"},
		{"Clara", "Schmitz", "#be185d"},
		{"Noah", "Krüger", "#115e59"},
		{"Lea", "Friedrich", "#854d0e"},
		{"Luis", "Scholz", "#1e40af"},
		{"Sophia", "Möller", "#86198f"},
		{"Max", "Hartmann", "#991b1b"},
	}

	var employees []Employee
	for _, name := range employeeNames {
		department := itDepartment
		if rand.Float32() < 0.7 {
			departments := []Department{itDepartment, hrDepartment, marketingDepartment, salesDepartment}
			department = departments[rand.Intn(len(departments))]
		}

		employee := Employee{
			FirstName:    name.FirstName,
			LastName:     name.LastName,
			Email:        strings.ToLower(name.FirstName + "." + name.LastName + "@example.com"),
			Password:     "password123",
			DepartmentID: &department.ID,
			Color:        name.Color,
		}
		db.Create(&employee)
		employees = append(employees, employee)
	}

	// Schichtvorlagen
	shiftTemplates := []struct {
		Name        string
		Description string
		Color       string
		ShiftTypes  [7]uint // Mo-So
	}{
		{
			Name:        "Frühschicht",
			Description: "Nur Frühschichten",
			Color:       "#0ea5e9",
			ShiftTypes:  [7]uint{früh.ID, früh.ID, früh.ID, früh.ID, früh.ID, 0, 0},
		},
		{
			Name:        "Spätschicht",
			Description: "Nur Spätschichten",
			Color:       "#6366f1",
			ShiftTypes:  [7]uint{spät.ID, spät.ID, spät.ID, spät.ID, spät.ID, 0, 0},
		},
		{
			Name:        "Nachtschicht",
			Description: "Nur Nachtschichten",
			Color:       "#8b5cf6",
			ShiftTypes:  [7]uint{nacht.ID, nacht.ID, nacht.ID, nacht.ID, nacht.ID, 0, 0},
		},
		{
			Name:        "Früh/Spät Mix",
			Description: "Gemischte Schichten",
			Color:       "#22c55e",
			ShiftTypes:  [7]uint{früh.ID, spät.ID, früh.ID, spät.ID, früh.ID, 0, 0},
		},
		{
			Name:        "Teilzeit",
			Description: "Teilzeitschichten",
			Color:       "#f59e0b",
			ShiftTypes:  [7]uint{teilzeit.ID, teilzeit.ID, teilzeit.ID, 0, 0, 0, 0},
		},
	}

	for _, template := range shiftTemplates {
		employeeID := employees[rand.Intn(len(employees))].ID
		db.Create(&ShiftTemplate{
			Name:        template.Name,
			Description: template.Description,
			Color:       template.Color,
			EmployeeID:  &employeeID,
			Monday:      ShiftDay{ShiftTypeID: template.ShiftTypes[0]},
			Tuesday:     ShiftDay{ShiftTypeID: template.ShiftTypes[1]},
			Wednesday:   ShiftDay{ShiftTypeID: template.ShiftTypes[2]},
			Thursday:    ShiftDay{ShiftTypeID: template.ShiftTypes[3]},
			Friday:      ShiftDay{ShiftTypeID: template.ShiftTypes[4]},
			Saturday:    ShiftDay{ShiftTypeID: template.ShiftTypes[5]},
			Sunday:      ShiftDay{ShiftTypeID: template.ShiftTypes[6]},
		})
	}
}
