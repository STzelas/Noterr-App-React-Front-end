import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash2} from "lucide-react";
import type {NoteDeleteProps} from "@/types/types.ts";

const NoteDeleteComponent = ({onNoteDelete, id}: NoteDeleteProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
          >
            <Trash2 className="h-4 w-4 mr-2"/>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (id) onNoteDelete(id)
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export { NoteDeleteComponent }