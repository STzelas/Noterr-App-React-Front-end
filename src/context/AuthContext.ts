import { createContext } from "react";
import type {AuthContextProps} from "@/types/types.ts";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);