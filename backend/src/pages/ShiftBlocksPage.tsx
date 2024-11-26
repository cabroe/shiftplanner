import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ShiftBlocksPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Schichtblöcke Übersicht</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Frühschicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zeitraum: 06:00 - 14:00</p>
            <p>Pausenzeit: 30 min</p>
            <p>Mitarbeiter benötigt: 5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spätschicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zeitraum: 14:00 - 22:00</p>
            <p>Pausenzeit: 30 min</p>
            <p>Mitarbeiter benötigt: 4</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nachtschicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zeitraum: 22:00 - 06:00</p>
            <p>Pausenzeit: 45 min</p>
            <p>Mitarbeiter benötigt: 3</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ShiftBlocksPage
