import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Button } from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {noteSchema, type NoteType, type NoteViewProps} from "@/types/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Save, Trash2, X} from "lucide-react";
import {saveNote, updateNote} from "@/api/notes";
import {useEffect, useRef, useState} from "react";
import {
  AlertDialog,
  AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";


const NoteView = ({onNoteSaved, onNoteDelete, note, isNew }:NoteViewProps) => {

  const [isEditing, setIsEditing] = useState(isNew);
  const titleRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<NoteType>({
    resolver: zodResolver(noteSchema)
  })

  useEffect(() => {
    if (note) {
      reset({
        id: note.id,
        title: note.title,
        content: note.content,
      })
      setIsEditing(isNew)
      if (isNew) {
        setTimeout(() => {
          titleRef.current?.focus()
        }, 0)
      }
    }
  }, [note, isNew, reset])

  /**
   * On submit with Save / Edit depending
   * on if the note isNew or not
   */
  const onSubmit = async ({title, content}: NoteType) => {
    console.log("Form data: ", title, content)
    try {
      if (isNew) {
        const savedNote = await saveNote({title, content});
        onNoteSaved(savedNote);

        console.log(savedNote)
      } else if (note?.id) {
        console.log("Note id: ", note.id)
        const updatedNote = await updateNote(note.id, { title, content});
        onNoteSaved(updatedNote);
      }
      setIsEditing(false);

    } catch (error) {
      console.log("Save failed with error: ", error);
      setError("root", {
        message: "There was a problem creating note.",
      })
    }
  }

  const handleCancel = () => {
    reset(note || { title: "", content: "" });
    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          {errors.title && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.title.message}</div>}
          <Input
            placeholder="Note title"
            {...register("title")}
            ref={(e) => {
              register("title").ref(e)
              titleRef.current = e
            }}
            id="title"
            disabled={!isEditing}
            className="text-xl font-bold border-none px-0 focus-visible:ring-0"
          />

        </CardHeader>
        <CardContent>
          {errors.content && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.content.message}</div>}
          <Textarea
            placeholder="Write your note here..."
            {...register("content")}
            id="content"
            disabled={!isEditing}
            className="h-[calc(100vh-350px)] resize-none border-none focus-visible:ring-0 p-0 mt-2"
          />

        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button
              variant="outline"
              type="button"
              onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-2"/>
                Cancel
              </Button><Button
                type="submit"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2"/>
              {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                type={"button"}
                onClick={() => setIsEditing(true)}
              >
              Edit Note
              </Button>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"

                  >
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this note? This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                      if (note?.id) onNoteDelete(note.id)
                    }}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}


        </CardFooter>
      </Card>
    </form>
  );
}

export default NoteView;


