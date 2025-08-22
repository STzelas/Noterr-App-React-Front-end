import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {Plus} from "lucide-react";
import type {NoteSideBarProps} from "@/types/types.ts";
import {NoteSidebarDeleteComponent} from "@/components/NotesApp/NoteSidebarDeleteComponent.tsx";


export default function NotesSidebar({notes, loading, onNoteSelect, onNoteDelete, onCreateNewNote}: NoteSideBarProps) {

  if (loading) return <p className="text-center text-gray-600 text-2xl animate-pulse mt-10">
    Loading Notes...
  </p>
  return (
    <Card className="h-[100%]">
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
            <ScrollArea className="h-[calc(90vh-350px)] mt-5 overflow-auto">

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
                    <NoteSidebarDeleteComponent id={note.id} onNoteDelete={onNoteDelete}/>
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


