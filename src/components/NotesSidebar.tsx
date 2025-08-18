import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {Plus, Trash2} from "lucide-react";
import type {NoteSideBarProps} from "@/types/types.ts";
import {
  AlertDialog,
  AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {useState} from "react";


export default function NotesSidebar({notes, loading, onNoteSelect, onNoteDelete, onCreateNewNote}: NoteSideBarProps) {

  const [open, setOpen] = useState(false);

  if (loading) return <p>Loading notes...</p>;
  return (
    <Card className="h-[90%]">
      <CardHeader>
        <CardTitle>My Notes</CardTitle>
      </CardHeader>
      <CardContent>
        {notes.length === 0 ? (
          <div className={"flex justify-between"}>
            <h3>No notes yet</h3>
            <Button
              className={""}
              onClick={onCreateNewNote}
            >
              Create a note
            </Button>
          </div>
        ) : (
          <>

            <Button
            className={""}
            onClick={onCreateNewNote}
            >
            Create a note
              <Plus/>
            </Button>
            <ScrollArea className="h-[calc(100vh-250px)] mt-5 overflow-auto">

            <div>
              {notes.map(note => (
                <div
                  className={"p-3 mr-5 rounded-md cursor-pointer hover:bg-accent transition-colors hover:bg-gray-200"}
                  key={note.id}
                  onClick={() => onNoteSelect(note)}
                >
                  <div className="flex justify-between items-center">
                    <div className={"min-w-0"}>
                      <h3 className="font-medium text-wrap truncate">{note.title.slice(0, 50)}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {note.content.slice(0, 50)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                      </p>
                    </div>
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
                            if (note?.id) onNoteDelete(note.id);
                          }}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}

            </div>
          </ScrollArea></>
        )}
      </CardContent>
    </Card>
  );
}


