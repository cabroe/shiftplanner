import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Employee, Department } from "@/types"
import { getColorOptions } from "@/lib/colors"

interface EmployeeFormProps {
  employee?: Employee | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function EmployeeForm({ employee, onSubmit }: EmployeeFormProps) {
  const [departments, setDepartments] = useState<Department[]>([])
  const [formData, setFormData] = useState<Employee>({
    ID: 0,
    first_name: '',
    last_name: '',
    email: '',
    department_id: 0,
    color: getColorOptions()[0].value
  })

  useEffect(() => {
    const initializeForm = async () => {
      const deptResponse = await fetch(`${API_URL}/api/departments`)
      const deptData = await deptResponse.json()
      setDepartments(deptData.data)

      if (employee?.ID) {
        const empResponse = await fetch(`${API_URL}/api/employees/${employee.ID}`)
        const empData = await empResponse.json()
        setFormData(empData.data)
      }
    }
    
    initializeForm()
  }, [employee])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = employee?.ID 
      ? `${API_URL}/api/employees/${employee.ID}`
      : `${API_URL}/api/employees`
    
    const response = await fetch(url, {
      method: employee?.ID ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="first_name">Vorname *</Label>
        <Input
          id="first_name"
          value={formData.first_name}
          onChange={e => setFormData({...formData, first_name: e.target.value})}
          required
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="last_name">Nachname *</Label>
        <Input
          id="last_name"
          value={formData.last_name}
          onChange={e => setFormData({...formData, last_name: e.target.value})}
          required
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="department">Abteilung *</Label>
        <Select 
          value={formData.department_id?.toString()}
          onValueChange={value => {
            const selectedDepartment = departments.find(dept => dept.ID.toString() === value)
            setFormData({
              ...formData, 
              department_id: parseInt(value),
              department: selectedDepartment
            })
          }}
          required
        >
          <SelectTrigger>
            <SelectValue>
              {formData.department?.name || "Abteilung auswählen"}
            </SelectValue>
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

      <div className="grid w-full gap-2">
        <Label htmlFor="color">Farbe *</Label>
        <Select
          value={formData.color}
          onValueChange={value => setFormData({...formData, color: value})}
          required
        >
          <SelectTrigger>
            <SelectValue>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: formData.color }}
                />
                {getColorOptions().find(c => c.value === formData.color)?.label || "Farbe wählen"}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {getColorOptions().map(color => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                </div>
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
