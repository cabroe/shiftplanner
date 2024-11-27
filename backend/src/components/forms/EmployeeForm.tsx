import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Department {
  ID: number
  name: string
}

interface Employee {
  ID?: number
  first_name: string
  last_name: string
  email: string
  department_id: number
}

interface EmployeeFormProps {
  employee?: Employee | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function EmployeeForm({ employee, onSubmit }: EmployeeFormProps) {
  const [departments, setDepartments] = useState<Department[]>([])
  
  const defaultValues: Employee = {
    first_name: '',
    last_name: '',
    email: '',
    department_id: 0
  }

  const [formData, setFormData] = useState<Employee>(defaultValues)

  useEffect(() => {
    setFormData(employee || defaultValues)
    loadDepartments()
  }, [employee])

  const loadDepartments = async () => {
    const response = await fetch(`${API_URL}/api/departments`)
    const data = await response.json()
    setDepartments(data.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = employee?.ID 
      ? `${API_URL}/api/employees/${employee.ID}`
      : `${API_URL}/api/employees`
    
    await fetch(url, {
      method: employee?.ID ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="first_name">Vorname</Label>
        <Input
          id="first_name"
          value={formData.first_name || ''}
          onChange={e => setFormData({...formData, first_name: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="last_name">Nachname</Label>
        <Input
          id="last_name"
          value={formData.last_name || ''}
          onChange={e => setFormData({...formData, last_name: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="department">Abteilung</Label>
        <Select 
          value={formData.department_id?.toString() || '0'}
          onValueChange={value => setFormData({...formData, department_id: parseInt(value)})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Abteilung auswählen" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept.ID} value={dept.ID.toString()}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        {employee?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}