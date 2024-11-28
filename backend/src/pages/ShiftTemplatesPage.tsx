import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShiftTemplateForm } from "@/components/forms/ShiftTemplateForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { ShiftTemplate } from "@/types"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const ShiftTemplatesPage = () => {
  const [shiftTemplates, setShiftTemplates] = useState<ShiftTemplate[]>([])
  const [selectedShiftTemplate, setSelectedShiftTemplate] = useState<ShiftTemplate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadShiftTemplates()
  }, [])

  const loadShiftTemplates = () => {
    fetch(`${API_URL}/api/shifttemplates`)
      .then(res => res.json())
      .then(response => setShiftTemplates(response.data))
  }

  const handleDelete = (id: number) => {
    if (confirm('Schichtvorlage wirklich löschen?')) {
      fetch(`${API_URL}/api/shifttemplates/${id}`, {
        method: 'DELETE'
      }).then(() => loadShiftTemplates())
    }
  }

  const handleEdit = (shiftTemplate: ShiftTemplate) => {
    setSelectedShiftTemplate(shiftTemplate)
    setIsDialogOpen(true)
  }

  const handleFormSubmit = () => {
    setIsDialogOpen(false)
    setSelectedShiftTemplate(null)
    loadShiftTemplates()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Schichtvorlagen</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedShiftTemplate(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Neue Schichtvorlage
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedShiftTemplate ? 'Schichtvorlage bearbeiten' : 'Neue Schichtvorlage'}
              </DialogTitle>
            </DialogHeader>
            <ShiftTemplateForm 
              shiftTemplate={selectedShiftTemplate} 
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
            <TableHead>Mitarbeiter</TableHead>
            <TableHead>Startdatum</TableHead>
            <TableHead>Mo</TableHead>
            <TableHead>Di</TableHead>
            <TableHead>Mi</TableHead>
            <TableHead>Do</TableHead>
            <TableHead>Fr</TableHead>
            <TableHead>Sa</TableHead>
            <TableHead>So</TableHead>
            <TableHead>Farbe</TableHead>
            <TableHead className="w-[100px]">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shiftTemplates.map(template => (
            <TableRow key={template.ID}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.description}</TableCell>
              <TableCell>{template.employee?.first_name} {template.employee?.last_name}</TableCell>
              <TableCell>{new Date(template.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{template.monday?.shift_type?.name}</TableCell>
              <TableCell>{template.tuesday?.shift_type?.name}</TableCell>
              <TableCell>{template.wednesday?.shift_type?.name}</TableCell>
              <TableCell>{template.thursday?.shift_type?.name}</TableCell>
              <TableCell>{template.friday?.shift_type?.name}</TableCell>
              <TableCell>{template.saturday?.shift_type?.name}</TableCell>
              <TableCell>{template.sunday?.shift_type?.name}</TableCell>
              <TableCell>
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: template.color }}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(template)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(template.ID)}>
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

export default ShiftTemplatesPage
