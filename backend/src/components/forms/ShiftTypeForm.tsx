import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ShiftType {
  ID?: number
  name: string
  description: string
  start_time: string
  end_time: string
}

interface ShiftTypeFormProps {
  shiftType?: ShiftType | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function ShiftTypeForm({ shiftType, onSubmit }: ShiftTypeFormProps) {
  const defaultValues: ShiftType = {
    name: '',
    description: '',
    start_time: '',
    end_time: ''
  }

  const [formData, setFormData] = useState<ShiftType>(defaultValues)

  useEffect(() => {
    setFormData(shiftType || defaultValues)
  }, [shiftType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = shiftType?.ID 
      ? `${API_URL}/api/shifttypes/${shiftType.ID}`
      : `${API_URL}/api/shifttypes`
    
    await fetch(url, {
      method: shiftType?.ID ? 'PUT' : 'POST',
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name || ''}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="start_time">Startzeit</Label>
        <Input
          id="start_time"
          type="time"
          value={formData.start_time || ''}
          onChange={e => setFormData({...formData, start_time: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="end_time">Endzeit</Label>
        <Input
          id="end_time"
          type="time"
          value={formData.end_time || ''}
          onChange={e => setFormData({...formData, end_time: e.target.value})}
        />
      </div>

      <Button type="submit" className="w-full">
        {shiftType?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}