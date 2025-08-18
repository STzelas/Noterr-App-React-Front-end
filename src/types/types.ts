import { z } from 'zod';

export const noteSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required").max(255, "Title must not be more than 255 characters"),
  content: z.string().min(1, "Content is required").max(1000, "Content must not be more than 1000 characters"),
  deleted: z.boolean().optional(),
})

export type NoteType = z.infer<typeof noteSchema>;


export const registerSchema = z.object({
  username: z.string().min(3, {error: "Username must be at least 3 characters"}),
  firstname: z.string().min(3, {error: "First Name must be at least 3 characters"}),
  lastname: z.string().min(3, {error: "Last Name must be at least 3 characters"}),
  password: z.string()
        .min(6, {error: "Password must be at least 6 characters"})
        .regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, {error: "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces."}),
  // Password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter and at least 1 number.
})

export type RegisterFields = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  username: z.string({error: "Username is required"}),
  password: z.string({error: "Password is required"}),
})

export type LoginFields = z.infer<typeof loginSchema>

export type LoginResponse = {
  firstname: string,
  lastname: string,
  token: string,
}

export type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  userId: number | null;
  loginUser: (fields: LoginFields) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

export type JwtPayload = {
  username?: string;
  userId?: number;
  exp?: number;
}

export type NoteSideBarProps = {
  notes: NoteType[];
  loading: boolean;
  onNoteSelect: (note: NoteType) => void;
  onNoteDelete: (id : number) => void;
  onCreateNewNote: () => void;
};

export type NoteViewProps = {
  onNoteSaved: (note: NoteType) => void;
  onNoteDelete: (id : number) => void;
  note: NoteType | null;
  isNew?: boolean;
}