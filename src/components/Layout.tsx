import {Outlet} from "react-router";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen w-full relative dark:bg-black">
        <div
          className="absolute inset-0 z-0 gradient-white dark:gradient-black"
        >
          <Header/>
          <div className={"container mx-auto min-h-[95vh] pt-24"}>
            <Outlet />
            <Toaster/>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default Layout