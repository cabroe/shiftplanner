import { Department } from './department'

export interface Employee {
  ID: number
  first_name: string
  last_name: string
  email: string
  color: string
  department_id: number
  department?: Department
}
