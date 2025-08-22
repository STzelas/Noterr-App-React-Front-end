import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Controller, useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {type TodoChangeProps, todoSchema, type TodoType} from "@/types/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {saveTodo} from "@/api/todo.ts";

/**
 * Component To add a new To-do Task
 * @param onTodoChange - Takes a to-do and changes the state of all to-dos in another component (TodoPage)
 */
const TodoAddComponent = ({onTodoChange}:TodoChangeProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<TodoType>({
    resolver: zodResolver(todoSchema)
  })

  const handleCreate = async ({description, importance}: TodoType) => {
    try {
      const savedTodo = await saveTodo({description, importance})
      onTodoChange(savedTodo)
      setOpen(false);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.log("Error saving task with error: ", err);
      setError("root", {
        message: "There was a problem creating task.",
      })
    }
  }

  return (
    <>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add new Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          {errors.root && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.root.message}</div>}
          <form onSubmit={handleSubmit(handleCreate)}>
            <DialogHeader>
              <DialogTitle className={"text-center"}>Add a new Task</DialogTitle>
              <DialogDescription className={"text-center"}>
                Add a new Task by clicking 'Add Task'
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mt-2">
              <div className="grid gap-3">
                <Label htmlFor="description">Task Description</Label>
                <Input
                  {...register("description")}
                  placeholder={"Description"}
                  id="description"
                />
                {errors.description && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.description.message}</div>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="importance">Task Importance</Label>
                <Controller
                  name="importance"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="importance">
                        <SelectValue placeholder="Select importance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MINOR">MINOR</SelectItem>
                        <SelectItem value="MODERATE">MODERATE</SelectItem>
                        <SelectItem value="MAJOR">MAJOR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.importance && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.importance.message}</div>}
              </div>
            </div>
            <DialogFooter className={"mt-2"}>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                >Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
              >{isSubmitting ? "Adding..." : "Add Task"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TodoAddComponent