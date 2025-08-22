import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type LoginFields, loginSchema} from "@/types/types.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import {toast} from "sonner";

export default function LoginPage() {
  const { loginUser } = useAuth()

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },

  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFields) => {
    try {
      await loginUser(data)
        .then(() => navigate("/"))
        .then(() => toast.success("Successfully logged in."))
    } catch (error) {
      setError("root", {
        message: "Problem logging in. Check your credentials and try again.",
      })
      console.error("Login page error" , error)
    }
  }

  const onRegisterRedirect = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <>

      <form
        className="max-w-sm mx-auto p-8 space-y-4 mt-20 rounded-xl bg-white shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.root.message}</div>}
        <h3 className="text-xl font-semibold text-center text-gray-600">Welcome!</h3>
        <p className="mt-1 text-center text-gray-500 ">Login or create account</p>
        <div>
          <Label htmlFor="username" className="mb-1"></Label>
          <Input
            {...register("username")}
            id="username"
            placeholder={"Username"}
          />
          {errors.username && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.username.message}</div>}
        </div>

        <div>
          <Label htmlFor="password" className="mb-1"></Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder={"Password"}
          />
          {errors.password && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.password.message}</div>}
        </div>
        <div className={"flex flex-col items-center justify-center space-y-2"}>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <Button
            variant={"outline"}
            className=""
            onClick={onRegisterRedirect}
          >
            Create an account
          </Button>
          <button onClick={(e) => {e.preventDefault(); navigate("/")}} className={"text-xs text-gray-400 ms-1 hover:text-black"}>or go Back</button>
        </div>

      </form>
    </>
  );
}