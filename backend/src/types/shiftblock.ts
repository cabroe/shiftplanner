import { Employee } from './employee'
import { ShiftType } from './shifttype'

export interface ShiftBlock {
  ID: number
  name: string
  description: string
  start_date: string
  color: string
  employee_id: number
  employee: Employee
  monday: { shift_type_id: number, shift_type: ShiftType }
  tuesday: { shift_type_id: number, shift_type: ShiftType }
  wednesday: { shift_type_id: number, shift_type: ShiftType }
  thursday: { shift_type_id: number, shift_type: ShiftType }
  friday: { shift_type_id: number, shift_type: ShiftType }
  saturday: { shift_type_id: number, shift_type: ShiftType }
  sunday: { shift_type_id: number, shift_type: ShiftType }
}
