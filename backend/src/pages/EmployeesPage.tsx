import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EmployeesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mitarbeiter Übersicht</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Max Mustermann</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Abteilung: Entwicklung</p>
            <p>Position: Senior Developer</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anna Schmidt</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Abteilung: Marketing</p>
            <p>Position: Marketing Manager</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peter Meyer</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Abteilung: Vertrieb</p>
            <p>Position: Sales Representative</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EmployeesPage
