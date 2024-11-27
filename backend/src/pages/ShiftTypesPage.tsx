import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShiftTypeForm } from "@/components/forms/ShiftTypeForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

interface ShiftType {
  ID: number
  name: string
  description: string
  start_time: string
  end_time: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const ShiftTypesPage = () => {
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])
  const [selectedShiftType, setSelectedShiftType] = useState<ShiftType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadShiftTypes()
  }, [])

  const loadShiftTypes = async () => {
    const response = await fetch(`${API_URL}/api/shifttypes`)
    const data = await response.json()
    setShiftTypes(data.data)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Schichttyp wirklich löschen?')) {
      const response = await fetch(`${API_URL}/api/shifttypes/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        loadShiftTypes()
      }
    }
  }

  const handleEdit = (shiftType: ShiftType) => {
    setSelectedShiftType(shiftType)
    setIsDialogOpen(true)
  }

  const handleFormSubmit = () => {
    setIsDialogOpen(false)
    setSelectedShiftType(null)
    loadShiftTypes()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Schichttypen</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedShiftType(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Neuer Schichttyp
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedShiftType ? 'Schichttyp bearbeiten' : 'Neuer Schichttyp'}
              </DialogTitle>
            </DialogHeader>
            <ShiftTypeForm 
              shiftType={selectedShiftType} 
              onSubmit={handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Startzeit</TableHead>
            <TableHead>Endzeit</TableHead>
            <TableHead className="w-[100px]">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shiftTypes.map(shiftType => (
            <TableRow key={shiftType.ID}>
              <TableCell>{shiftType.name}</TableCell>
              <TableCell>{shiftType.description}</TableCell>
              <TableCell>{shiftType.start_time} Uhr</TableCell>
              <TableCell>{shiftType.end_time} Uhr</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(shiftType)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(shiftType.ID)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ShiftTypesPage
