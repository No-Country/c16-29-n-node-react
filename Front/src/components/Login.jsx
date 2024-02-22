import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [dni, setDni] = useState(""); 

  const navigate = useNavigate()

  const onChange = () => {
    console.log("ingreso un usuario real");
  };

  const roleAssignment = () => {
    switch (dni.toLowerCase()) {
      case "director":
       navigate("/directivo");
        break;
      case "profesor":
        navigate("/profesor");
        break;
      case "tutor":
        navigate("/tutor");
        break;
      case "alumno":
        navigate("/alumno");
        break;
      default:
        console.log("Rol no válido");
        break;
    }
  }


//Falta detallar medidas y animacion de los Input(buscar en shadcn)
  return (
    <div className="w-full h-full pt-16 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[498px] h-[590px] p-12 bg-neutral-100 rounded-lg border-4 border-neutral-700 gap-12">
        <div className="w-[402px] h-18 mt-0 ml-12 mr-12">
          <h1 className="text-5xl text-center font-normal text-[#1368CE]">
            AppRendimiento
          </h1>
        </div>
        <div className="flex flex-col items-center gap-y-4 w-[498px] h-[162px] relative ">
          <input
            type="text"
            placeholder="Ingrese su DNI"
            className="w-[410px] h-[53px] p-4 rounded-lg border-2 border-neutral-500"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <input
            type="password"
            placeholder="Ingrese su Contraseña"
            className="w-[410px] h-[53px] p-4 rounded-lg border-2 border-neutral-500"
          />
          <a
            href="#"
            className="text-blue-500 mt-32 ml-56 absolute"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="flex justify-center mb-7">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          />
        </div>
        <div className="flex justify-end w-[410px] h-12 pb-4 items-end">
          <button className="w-[186px] h-10 px-4  bg-[#9312FF] font-light text-white rounded-sm focus:outline-none hover:bg-violet-700"
           onClick={roleAssignment}>
            INICIAR SESIÓN |--
          </button>
        </div>
      </div>
    </div>
  );
};
