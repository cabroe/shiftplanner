import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Department {
  ID?: number
  name: string
  description: string
}

interface DepartmentFormProps {
  department?: Department | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function DepartmentForm({ department, onSubmit }: DepartmentFormProps) {
  const [formData, setFormData] = useState<Department>({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (department) {
      setFormData(department)
    }
  }, [department])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = department?.ID 
      ? `${API_URL}/api/departments/${department.ID}`
      : `${API_URL}/api/departments`
    
    fetch(url, {
      method: department?.ID ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(() => onSubmit())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <Button type="submit" className="w-full">
        {department?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}
