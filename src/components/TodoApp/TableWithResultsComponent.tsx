import TodoAddComponent from "@/components/TodoApp/TodoAddComponent.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import type {FilterProps, ImportanceFilter, TableWithResultProps} from "@/types/types.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import TodoEditComponent from "@/components/TodoApp/TodoEditComponent.tsx";
import TodoDeleteComponent from "@/components/TodoApp/TodoDeleteComponent.tsx";

const TableWithResultsComponent = ({todos, onTodoDelete, onTodoChange, onTodoCheck, filter, onFilterChange}: TableWithResultProps & FilterProps) => {
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className={"font-semibold w-1/2"}>Description</TableHead>
                  <TableHead className={"font-semibold w-1/6"}>Importance</TableHead>
                  <TableHead className={"font-semibold w-1/3"}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}
                            className={`p-3 mr-5 rounded-xl cursor-pointer hover:bg-accent transition-colors ${todo.isComplete ? "bg-gray-200 text-gray-500" : "hover:bg-gray-200"}`}>
                    <TableCell className={"flex items-center justify-center mt-1"}>
                      <Checkbox
                        className={"h-4 w-4 bg-white border border-gray-300"}
                        checked={todo.isComplete}
                        onCheckedChange={() => onTodoCheck(todo.id)}
                      />
                    </TableCell>
                    <TableCell className={`${todo.isComplete ? "line-through" : ""} max-w-[300px]`}>
                      <p className="truncate overflow-auto whitespace-nowrap p-2">{todo.description}</p>
                    </TableCell>
                    <TableCell className={"font-semibold"}>
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
                      <div className={"flex space-x-2"}>
                        <TodoEditComponent id={todo.id} description={todo.description} importance={todo.importance} onTodoChange={onTodoChange}/>
                        <TodoDeleteComponent id={todo.id} handleDelete={onTodoDelete}/>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableWithResultsComponent