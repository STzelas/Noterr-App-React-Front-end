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

const NoteSidebarDeleteComponent = ({onNoteDelete, id}: NoteDeleteProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"

          >
            <Trash2
              className="h-4 w-4"/>
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
              if (id) onNoteDelete(id);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export { NoteSidebarDeleteComponent }