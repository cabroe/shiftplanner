import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Employee, ShiftBlock, ShiftType } from "@/types"

interface ShiftBlockFormProps {
  shiftBlock?: ShiftBlock | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const WEEKDAYS = [
  { key: 'monday', label: 'Montag' },
  { key: 'tuesday', label: 'Dienstag' },
  { key: 'wednesday', label: 'Mittwoch' },
  { key: 'thursday', label: 'Donnerstag' },
  { key: 'friday', label: 'Freitag' },
  { key: 'saturday', label: 'Samstag' },
  { key: 'sunday', label: 'Sonntag' }
]

export function ShiftBlockForm({ shiftBlock, onSubmit }: ShiftBlockFormProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])
  const [formData, setFormData] = useState<ShiftBlock>({
    ID: 0,
    name: '',
    description: '',
    start_date: '',
    color: '#000000',
    employee_id: 0,
    employee: {
      ID: 0,
      first_name: '',
      last_name: '',
      email: '',
      department_id: 0,
      color: ''
    },
    monday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    tuesday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    wednesday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    thursday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    friday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    saturday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    sunday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } }
  })

  useEffect(() => {
    const initializeForm = async () => {
      const [empResponse, typeResponse] = await Promise.all([
        fetch(`${API_URL}/api/employees`),
        fetch(`${API_URL}/api/shifttypes`)
      ])
      
      const [empData, typeData] = await Promise.all([
        empResponse.json(),
        typeResponse.json()
      ])
      
      setEmployees(empData.data)
      setShiftTypes(typeData.data)

      if (shiftBlock?.ID) {
        const blockResponse = await fetch(`${API_URL}/api/shiftblocks/${shiftBlock.ID}`)
        const blockData = await blockResponse.json()
        setFormData(blockData.data)
      }
    }

    initializeForm()
  }, [shiftBlock])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = {
      ...formData,
      employee_id: Number(formData.employee_id),
      monday: { shift_type_id: Number(formData.monday.shift_type_id) },
      tuesday: { shift_type_id: Number(formData.tuesday.shift_type_id) },
      wednesday: { shift_type_id: Number(formData.wednesday.shift_type_id) },
      thursday: { shift_type_id: Number(formData.thursday.shift_type_id) },
      friday: { shift_type_id: Number(formData.friday.shift_type_id) },
      saturday: { shift_type_id: Number(formData.saturday.shift_type_id) },
      sunday: { shift_type_id: Number(formData.sunday.shift_type_id) }
    }
    
    const url = shiftBlock?.ID 
      ? `${API_URL}/api/shiftblocks/${shiftBlock.ID}`
      : `${API_URL}/api/shiftblocks`
    
    const response = await fetch(url, {
      method: shiftBlock?.ID ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData)
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
        <Input
          id="description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="start_date">Startdatum *</Label>
        <Input
          id="start_date"
          type="date"
          value={formData.start_date?.split('T')[0]}
          onChange={e => setFormData({...formData, start_date: e.target.value})}
          required
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="color">Farbe *</Label>
        <Input
          id="color"
          type="color"
          value={formData.color}
          onChange={e => setFormData({...formData, color: e.target.value})}
          required
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="employee">Mitarbeiter *</Label>
        <Select 
          value={formData.employee_id?.toString()}
          onValueChange={value => {
            const selectedEmployee = employees.find(emp => emp.ID.toString() === value)
            if (selectedEmployee) {
              setFormData({
                ...formData,
                employee_id: parseInt(value),
                employee: selectedEmployee
              })
            }
          }}
          required
        >
          <SelectTrigger>
            <SelectValue>
              {formData.employee ? 
                `${formData.employee.first_name} ${formData.employee.last_name}` : 
                "Mitarbeiter auswählen"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {employees.map(emp => (
              <SelectItem key={emp.ID} value={emp.ID.toString()}>
                {`${emp.first_name} ${emp.last_name}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {WEEKDAYS.map(({ key, label }) => (
        <div key={key} className="grid w-full gap-2">
          <Label htmlFor={key}>{label} *</Label>
          <Select 
            value={(formData[key as keyof typeof formData] as { shift_type_id: number })?.shift_type_id?.toString()}
            onValueChange={value => {
              const selectedShiftType = shiftTypes.find(type => type.ID.toString() === value)
              setFormData({
                ...formData,
                [key]: { 
                  shift_type_id: parseInt(value),
                  shift_type: selectedShiftType
                }
              })
            }}
            required
          >
            <SelectTrigger>
              <SelectValue>
                {(formData[key as keyof typeof formData] as any)?.shift_type?.name || "Schichttyp auswählen"}
              </SelectValue>
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
