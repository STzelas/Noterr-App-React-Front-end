import type {RegisterFields} from "@/types/types.ts";
import axiosInstance from "@/api/axiosInstance.ts";

const registerUser = async (data: RegisterFields)=> {
  try {
    await axiosInstance.post(`${import.meta.env.VITE_API_URL}/users/register`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  } catch (error) {
    console.error("Register api error: ", error);
    throw error;
  }
}

export default registerUser;