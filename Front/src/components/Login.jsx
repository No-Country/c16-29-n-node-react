import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/slice/auth";
import { useEffect } from "react";

export const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role);

  const navigate = useNavigate()

  useEffect(() => {
    switch(role){
      case "directivo":
        navigate("/directivo");
        break;
      case "profesor":
        navigate("/profesor");
        break;
      case "tutor":
        navigate("/tutor");
        break;
      case "/alumno":
        navigate("/alumno");
        break;
    }
  }, [role, navigate])

  const onChange = () => {
    console.log("ingreso un usuario real");
  };

  const roleAssignment = async () => {
    dispatch(login({
      username,
      password
    }))
  }

  //Falta detallar medidas y animacion de los Input(buscar en shadcn)
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/3 flex flex-col justify-center items-center px-8 py-8 rounded-lg border-4 border-neutral-700 gap-8">
        <div className="h-18 mx-auto">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div className="w-full flex flex-col items-center gap-y-4 relative ">
          <input
            type="text"
            placeholder="Ingrese su DNI"
            className="w-full p-4 rounded-lg border-2 border-neutral-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Ingrese su Contraseña"
            className="w-full p-4 rounded-lg border-2 border-neutral-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            href="#"
            className="text-blue-500 top-full right-0 absolute"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          />
        </div>
        <div className="flex justify-end ml-auto h-12 items-end">
          <button className="h-10 px-4 bg-[#9312FF] font-light text-white rounded-sm focus:outline-none hover:bg-violet-700"
           onClick={roleAssignment}>
            INICIAR SESIÓN |--
          </button>
        </div>
      </div>
    </div>
  );
};
