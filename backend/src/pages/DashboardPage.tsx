import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Employee, Department, ShiftTemplate, ShiftType } from "@/types"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const DashboardPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [shiftTemplates, setShiftTemplates] = useState<ShiftTemplate[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [empResponse, deptResponse, templateResponse, typeResponse] = await Promise.all([
        fetch(`${API_URL}/api/employees`),
        fetch(`${API_URL}/api/departments`),
        fetch(`${API_URL}/api/shifttemplates`),
        fetch(`${API_URL}/api/shifttypes`)
      ])

      const [empData, deptData, templateData, typeData] = await Promise.all([
        empResponse.json(),
        deptResponse.json(),
        templateResponse.json(),
        typeResponse.json()
      ])

      setEmployees(empData.data)
      setDepartments(deptData.data)
      setShiftTemplates(templateData.data)
      setShiftTypes(typeData.data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Übersicht</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Mitarbeiter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Aktive Mitarbeiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schichtvorlagen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shiftTemplates.length}</div>
            <p className="text-xs text-muted-foreground">Aktive Schichtvorlagen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Abteilungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Gesamt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schichttypen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shiftTypes.length}</div>
            <p className="text-xs text-muted-foreground">Verfügbare Schichttypen</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
