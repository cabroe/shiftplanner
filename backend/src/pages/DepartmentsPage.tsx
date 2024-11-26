import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DepartmentsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Abteilungen Übersicht</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Entwicklung</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Mitarbeiter: 25</p>
            <p>Leitung: Dr. Schmidt</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Mitarbeiter: 15</p>
            <p>Leitung: Anna Müller</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vertrieb</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Mitarbeiter: 30</p>
            <p>Leitung: Max Weber</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DepartmentsPage
