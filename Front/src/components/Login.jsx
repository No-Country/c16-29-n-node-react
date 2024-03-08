import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetStatus } from "../store/slice/auth";
import { useEffect } from "react";
import Alert from "./Alert";
import Button from "./ui/button";
import Loader from "./ui/loader";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const status = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "failed") {
      setAlert({
        message: "El usuario o contraseña son incorrectos",
        type: "error",
      });
      dispatch(resetStatus());
    }
    if (status === "disconnected") {
      setAlert({
        message: "Se terminó el tiempo limite de sesion, se redirigio al inicio",
        type: "error",
      });
      dispatch(resetStatus());
    }
  }, [dispatch, status]);

  useEffect(() => {
    switch (role) {
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
  }, [role, navigate]);

  const roleAssignment = async () => {
    dispatch(
      login({
        username,
        password,
      })
    );
  };

  //Falta detallar medidas y animacion de los Input(buscar en shadcn)
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader 
        isLoading={status === "pending"}
      />
      {alert.message && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
          <div className=" p-4 rounded w-auto ">
            <Alert
              type={alert.type}
              message={alert.message}
              onDismiss={() => setAlert({ message: "", type: "" })}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col min-w-[300px] w-[40vw] max-w-[600px] justify-center items-center px-8 py-8 rounded-lg border-4 border-neutral-700 gap-8">
        <div className="mx-auto">
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
          <a href="#" className="text-blue-500 top-full right-0 absolute">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="flex justify-end ml-auto h-12 items-end">
          <Button className="flex gap-2 items-center" onClick={roleAssignment}>
            INICIAR SESIÓN
            <img src="/assets/login-arrow.svg" />
          </Button>
        </div>
      </div>
    </div>
  );
};
