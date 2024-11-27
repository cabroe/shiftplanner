import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShiftType } from "@/types"
import { getColorOptions } from "@/lib/colors"

interface ShiftTypeFormProps {
  shiftType?: ShiftType | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const getTimeOptions = () => {
  const options = []
  for(let hour = 0; hour < 24; hour++) {
    for(let minute of ['00', '30']) {
      options.push(`${hour.toString().padStart(2, '0')}:${minute}`)
    }
  }
  return options
}

export function ShiftTypeForm({ shiftType, onSubmit }: ShiftTypeFormProps) {
  const [formData, setFormData] = useState<ShiftType>({
    ID: 0,
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    color: getColorOptions()[0].value
  })

  useEffect(() => {
    const initializeForm = async () => {
      if (shiftType?.ID) {
        const response = await fetch(`${API_URL}/api/shifttypes/${shiftType.ID}`)
        const data = await response.json()
        setFormData(data.data)
      }
    }
    
    initializeForm()
  }, [shiftType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = shiftType?.ID 
      ? `${API_URL}/api/shifttypes/${shiftType.ID}`
      : `${API_URL}/api/shifttypes`
    
    const response = await fetch(url, {
      method: shiftType?.ID ? 'PUT' : 'POST',
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
        <Label htmlFor="start_time">Startzeit *</Label>
        <Select
          value={formData.start_time}
          onValueChange={value => setFormData({...formData, start_time: value})}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Startzeit wählen" />
          </SelectTrigger>
          <SelectContent>
            {getTimeOptions().map(time => (
              <SelectItem key={time} value={time}>
                {time} Uhr
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="end_time">Endzeit *</Label>
        <Select
          value={formData.end_time}
          onValueChange={value => setFormData({...formData, end_time: value})}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Endzeit wählen" />
          </SelectTrigger>
          <SelectContent>
            {getTimeOptions().map(time => (
              <SelectItem key={time} value={time}>
                {time} Uhr
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
        {shiftType?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}
