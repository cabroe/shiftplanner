import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DepartmentForm } from "@/components/forms/DepartmentForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

interface Department {
  ID: number
  name: string
  description: string
  employees: any[]
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadDepartments()
  }, [])

  const loadDepartments = () => {
    fetch(`${API_URL}/api/departments`)
      .then(res => res.json())
      .then(response => setDepartments(response.data))
  }

  const handleDelete = (id: number) => {
    if (confirm('Abteilung wirklich löschen?')) {
      fetch(`${API_URL}/api/departments/${id}`, {
        method: 'DELETE'
      }).then(() => loadDepartments())
    }
  }

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department)
    setIsDialogOpen(true)
  }

  const handleFormSubmit = () => {
    setIsDialogOpen(false)
    setSelectedDepartment(null)
    loadDepartments()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Abteilungen</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedDepartment(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Neue Abteilung
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedDepartment ? 'Abteilung bearbeiten' : 'Neue Abteilung'}
              </DialogTitle>
            </DialogHeader>
            <DepartmentForm 
              department={selectedDepartment} 
              onSubmit={handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Mitarbeiter</TableHead>
            <TableHead className="w-[100px]">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map(department => (
            <TableRow key={department.ID}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.description}</TableCell>
              <TableCell>{department.employees?.length || 0}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(department)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(department.ID)}>
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

export default DepartmentsPage
