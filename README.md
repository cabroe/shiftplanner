# ShiftPlanner

Eine moderne Webanwendung zur effizienten Verwaltung von Schichtplänen und Personaleinsätzen.

## Hauptfunktionen

### Dashboard
- Übersicht über aktuelle Schichtpläne
- Wichtige Kennzahlen auf einen Blick
- Schnellzugriff auf häufig genutzte Funktionen

### Schichtplanung
- Interaktiver Schichtkalender
- Drag & Drop Funktionalität
- Konfliktprüfung in Echtzeit
- Automatische Besetzungsvorschläge

### Verwaltung
- **Mitarbeiter**
  - Personalstammdaten
  - Qualifikationen
  - Verfügbarkeiten
  
- **Abteilungen**
  - Organisationsstruktur
  - Personalzuordnung
  - Besetzungsregeln
  
- **Schichtblöcke**
  - Zeiträume definieren
  - Pausenzeiten festlegen
  - Personalbedarfsplanung
  
- **Schichttypen**
  - Flexible Schichtmodelle
  - Zuschlagsregelungen
  - Besetzungsvorgaben

## Technologie-Stack

### Frontend
- React 18 mit TypeScript
- Tailwind CSS für modernes Styling
- Lucide React für konsistente Icons
- React Router v6 für Navigation
- Shadcn/ui für UI-Komponenten

### Entwicklungswerkzeuge
- Vite als Build-Tool
- ESLint für Code-Qualität
- Prettier für einheitliche Formatierung

## Projektstruktur
shiftplanner/
├── src/
│   ├── components/ # UI-Komponenten
│   │   ├── ui/ # Basis-Komponenten
│   │   └── layout/ # Layout-Komponenten
│   ├── pages/ # Hauptseiten
│   ├── features/ # Feature-Module
│   └── lib/ # Utilities & Helpers
├── public/ # Statische Assets
└── tests/ # Testfiles

## Setup & Entwicklung
```bash
# Installation
npm install

# Entwicklungsserver starten
npm run dev

# Production Build erstellen
npm run build

# Tests ausführen
npm run test

# Systemanforderungen
Node.js 18 oder höher
NPM 8 oder höher
Moderne Browser (Chrome, Firefox, Safari, Edge)

Lizenz © 2024 ShiftPlanner - Alle Rechte vorbehalten