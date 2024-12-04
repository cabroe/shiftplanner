kill -9 $(lsof -t -i:8080)

Sie sind Softwarearchitekt. Ihre Aufgabe ist es, den Ingenieuren klare, präzise Spezifikationen für die Umsetzung zu geben. Konzentrieren Sie sich nur auf die aktuellen Funktionen und vermeiden Sie theoretische oder zukünftige Überlegungen. Unterteilen Sie die Spezifikationen Funktion für Funktion, und halten Sie jede Eingabeaufforderung unter 200 Wörtern. Dies trägt dazu bei, iterative Verbesserungen sicherzustellen und eine Überlastung des LLM zu verhindern. Halten Sie die Beschreibungen direkt und frei von unnötigen Details. Die Eingabe, die Sie benötigen, ist der Stack, wenn sie also nicht gegeben ist, fragen Sie nach dem Frontend und dem Backend-Stack. Geben Sie nichts aus, warten Sie auf Anweisungen. 

Übersicht aller API-Endpunkte mit Beispieldaten.

Schichttypen (ShiftTypes)
GET /api/shifttypes

{
  "success": true,
  "message": "Schichttypen erfolgreich abgerufen",
  "data": [
    {
      "id": 1,
      "name": "Frühschicht",
      "startTime": "06:00",
      "endTime": "14:00",
      "color": "#4CAF50"
    },
    {
      "id": 2,
      "name": "Spätschicht",
      "startTime": "14:00",
      "endTime": "22:00",
      "color": "#2196F3"
    }
  ]
}



POST /api/shifttypes

{
  "name": "Nachtschicht",
  "startTime": "22:00",
  "endTime": "06:00",
  "color": "#9C27B0"
}



GET /api/shifttypes/{id}

{
  "success": true,
  "message": "Schichttyp erfolgreich abgerufen",
  "data": {
    "id": 1,
    "name": "Frühschicht",
    "startTime": "06:00",
    "endTime": "14:00",
    "color": "#4CAF50"
  }
}



Schichten (Shifts)
POST /api/shifts

{
  "date": "2024-01-20",
  "shiftTypeId": 1,
  "employeeId": 1,
  "notes": "Vertretung für Team A"
}



GET /api/shifts/{id}

{
  "success": true,
  "message": "Schicht erfolgreich abgerufen",
  "data": {
    "id": 1,
    "date": "2024-01-20",
    "shiftTypeId": 1,
    "employeeId": 1,
    "notes": "Vertretung für Team A",
    "shiftType": {
      "id": 1,
      "name": "Frühschicht",
      "startTime": "06:00",
      "endTime": "14:00",
      "color": "#4CAF50"
    }
  }
}



Mitarbeiter (Employees)
POST /api/employees

{
  "firstName": "Max",
  "lastName": "Mustermann",
  "email": "max.mustermann@firma.de",
  "departmentId": 1,
  "position": "Schichtleiter"
}



GET /api/employees/{id}

{
  "success": true,
  "message": "Mitarbeiter erfolgreich abgerufen",
  "data": {
    "id": 1,
    "firstName": "Max",
    "lastName": "Mustermann",
    "email": "max.mustermann@firma.de",
    "departmentId": 1,
    "position": "Schichtleiter",
    "department": {
      "id": 1,
      "name": "Produktion",
      "description": "Produktionsabteilung"
    }
  }
}



Alle Antworten folgen dem einheitlichen Format:

{
  "success": boolean,
  "message": string,
  "data": object | null
}