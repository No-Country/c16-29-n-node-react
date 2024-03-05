import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/auth";

function Sidebar({ menues }) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
           <li onClick={() => dispatch(logout())} className={'text-white text-sm flex items-center gap-x-1 cursor-pointer hover:bg-violet-950 rounded-md mt-auto'}>
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
