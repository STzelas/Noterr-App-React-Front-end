import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {GripVertical, Plus} from "lucide-react";
import type {NoteSideBarProps} from "@/types/types.ts";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  type DragEndEvent, DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {useState} from "react";
import SortableNoteItem from "@/components/NotesApp/SortableNoteItem.tsx";


export default function NotesSidebar({notes, loading, onNoteSelect, onNoteDelete, onCreateNewNote, onNotesReorder}: NoteSideBarProps) {

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {  // ← HERE
    setActiveId(event.active.id as number);
  }

  function handleDragEnd(event: DragEndEvent) {  // ← HERE
    const { active, over } = event;
    setActiveId(null);
    if (active.id !== over?.id) {  // Only if position actually changed

      // STEP 1: Find the old and new positions
      const oldIndex = notes.findIndex((note) => note.id === active.id);
      const newIndex = notes.findIndex((note) => note.id === over?.id);

      // STEP 2: Reorder the array
      const reorderedNotes = arrayMove(notes, oldIndex, newIndex);

      // STEP 3: Add order property (0, 1, 2, 3...)
      const notesWithOrder = reorderedNotes.map((note, index) => ({
        ...note,
        order: index
      }));

      // STEP 4: Send back to parent
      onNotesReorder(notesWithOrder);
    }
  }

  if (loading) return <p className="text-center text-gray-600 text-2xl animate-pulse mt-10">
    Loading Notes...
  </p>
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >

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
              <SortableContext
                items={notes.map(note => note.id || 0)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-1">
                  {notes.map(note => (
                    <SortableNoteItem
                      key={note.id}
                      note={note}
                      onNoteSelect={onNoteSelect}
                      onNoteDelete={onNoteDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </ScrollArea></>
        )}
      </CardContent>
    </Card>
      <DragOverlay>
        {activeId ? (
          <div className="p-3 mr-5 rounded-md bg-white shadow-lg border border-gray-200 opacity-90">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="cursor-grabbing p-1 bg-gray-300 rounded">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-wrap truncate">
                    {notes.find(note => note.id === activeId)?.title.slice(0, 50)}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {notes.find(note => note.id === activeId)?.content.slice(0, 50)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}


