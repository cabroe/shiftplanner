import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Department } from "@/types"
import { getColorOptions } from "@/lib/colors"

interface DepartmentFormProps {
  department?: Department | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function DepartmentForm({ department, onSubmit }: DepartmentFormProps) {
  const [formData, setFormData] = useState<Department>({
    ID: 0,
    name: '',
    description: '',
    color: getColorOptions()[0].value
  })

  useEffect(() => {
    const initializeForm = async () => {
      if (department?.ID) {
        const response = await fetch(`${API_URL}/api/departments/${department.ID}`)
        const data = await response.json()
        setFormData(data.data)
      }
    }
    
    initializeForm()
  }, [department])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = department?.ID 
      ? `${API_URL}/api/departments/${department.ID}`
      : `${API_URL}/api/departments`
    
    const response = await fetch(url, {
      method: department?.ID ? 'PUT' : 'POST',
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
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
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
        {department?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}
