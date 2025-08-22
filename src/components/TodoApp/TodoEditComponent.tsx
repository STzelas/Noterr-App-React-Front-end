import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Save} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Controller, useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useState} from "react";
import {type TodoChangeProps, todoSchema, type TodoType} from "@/types/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateTodo} from "@/api/todo.ts";



const TodoEditComponent = ({onTodoChange, description, importance, isComplete, id}:TodoChangeProps & TodoType) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TodoType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      description,
      importance
    }
  })

  const handleEdit = async (data: Pick<TodoType, "description" | "importance">) => {
    try {
      const updatedTodo = await updateTodo(id, {
        ...data,
        isComplete
      })
      onTodoChange(updatedTodo)
      setOpen(false);

    } catch (err) {
      console.log("Error updating task with error: ", err);
    }
  }
  return (

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-black cursor-pointer"
          >
            <Pencil className={"h-4 w-4"}/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={handleSubmit(handleEdit)}
          >
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Save the edited the task here by clicking 'Save'
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
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
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                <Save className={"h-4 w-4"}/>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}

export default TodoEditComponent