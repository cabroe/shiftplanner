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

export function ShiftBlockForm({ shiftBlock, onSubmit }: ShiftBlockFormProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])
  const [formData, setFormData] = useState<ShiftBlock>({
    ID: 0,
    name: '',
    description: '',
    start_date: '',
    employee_id: 0,
    employee: {
      ID: 0,
      first_name: '',
      last_name: '',
      email: '',
      department_id: 0
    },
    monday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '' } },
    tuesday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '' } },
    wednesday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '' } },
    thursday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '' } },
    friday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '' } },
    saturday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '' } },
    sunday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '' } }
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
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
        <Label htmlFor="start_date">Startdatum</Label>
        <Input
          id="start_date"
          type="date"
          value={formData.start_date?.split('T')[0]}
          onChange={e => setFormData({...formData, start_date: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="employee">Mitarbeiter</Label>
        <Select 
          value={formData.employee_id?.toString()}
          onValueChange={(value) => {
            const selectedEmployee = employees.find(emp => emp.ID.toString() === value)
            if (selectedEmployee) {
              setFormData({
                ...formData,
                employee_id: parseInt(value),
                employee: selectedEmployee
              })
            }
          }}
        >
          <SelectTrigger>
            <SelectValue>
              {formData.employee ? `${formData.employee.first_name} ${formData.employee.last_name}` : "Mitarbeiter auswählen"}
            </SelectValue>
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
            value={(formData[day as keyof typeof formData] as { shift_type_id: number })?.shift_type_id?.toString()}
            onValueChange={value => {
              const selectedShiftType = shiftTypes.find(type => type.ID.toString() === value)
              setFormData({
                ...formData,
                [day]: { 
                  shift_type_id: parseInt(value),
                  shift_type: selectedShiftType
                }
              })
            }}
          >
            <SelectTrigger>
              <SelectValue>
                {(formData[day as keyof typeof formData] as any)?.shift_type?.name || "Schichttyp auswählen"}
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
