import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ShiftPlannerPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Schichtplan Übersicht</h1>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Aktuelle Woche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center">
                <p className="font-bold">Mo</p>
                <p>Früh: 10</p>
                <p>Spät: 8</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Di</p>
                <p>Früh: 12</p>
                <p>Spät: 8</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Mi</p>
                <p>Früh: 10</p>
                <p>Spät: 8</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Do</p>
                <p>Früh: 11</p>
                <p>Spät: 7</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Fr</p>
                <p>Früh: 9</p>
                <p>Spät: 6</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Sa</p>
                <p>Früh: 5</p>
                <p>Spät: 4</p>
              </div>
              <div className="text-center">
                <p className="font-bold">So</p>
                <p>Früh: 4</p>
                <p>Spät: 4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ShiftPlannerPage
