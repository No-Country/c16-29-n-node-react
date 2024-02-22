import Sidebar from "../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";

function DashboardLayout({ menues, children }) {
  const { pathname } = useLocation();

  return (
    <div className="w-full h-full flex">
      <Sidebar menues={menues} />
      <div className="grow bg-light-white p-4">
        <h1 className="capitalize font-bold text-2xl">{decodeURI(pathname.split("/").at(-1))}</h1>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout;