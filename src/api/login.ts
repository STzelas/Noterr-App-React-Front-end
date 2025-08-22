import type {LoginFields, LoginResponse} from "@/types/types.ts";
import axiosInstance from "@/api/axiosInstance.ts";
import type {AxiosError} from "axios";

export async function login ({username, password}: LoginFields):Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      `/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ detail?: string }>;
    let detail = "Login failed.";
    if (err.response?.data?.detail) {
      detail = err.response.data.detail;
    }
    throw new Error(detail);
  }
}