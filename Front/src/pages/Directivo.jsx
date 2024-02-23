import { useRoutes } from "react-router-dom";
import PrincipalSubjectsView from "./principal/subjects";
import { DirectivoTutor } from "./principal/subjects/directivoTutor";

export const Directivo = () => {
  const routes = useRoutes([
    { path: "dashboard", element: <div>dashboard</div> },
    { path: "profesores", element: <div>profesores</div> },
    { path: "alumnos", element: <div>alumnos</div> },
    { path: "tutor", element: <div><DirectivoTutor /></div> },
    { path: "materia/*", element: <PrincipalSubjectsView /> },
    { path: "configuración", element: <div>configuración</div> },
  ]);

  return routes;
};
