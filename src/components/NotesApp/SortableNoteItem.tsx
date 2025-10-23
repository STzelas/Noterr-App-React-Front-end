import {GripVertical} from "lucide-react";
import {NoteSidebarDeleteComponent} from "@/components/NotesApp/NoteSidebarDeleteComponent.tsx";
import {useSortable} from "@dnd-kit/sortable";
import type {NoteType} from "@/types/types.ts";
import {CSS} from '@dnd-kit/utilities'

interface SortableNoteItemProps {
  note: NoteType;
  onNoteSelect: (note: NoteType) => void;
  onNoteDelete: (id: number) => void;
}

function SortableNoteItem({ note, onNoteSelect, onNoteDelete }: SortableNoteItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id || 0 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 mr-5 rounded-md cursor-pointer hover:bg-accent transition-all duration-200 hover:bg-gray-200 border border-transparent hover:border-gray-300 ${
        isDragging ? 'shadow-lg border-blue-300 bg-blue-50' : ''
      }`}
      onClick={() => onNoteSelect(note)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-300 rounded transition-colors opacity-60 hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-wrap truncate">{note.title.slice(0, 50)}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {note.content.slice(0, 50)}
            </p>
          </div>
        </div>
        <NoteSidebarDeleteComponent id={note.id} onNoteDelete={onNoteDelete}/>
      </div>
    </div>
  );
}

export default SortableNoteItem;