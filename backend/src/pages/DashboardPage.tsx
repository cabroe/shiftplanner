import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Übersicht</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Mitarbeiter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Aktive Mitarbeiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schichten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Aktive Schichten</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Abteilungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Gesamt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Auslastung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">Schichtabdeckung</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
