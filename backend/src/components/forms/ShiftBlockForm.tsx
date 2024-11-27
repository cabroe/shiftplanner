import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Employee {
  ID: number
  first_name: string
  last_name: string
}

interface ShiftType {
  ID: number
  name: string
}

interface ShiftBlock {
  ID?: number
  name: string
  description: string
  start_date: string
  employee_id: number
  monday: { shift_type_id: number }
  tuesday: { shift_type_id: number }
  wednesday: { shift_type_id: number }
  thursday: { shift_type_id: number }
  friday: { shift_type_id: number }
  saturday: { shift_type_id: number }
  sunday: { shift_type_id: number }
}

interface ShiftBlockFormProps {
  shiftBlock?: ShiftBlock | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function ShiftBlockForm({ shiftBlock, onSubmit }: ShiftBlockFormProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])

  const defaultValues: ShiftBlock = {
    name: '',
    description: '',
    start_date: '',
    employee_id: 0,
    monday: { shift_type_id: 0 },
    tuesday: { shift_type_id: 0 },
    wednesday: { shift_type_id: 0 },
    thursday: { shift_type_id: 0 },
    friday: { shift_type_id: 0 },
    saturday: { shift_type_id: 0 },
    sunday: { shift_type_id: 0 }
  }

  const [formData, setFormData] = useState<ShiftBlock>(defaultValues)

  useEffect(() => {
    setFormData(shiftBlock || defaultValues)
    loadEmployees()
    loadShiftTypes()
  }, [shiftBlock])

  const loadEmployees = async () => {
    const response = await fetch(`${API_URL}/api/employees`)
    const data = await response.json()
    setEmployees(data.data)
  }

  const loadShiftTypes = async () => {
    const response = await fetch(`${API_URL}/api/shifttypes`)
    const data = await response.json()
    setShiftTypes(data.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = shiftBlock?.ID 
      ? `${API_URL}/api/shiftblocks/${shiftBlock.ID}`
      : `${API_URL}/api/shiftblocks`
    
    await fetch(url, {
      method: shiftBlock?.ID ? 'PUT' : 'POST',
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
        <Input
          id="description"
          value={formData.description || ''}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="start_date">Startdatum</Label>
        <Input
          id="start_date"
          type="date"
          value={formData.start_date?.split('T')[0] || ''}
          onChange={e => setFormData({...formData, start_date: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="employee">Mitarbeiter</Label>
        <Select 
          value={formData.employee_id?.toString() || '0'}
          onValueChange={value => setFormData({...formData, employee_id: parseInt(value)})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Mitarbeiter auswählen" />
          </SelectTrigger>
          <SelectContent>
            {employees.map(emp => (
              <SelectItem key={emp.ID} value={emp.ID.toString()}>
                {emp.first_name} {emp.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
        <div key={day} className="grid w-full gap-2">
          <Label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</Label>
            <Select 
                value={(formData[day as keyof typeof formData] as { shift_type_id: number })?.shift_type_id?.toString() || '0'}
                onValueChange={value => setFormData({
                    ...formData,
                    [day]: { shift_type_id: parseInt(value) }
                })}
            >
            <SelectTrigger>
              <SelectValue placeholder="Schichttyp auswählen" />
            </SelectTrigger>
            <SelectContent>
              {shiftTypes.map(type => (
                <SelectItem key={type.ID} value={type.ID.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <Button type="submit" className="w-full">
        {shiftBlock?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}