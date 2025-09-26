import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/sidebar/Siderbar"
import { Outlet } from "react-router"; // importante usar dom!

export default function DefaultLayout() {
  return (
    <div className="full w-full flex-col ">
      
        <Sidebar />
        <Header/>
      
      <main className="flex-1 sm:ml-14 p-4">
        <Outlet />
      </main>
    </div>
  );
}
