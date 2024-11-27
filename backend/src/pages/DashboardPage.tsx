import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Employee, Department, ShiftBlock, ShiftType } from "@/types"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const DashboardPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [shiftBlocks, setShiftBlocks] = useState<ShiftBlock[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [empResponse, deptResponse, blockResponse, typeResponse] = await Promise.all([
        fetch(`${API_URL}/api/employees`),
        fetch(`${API_URL}/api/departments`),
        fetch(`${API_URL}/api/shiftblocks`),
        fetch(`${API_URL}/api/shifttypes`)
      ])

      const [empData, deptData, blockData, typeData] = await Promise.all([
        empResponse.json(),
        deptResponse.json(),
        blockResponse.json(),
        typeResponse.json()
      ])

      setEmployees(empData.data)
      setDepartments(deptData.data)
      setShiftBlocks(blockData.data)
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
            <CardTitle>Schichtblöcke</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shiftBlocks.length}</div>
            <p className="text-xs text-muted-foreground">Aktive Schichtblöcke</p>
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
