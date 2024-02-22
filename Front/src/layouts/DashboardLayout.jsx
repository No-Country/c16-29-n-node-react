import Sidebar from "../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";

function DashboardLayout({ menues, children }) {
  const { pathname } = useLocation();

  return (
    <div className="w-full h-full flex">
      <Sidebar menues={menues} />
      <div className="grow bg-light-white p-4 pb-0 h-screen flex flex-col">
        <h1 className="capitalize font-bold text-[#123259] text-2xl">{decodeURI(pathname.split(/(\/)/).slice(4).join(" "))}</h1>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout;