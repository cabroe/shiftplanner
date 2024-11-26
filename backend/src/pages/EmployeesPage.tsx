import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmployeeForm } from "@/components/forms/EmployeeForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

interface Employee {
  ID: number
  first_name: string
  last_name: string
  email: string
  department_id: number
  department: {
    name: string
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = () => {
    fetch(`${API_URL}/api/employees`)
      .then(res => res.json())
      .then(response => setEmployees(response.data))
  }

  const handleDelete = (id: number) => {
    if (confirm('Mitarbeiter wirklich löschen?')) {
      fetch(`${API_URL}/api/employees/${id}`, {
        method: 'DELETE'
      }).then(() => loadEmployees())
    }
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDialogOpen(true)
  }

  const handleFormSubmit = () => {
    setIsDialogOpen(false)
    setSelectedEmployee(null)
    loadEmployees()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mitarbeiter</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedEmployee(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Neuer Mitarbeiter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedEmployee ? 'Mitarbeiter bearbeiten' : 'Neuer Mitarbeiter'}
              </DialogTitle>
            </DialogHeader>
            <EmployeeForm 
              employee={selectedEmployee} 
              onSubmit={handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Abteilung</TableHead>
            <TableHead className="w-[100px]">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee.ID}>
              <TableCell>{employee.first_name} {employee.last_name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department?.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(employee)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(employee.ID)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default EmployeesPage
