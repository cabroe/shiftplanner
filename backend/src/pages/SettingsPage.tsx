import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const SettingsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Einstellungen</h1>
      
      <div className="grid gap-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Allgemeine Einstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">E-Mail Benachrichtigungen</p>
                <p className="text-sm text-muted-foreground">Erhalte Updates über Schichtänderungen</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dunkelmodus</p>
                <p className="text-sm text-muted-foreground">Aktiviere dunkles Farbschema</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schichtplan Einstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatische Planung</p>
                <p className="text-sm text-muted-foreground">KI-basierte Schichtplanung aktivieren</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Wochenend-Rotation</p>
                <p className="text-sm text-muted-foreground">Faire Verteilung der Wochenendschichten</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline">Zurücksetzen</Button>
          <Button>Speichern</Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
