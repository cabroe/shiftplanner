package routes

import (
	"shift-planner/api/internal/handlers"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func SetupRoutes(router *mux.Router, db *gorm.DB) {
	// Handler initialisieren
	shiftHandler := handlers.NewShiftHandler(db)
	employeeHandler := handlers.NewEmployeeHandler(db)
	shiftTypeHandler := handlers.NewShiftTypeHandler(db)
	shiftBlockHandler := handlers.NewShiftBlockHandler(db)
	departmentHandler := handlers.NewDepartmentHandler(db)

	// API routes
	api := router.PathPrefix("/api").Subrouter()

	// Employee routes
	api.HandleFunc("/employees", employeeHandler.GetEmployees).Methods("GET")
	api.HandleFunc("/employees", employeeHandler.CreateEmployee).Methods("POST")
	api.HandleFunc("/employees/{id}", employeeHandler.GetEmployee).Methods("GET")
	api.HandleFunc("/employees/{id}", employeeHandler.UpdateEmployee).Methods("PUT")
	api.HandleFunc("/employees/{id}", employeeHandler.DeleteEmployee).Methods("DELETE")

	// ShiftType routes
	api.HandleFunc("/shifttypes", shiftTypeHandler.GetShiftTypes).Methods("GET")
	api.HandleFunc("/shifttypes", shiftTypeHandler.CreateShiftType).Methods("POST")
	api.HandleFunc("/shifttypes/{id}", shiftTypeHandler.GetShiftType).Methods("GET")
	api.HandleFunc("/shifttypes/{id}", shiftTypeHandler.UpdateShiftType).Methods("PUT")
	api.HandleFunc("/shifttypes/{id}", shiftTypeHandler.DeleteShiftType).Methods("DELETE")

	// ShiftBlock routes
	api.HandleFunc("/shiftblocks", shiftBlockHandler.GetShiftBlocks).Methods("GET")
	api.HandleFunc("/shiftblocks", shiftBlockHandler.CreateShiftBlock).Methods("POST")
	api.HandleFunc("/shiftblocks/{id}", shiftBlockHandler.GetShiftBlock).Methods("GET")
	api.HandleFunc("/shiftblocks/{id}", shiftBlockHandler.UpdateShiftBlock).Methods("PUT")
	api.HandleFunc("/shiftblocks/{id}", shiftBlockHandler.DeleteShiftBlock).Methods("DELETE")

	// Department routes
	api.HandleFunc("/departments", departmentHandler.GetDepartments).Methods("GET")
	api.HandleFunc("/departments", departmentHandler.CreateDepartment).Methods("POST")
	api.HandleFunc("/departments/{id}", departmentHandler.GetDepartment).Methods("GET")
	api.HandleFunc("/departments/{id}", departmentHandler.UpdateDepartment).Methods("PUT")
	api.HandleFunc("/departments/{id}", departmentHandler.DeleteDepartment).Methods("DELETE")

	// Shift routes
	api.HandleFunc("/shifts", shiftHandler.GetShifts).Methods("GET")
	api.HandleFunc("/shifts", shiftHandler.CreateShift).Methods("POST")
	api.HandleFunc("/shifts/{id}", shiftHandler.GetShift).Methods("GET")
	api.HandleFunc("/shifts/{id}", shiftHandler.UpdateShift).Methods("PUT")
	api.HandleFunc("/shifts/{id}", shiftHandler.DeleteShift).Methods("DELETE")
}
