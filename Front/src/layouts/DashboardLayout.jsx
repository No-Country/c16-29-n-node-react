import Sidebar from "../components/sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

function DashboardLayout({ menues, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const paths = pathname.split(/(\/)/).slice(4);

  return (
    <div className="w-full h-full flex">
      <Sidebar menues={menues} />
      <div className="grow bg-light-white p-4 pb-0 h-screen flex flex-col">
        <h1 className="flex items-center gap-1 capitalize font-bold text-[#123259] text-2xl">
          {paths.length > 1 && (
            <img 
              src="/assets/left.svg" 
              className="block cursor-pointer w-8 h-8" 
              onClick={() => navigate(-1)}
            />
          )}
          {decodeURI(paths.join(" "))}</h1>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout;