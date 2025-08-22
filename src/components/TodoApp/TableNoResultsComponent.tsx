import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import type {FilterProps, ImportanceFilter, TodoChangeProps} from "@/types/types.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import TodoAddComponent from "@/components/TodoApp/TodoAddComponent.tsx";

const TableNoResultsComponent = ({filter, onFilterChange, onTodoChange}: FilterProps & TodoChangeProps) => {
  return (
    <>
      <div className="flex flex-col w-full mx-auto p-8 space-y-4">
        <div className={"flex w-full justify-end"}>
          <TodoAddComponent
            onTodoChange={onTodoChange}/>
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
                  <TableHead className={"font-semibold w-1/2 pl-4"}>Description</TableHead>
                  <TableHead className={"font-semibold w-1/6 pl-3"}>Importance</TableHead>
                  <TableHead className={"font-semibold w-1/3 pl-2.5"}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center pt-10 pl-5">
                    No tasks found.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export { TableNoResultsComponent };