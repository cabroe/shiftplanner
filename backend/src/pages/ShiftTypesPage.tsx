import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ShiftTypesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Schichttypen Übersicht</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Regelschicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zuschlag: 0%</p>
            <p>Mindestbesetzung: Ja</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wochenendschicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zuschlag: 25%</p>
            <p>Mindestbesetzung: Ja</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feiertagsschicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zuschlag: 50%</p>
            <p>Mindestbesetzung: Nein</p>
            <p>Status: Aktiv</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ShiftTypesPage
