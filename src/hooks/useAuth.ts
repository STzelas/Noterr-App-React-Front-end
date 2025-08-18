import { useContext } from "react";
import { AuthContext} from "@/context/AuthContext.ts";

export function useAuth() {
  const authContext = useContext(AuthContext);
  // Αυτό το Error σημαίνει ότι δεν μπορούμε να χρησιμοποιήσουμε το
  // useAuth εκτός του AuthProvider στο app.tsx
  if (!authContext) throw new Error("useAuth must be used within AuthProvider");
  return authContext;
}