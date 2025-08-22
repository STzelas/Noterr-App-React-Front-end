import NotesSidebar from "@/components/NotesApp/NotesSidebar.tsx";
import NoteView from "@/components/NotesApp/NoteView.tsx";
import {useEffect, useRef, useState} from "react";
import type {NoteType} from "@/types/types.ts";
import axiosInstance from "@/api/axiosInstance.ts";
import {deleteNote} from "@/api/notes.ts";

const NotesPage = () => {

  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading ] = useState<boolean>(true);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const noteEditorRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8080/api/notes", {
          withCredentials: true // ⬅ sends cookies with the request
        });
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();

  }, []);

  useEffect(() => {
    document.title = "Your Notes";
    if (selectedNote && noteEditorRef.current) {
      noteEditorRef.current.focus();
    }
  }, [selectedNote]);

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      if (selectedNote?.id === id) setSelectedNote(null);
      handleCreateNewNote()
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCreateNewNote = () => {
    const newNote: NoteType = {
      title: "",
      content: "",
    }
    setSelectedNote(newNote);
  };

  return (
    <>
      <div className="flex justify-center w-full space-x-4 mt-2">
        <div className={"w-[25%]"}>
          <NotesSidebar notes={notes}
                        loading={loading}
                        onNoteSelect={setSelectedNote}
                        onNoteDelete={handleDelete}
                        onCreateNewNote={handleCreateNewNote}
          />
        </div>
        <div className={"w-[75%] h-[75%]"}>
          <NoteView
          onNoteSaved={note => {
            setNotes(prevState => {
              const exists = prevState.find(n => n.id === note.id)
              if (exists) {
                return prevState.map(n => n.id === note.id ? note : n)
              } else {
                setSelectedNote(note)
                return [...prevState, note]
              }
            })
          }}
          note={selectedNote}
          isNew={!selectedNote?.id}
          onNoteDelete={handleDelete}
          />
        </div>
      </div>

    </>
  )
}

export default NotesPage;