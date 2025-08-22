import axiosInstance from "@/api/axiosInstance.ts";
import type {AxiosError} from "axios";
import type {TodoType} from "@/types/types.ts";

export const saveTodo = async ({description, importance}: Omit<TodoType, "isComplete">) => {
  try {
    const response = await axiosInstance.post<TodoType>(
      `/todos/save`,
      { description, importance },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ detail?: string }>;
    let detail = "Note save error.";
    if (err.response?.data?.detail) {
      detail = err.response.data.detail;
    }
    throw new Error(detail);
  }
}

export const updateTodo = async (id: number | undefined, {description, importance, isComplete}: TodoType) => {
  try {
    const response = await axiosInstance.put(`/todos/${id}`, {description, importance, isCompleted: isComplete},
      {
        headers: {
          "Content-Type": "application/json",
        }
      });
    return response.data;
  } catch (error) {
    console.log("Error updating todo", error);
    const err = error as AxiosError<{ detail?: string }>;
    let detail = "Todo update error.";
    if (err.response?.data?.detail) {
      detail = err.response.data.detail;
      console.log(detail)
    }
    throw new Error(detail);
  }
}

export const deleteTodo = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error?: string }>;
    let detail = "Todo delete error.";
    if (err.response?.data?.error) {
      detail = err.response.data.error;
    }
    throw new Error(detail);
  }
}