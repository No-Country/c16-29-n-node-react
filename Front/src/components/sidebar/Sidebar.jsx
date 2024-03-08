import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/auth";

const roles = {
  PRINCIPAL: "directivo",
  TEACHER: "profesor",
  TUTOR: "tutor",
  STUDENT: "alumno"
}

function Sidebar({ menues }) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='flex text-custom-menu-text'>
      <div className={'flex justify-end'}>
        <img
          src="/assets/hamburguesa.png"
          className={`absolute cursor-pointer
          top-2 w-12 h-11 border-2 border-purple z-10 rounded-md hover:bg-violet-950  duration-500`}
          onClick={() => setOpen(!open)}
        />
        <div className={`${open ? 'w-56 justify-start' : 'w-12 justify-start'} flex align-center duration-500 h-screen pt-8 bg-purple relative`}>

          <ul className={`pt-6 pb-6 flex flex-col ${open && 'w-full'} overflow-x-hidden`}>
            {menues.map((menu, index) => (
              <li key={index} onClick={() => navigate(`./${menu.text.toLocaleLowerCase()}`)} className={'text-white text-sm flex items-center gap-x-1 cursor-pointer hover:bg-violet-950 rounded-md'}>
                  <img src={`/assets/${menu.title}.png`} />
                <span className={`${open ? "" : "opacity-0"} duration-300 tracking-wide text-base opacity-80`}>{menu.text}</span>
              </li>
            ))}
            {user && (
              <>
                <li className={'w-[calc(14rem-0.25rem)] mt-4 text-white text-sm flex flex-col gap-x-1 rounded-md pl-[calc(0.25rem+46px)]'}>
                  <h2>Nombre</h2>
                  <span className={`${open ? "" : "opacity-0"} duration-300 tracking-wide text-base opacity-80 capitalize`}>{user.firstName} {user.lastName}</span>
                </li>
                <li className={'w-[calc(14rem-0.25rem+46px)] mt-4 text-white text-sm flex flex-col gap-x-1 rounded-md pl-[calc(0.25rem+46px)]'}>
                  <h2>Rol</h2>
                  <span className={`${open ? "" : "opacity-0"} duration-300 tracking-wide text-base opacity-80 capitalize`}>{roles[user.role]}</span>
                </li>
              </>
            )}
           <li onClick={handleLogout} 
            className={'text-white text-sm flex items-center gap-x-1 cursor-pointer hover:bg-violet-950 rounded-md mt-auto'}>
            <img src='/assets/logout.png' />
            <span className={`${open ? "" : "opacity-0"} duration-300 text-base opacity-80`}>Cerrar</span>
            <span className={`${open ? "" : "opacity-0"} duration-300 text-base opacity-80`}>sesión</span>
           </li>
          </ul>
        </div>       
      </div>
    </div>
  )
}

export default Sidebar
