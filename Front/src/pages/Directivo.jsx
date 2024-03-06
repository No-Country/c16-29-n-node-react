import { useRoutes } from "react-router-dom";
import PrincipalSubjectsView from "./principal/subjects";
import { DirectivoTutor } from "./principal/subjects/directivoTutor";
import PrincipalStudentsView from "./principal/students";
import PrincipalTeachersView from "./principal/teachers";
export const Directivo = () => {
  const routes = useRoutes([
    { path: "dashboard", element: <div>dashboard</div> },
    { path: "profesores/*", element: <PrincipalTeachersView/> },
    { path: "alumnos/*", element: <PrincipalStudentsView />  },
    { path: "tutor", element: <DirectivoTutor /> },
    { path: "materia/*", element: <PrincipalSubjectsView /> },
    { path: "configuración", element: <div>configuración</div> },
  ]);

  return routes;
};
