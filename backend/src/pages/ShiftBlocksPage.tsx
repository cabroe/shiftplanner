import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShiftBlockForm } from "@/components/forms/ShiftBlockForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { ShiftBlock } from "@/types"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const ShiftBlocksPage = () => {
  const [shiftBlocks, setShiftBlocks] = useState<ShiftBlock[]>([])
  const [selectedShiftBlock, setSelectedShiftBlock] = useState<ShiftBlock | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadShiftBlocks()
  }, [])

  const loadShiftBlocks = () => {
    fetch(`${API_URL}/api/shiftblocks`)
      .then(res => res.json())
      .then(response => setShiftBlocks(response.data))
  }

  const handleDelete = (id: number) => {
    if (confirm('Schichtblock wirklich löschen?')) {
      fetch(`${API_URL}/api/shiftblocks/${id}`, {
        method: 'DELETE'
      }).then(() => loadShiftBlocks())
    }
  }

  const handleEdit = (shiftBlock: ShiftBlock) => {
    setSelectedShiftBlock(shiftBlock)
    setIsDialogOpen(true)
  }

  const handleFormSubmit = () => {
    setIsDialogOpen(false)
    setSelectedShiftBlock(null)
    loadShiftBlocks()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Schichtblöcke</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedShiftBlock(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Neuer Schichtblock
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedShiftBlock ? 'Schichtblock bearbeiten' : 'Neuer Schichtblock'}
              </DialogTitle>
            </DialogHeader>
            <ShiftBlockForm 
              shiftBlock={selectedShiftBlock} 
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
            <TableHead>Mo</TableHead>
            <TableHead>Di</TableHead>
            <TableHead>Mi</TableHead>
            <TableHead>Do</TableHead>
            <TableHead>Fr</TableHead>
            <TableHead>Sa</TableHead>
            <TableHead>So</TableHead>
            <TableHead className="w-[100px]">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shiftBlocks.map(block => (
            <TableRow key={block.ID}>
              <TableCell>{block.name}</TableCell>
              <TableCell>{block.description}</TableCell>
              <TableCell>{block.employee?.first_name} {block.employee?.last_name}</TableCell>
              <TableCell>{block.monday?.shift_type?.name}</TableCell>
              <TableCell>{block.tuesday?.shift_type?.name}</TableCell>
              <TableCell>{block.wednesday?.shift_type?.name}</TableCell>
              <TableCell>{block.thursday?.shift_type?.name}</TableCell>
              <TableCell>{block.friday?.shift_type?.name}</TableCell>
              <TableCell>{block.saturday?.shift_type?.name}</TableCell>
              <TableCell>{block.sunday?.shift_type?.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(block)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(block.ID)}>
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

export default ShiftBlocksPage
