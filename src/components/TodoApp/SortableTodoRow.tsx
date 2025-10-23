import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import type {TodoType} from "@/types/types.ts";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import TodoEditComponent from "@/components/TodoApp/TodoEditComponent.tsx";
import TodoDeleteComponent from "@/components/TodoApp/TodoDeleteComponent.tsx";
import {GripVertical} from "lucide-react";

interface SortableTodoRowProps {
  todo: TodoType;
  onTodoDelete: (id: number) => void;
  onTodoChange: (todo: TodoType) => void;
  onTodoCheck: (id: number | undefined) => void;
}

function SortableTodoRow({ todo, onTodoDelete, onTodoChange, onTodoCheck }: SortableTodoRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id || 0 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={`p-3 mr-5 rounded-xl cursor-pointer hover:bg-accent transition-all duration-200 ${
        todo.isComplete ? "bg-gray-200 text-gray-500" : "hover:bg-gray-200"
      } ${isDragging ? 'shadow-lg border-blue-300 bg-blue-50' : ''}`}
    >
      <TableCell className="w-8">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-300 rounded transition-colors opacity-60 hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </div>
      </TableCell>

      <TableCell className="flex items-center justify-center mt-1">
        <Checkbox
          className="h-4 w-4 bg-white border border-gray-300"
          checked={todo.isComplete}
          onCheckedChange={() => onTodoCheck(todo.id)}
        />
      </TableCell>

      <TableCell className={`${todo.isComplete ? "line-through" : ""} max-w-[300px]`}>
        <p className="truncate overflow-auto whitespace-nowrap p-2">{todo.description}</p>
      </TableCell>
      <TableCell className="font-semibold">
        <Badge
          variant="secondary"
          className={
            "rounded-full px-3 py-1 text-sm font-medium " +
            (todo.importance === "MAJOR"
              ? "bg-red-100 text-red-800 border border-red-200"
              : todo.importance === "MODERATE"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                : "bg-green-100 text-green-800 border border-green-200")
          }
        >
          {todo.importance.charAt(0) + todo.importance.slice(1).toLowerCase()}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex space-x-2">
          <TodoEditComponent
            id={todo.id}
            description={todo.description}
            importance={todo.importance}
            onTodoChange={onTodoChange}
          />
          <TodoDeleteComponent id={todo.id} handleDelete={onTodoDelete}/>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default SortableTodoRow;