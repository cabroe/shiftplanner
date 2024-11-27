import { Department } from './department'

export interface Employee {
  ID: number  // Änderung von ID? zu ID
  first_name: string
  last_name: string
  email: string
  department_id: number
  department?: Department
}
