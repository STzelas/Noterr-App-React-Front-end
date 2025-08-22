import type {FilterProps, TodoChangeProps, TodoCheckedProps, TodoViewProps} from "@/types/types.ts";
import TodoAddComponent from "@/components/TodoApp/TodoAddComponent.tsx";
import {TableNoResultsComponent} from "@/components/TodoApp/TableNoResultsComponent.tsx";
import TableWithResultsComponent from "@/components/TodoApp/TableWithResultsComponent.tsx";

export const TodoView = ({loading, todos, onTodoDelete, onTodoChange, onTodoCheck, filter, onFilterChange}: TodoViewProps & TodoChangeProps & TodoCheckedProps & FilterProps) => {

  const isEmptyBecauseOfFilter = todos.length === 0 && filter !== "ALL";

  if (loading) return <p className="text-center text-gray-600 text-2xl animate-pulse mt-10">
    Loading Tasks...
  </p>;

  /**
   * If no todos exist then
   * The UI will prompt User
   * To add a new one!
   * If they are 0 the ui will
   * display an appropriate message
   */
  if (todos.length === 0) {
    return (
      <>
        <div className={` ${isEmptyBecauseOfFilter ? "" : "flex flex-col justify-center align-center text-center w-full mx-auto p-8 space-y-4"}`}>
          {isEmptyBecauseOfFilter ? "" :
            <h2 className={"text-4xl font-bold"}>
              Your tasks
            </h2>
          }
          {isEmptyBecauseOfFilter ? "" :
            <h3 className={"text-xl text-gray-600"}>
              You have no tasks yet.
            </h3>
          }
          {isEmptyBecauseOfFilter ?
            <>
              <TableNoResultsComponent filter={filter} onFilterChange={onFilterChange} onTodoChange={onTodoChange}/>
            </>
            :
            <div className={"mt-3"}>
              <TodoAddComponent
                onTodoChange={onTodoChange}/>
            </div>
          }
        </div>
      </>
    )
  }
  return (
    <>
      <div>
        <TableWithResultsComponent todos={todos} onTodoDelete={onTodoDelete} onTodoChange={onTodoChange} onTodoCheck={onTodoCheck} filter={filter} onFilterChange={onFilterChange}/>
      </div>
    </>
  )
}
