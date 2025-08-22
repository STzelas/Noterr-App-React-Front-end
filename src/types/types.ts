import { z } from 'zod';

export const noteSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required").max(255, "Title must not be more than 255 characters"),
  content: z.string().min(1, "Content is required").max(2000, "Content must not be more than 2000 characters"),
  deleted: z.boolean().optional(),
})

export type NoteType = z.infer<typeof noteSchema>;

export const todoSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, "Description is required").max(255, "Description must not be more than 255 characters"),
  importance: z.string("Importance must be a valid option.").min(1, "Importance is required"),
  isComplete: z.boolean().default(false).optional(),
})

export type TodoType = z.infer<typeof todoSchema>;


export const registerSchema = z.object({
  username: z.string().min(3, {error: "Username must be at least 3 characters"}).regex(/^\S+$/, { message: "No spaces allowed" }),
  firstname: z.string().min(3, {error: "First Name must be at least 3 characters"}).regex(/^\S+$/, { message: "No spaces allowed" }),
  lastname: z.string().min(3, {error: "Last Name must be at least 3 characters"}).regex(/^\S+$/, { message: "No spaces allowed" }),
  password: z.string()
        .min(6, {error: "Password must be at least 6 characters"})
        .regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, {error: "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces."}),
  // Password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter and at least 1 number and no spaces.
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

export type NoteDeleteProps = {
  id: number | undefined;
  onNoteDelete: (id : number) => void;
}

export type TodoViewProps = {
  todos: TodoType[];
  loading: boolean;
  onTodoDelete: (id : number) => void;
};

export type TodoChangeProps = {
  onTodoChange: (todo: TodoType) => void;
}

export type TodoDeleteProps = {
  handleDelete: (id : number) => void;
  id: number | undefined;
}

export type TodoCheckedProps = {
  onTodoCheck: (id: number | undefined) => void;
}

export type ImportanceFilter = "ALL" | "MAJOR" | "MODERATE" | "MINOR";

export type FilterProps = {
  filter: ImportanceFilter;
  onFilterChange: (newFilter: ImportanceFilter) => void;
}

export type TableWithResultProps = {
  todos: TodoType[];
  onTodoDelete: (id : number) => void;
  onTodoChange: (todo: TodoType) => void;
  onTodoCheck: (id: number | undefined) => void;
}