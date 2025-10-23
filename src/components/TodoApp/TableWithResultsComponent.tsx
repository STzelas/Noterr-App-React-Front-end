import TodoAddComponent from "@/components/TodoApp/TodoAddComponent.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import type {FilterProps, ImportanceFilter, TableWithResultProps, CompletionSort} from "@/types/types.ts";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {useState} from "react";
import SortableTodoRow from "@/components/TodoApp/SortableTodoRow.tsx";
import {ArrowUpDown, GripVertical} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

const TableWithResultsComponent = ({todos, onTodoDelete, onTodoChange, onTodoCheck, filter, onFilterChange, onTodosReorder, completionSort, onCompletionSortChange}: TableWithResultProps & FilterProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as number);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over?.id);

      const reorderedTodos = arrayMove(todos, oldIndex, newIndex);
      const todosWithOrder = reorderedTodos.map((todo, index) => ({
        ...todo,
        order: index
      }));

      onTodosReorder(todosWithOrder);
    }
  }

  const handleCompletionSortClick = () => {
    let newSort: CompletionSort;
    if (completionSort === "none") {
      newSort = "completed-first";
    } else if (completionSort === "completed-first") {
      newSort = "incomplete-first";
    } else {
      newSort = "none";
    }
    onCompletionSortChange(newSort);
  };

  const getArrowRotation = () => {
    if (completionSort === "completed-first") {
      return "rotate-180 text-gray-800"; // Darker gray for completed first
    } else if (completionSort === "incomplete-first") {
      return "rotate-0 text-gray-800"; // Darker gray for incomplete first
    }
    return "text-gray-400 opacity-50"; // Lighter gray and slightly transparent for none
  };

  return (
    <>
      <div className="flex flex-col w-full mx-auto p-8 space-y-4">
        <div className="flex w-full justify-end">

          {/*CREATING THE TASK*/}
          <TodoAddComponent onTodoChange={onTodoChange}/>

          {/*EDITING THE TASK*/}
        </div>
        <div className="w-full mx-auto p-8 space-y-4 rounded-xl bg-white shadow-xl text-md overflow-auto border">
          <h2 className={"text-2xl font-bold text-center p-2 mb-10 text-gray-700"}>Your Tasks</h2>
          <div className="max-h-[50vh] overflow-auto">
            <div className="flex items-center gap-2 justify-end">
              <Select
                value={filter}
                onValueChange={(val) => onFilterChange(val as ImportanceFilter)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="MAJOR">Major</SelectItem>
                  <SelectItem value="MODERATE">Moderate</SelectItem>
                  <SelectItem value="MINOR">Minor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead> {/* Drag handle column */}

                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={handleCompletionSortClick}
                        className="flex items-center gap-1"
                      >
                        Completed
                        <span className={`ml-2 h-4 w-4 transition-transform ${getArrowRotation()}`}>
                          <ArrowUpDown />
                        </span>
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold w-1/2">Description</TableHead>
                    <TableHead className="font-semibold w-1/6">Importance</TableHead>
                    <TableHead className="font-semibold w-1/3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <SortableContext
                    items={todos.map(todo => todo.id || 0)}
                    strategy={verticalListSortingStrategy}
                  >
                    {todos.map((todo) => (
                      <SortableTodoRow
                        key={todo.id}
                        todo={todo}
                        onTodoDelete={onTodoDelete}
                        onTodoChange={onTodoChange}
                        onTodoCheck={onTodoCheck}
                      />
                    ))}
                  </SortableContext>
                </TableBody>
              </Table>

              {/* DRAG OVERLAY */}
              <DragOverlay>
                {activeId ? (
                  <div className="bg-white shadow-lg border border-gray-200 opacity-90 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <span>{todos.find(t => t.id === activeId)?.description}</span>
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableWithResultsComponent
