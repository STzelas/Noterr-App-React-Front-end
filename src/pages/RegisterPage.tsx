import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";
import {useForm} from "react-hook-form";
import {type RegisterFields, registerSchema} from "@/types/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import registerUser from "@/api/registerUser.ts";
import {toast} from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema)
  })

  const onClickBack = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/");
  }

  const onSubmit = async (data: RegisterFields) => {
    try {
      await registerUser(data)
        .then(() => navigate("/login"))
        .then(() => toast.success("Successfully registered"))
    } catch (error) {
      setError("root", {
        message: "Problem creating Account",
      })
      toast.error("Error creating Account")
      console.error(error)
    }
  }

  return (
    <>
      <form
        className="max-w-sm mx-auto p-8 space-y-4 mt-20 rounded-xl bg-white shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.root.message}</div>}
        <h3 className="text-xl font-semibold text-center text-gray-600">Welcome!</h3>
        <p className="mt-1 text-center text-gray-500 ">Create an account!</p>
        <div className={"space-y-2"}>
          <div>
            <Label htmlFor="username" className="mb-1"></Label>
            <Input
              {...register("username")}
              id="username"
              type={"username"}
              placeholder={"Username"}
            />
          </div>
          {errors.username && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.username.message}</div>}
          <div>
            <Label htmlFor="firstname" className="mb-1"></Label>
            <Input
              {...register("firstname")}
              id="firstname"
              type="firstname"
              placeholder={"First Name"}
            />
          </div>
          {errors.firstname && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.firstname.message}</div>}
          <div>
            <Label htmlFor="lastname" className="mb-1"></Label>
            <Input
              {...register("lastname")}
              id="lastname"
              type="lastname"
              placeholder={"Last Name"}
            />
          </div>
          {errors.lastname && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.lastname.message}</div>}
          <div>
            <Label htmlFor="password" className="mb-1"></Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder={"Password"}
            />
            {errors.password && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.password.message}</div>}
            <a onClick={() => {navigate("/login")}} className={"text-xs text-gray-400 ms-1 hover:text-black"}>Already have an Account?</a>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center space-y-2"}>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create an account"}
          </Button>
          <Button
            variant={"outline"}
            className=""
            onClick={onClickBack}
          >
            Back
          </Button>
        </div>

      </form>
    </>
  )
}

export default RegisterPage;