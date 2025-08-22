import {TodoView} from "@/components/TodoApp/TodoView.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.ts";
import type {ImportanceFilter, TodoType} from "@/types/types.ts";
import {deleteTodo, updateTodo} from "@/api/todo.ts";

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [filter, setFilter] = useState<ImportanceFilter>("ALL");

  useEffect(() => {
    document.title = "Your Tasks";
    const fetchTodos = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8080/api/todos", {
          withCredentials: true
        });
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();

  }, []);

  const handleChecked = async (todoId: number | undefined) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;
    try {
      const updated = await updateTodo(todoId, {
        description: todo.description,
        importance: todo.importance,
        isComplete: !todo.isComplete,
      });
      setTodos(prev => prev.map(t => t.id === todoId ? updated : t));
      if (selectedTodo?.id === todoId) setSelectedTodo(updated);

    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      if (selectedTodo?.id === id) setSelectedTodo(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredTodos =
    filter === "ALL" ? todos : todos.filter(t => t.importance === filter);

  return (
    <>
      <TodoView
        todos={filteredTodos}
        loading={loading}
        onTodoDelete={handleDelete}
        onTodoChange={todo => {
          setTodos(prevState => {
            const exists = prevState.find(t => t.id === todo.id)
            if (exists) {
              return prevState.map(t => t.id === todo.id ? todo : t)
            } else {
              setSelectedTodo(todo)
              return [...prevState, todo]
            }
          })
        }}
        onTodoCheck={handleChecked}
        filter={filter}
        onFilterChange={setFilter}
      />
    </>
  )
}

export default TodoPage