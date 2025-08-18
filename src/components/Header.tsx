import { useState} from "react";
import {Link, useNavigate} from "react-router";
import {Github, House, ListTodo, LogIn, LogOut, Menu, Notebook, X} from "lucide-react";
import {useAuth} from "@/hooks/useAuth.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {logoutUser, isAuthenticated} = useAuth()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  return (
    <header className="bg-cf-dark-red fixed w-4/5 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <img
            className="h-12 ml-10"
            src=""
            alt="Noterr Logo"
          />
        </Link>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex gap-6 text-white font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-cf-dark-red md:bg-transparent px-4 py-4 md:py-0`}
        >
          <Link
            to="/"
            className={"rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
          >
            <House
              className={"h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 " +
                "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200" +
                " dark:hover:text-neutral-400"}
            />
          </Link>
          <Link
            to="/note-app"
            className={"rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
          >
            <Notebook
              className={"h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 " +
                "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200" +
                " dark:hover:text-neutral-400"}
            />
          </Link>
          <Link
            to="/todo-app"
            className={"rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
          >
            <ListTodo
              className={"h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 " +
                "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200" +
                " dark:hover:text-neutral-400"}
            />
          </Link>
          <a
            href="https://github.com/STzelas/note-app-placeholder-frontend-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={"rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
          >
            <Github
              className={"h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 " +
                "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200" +
                " dark:hover:text-neutral-400"}
            />
          </a>
          {isAuthenticated ? (
            <Link
              to="#"
              className={"rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
            >
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <LogOut
                    className={"h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 " +
                      "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200" +
                      " dark:hover:text-neutral-400"}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Logout
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Link>
          ) :
          <Link
            to="/login"
            className={"rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
          >
            <LogIn
              className={"h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 " +
                "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200" +
                " dark:hover:text-neutral-400"}
            />
          </Link>}
      </nav>
    </div>
</header>
)
  ;
};

export default Header;


