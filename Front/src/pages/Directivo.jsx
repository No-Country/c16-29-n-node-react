import { useRoutes } from "react-router-dom";

export const Directivo = () => {

  const routes = useRoutes([
    {path: "dashboard", element: <div>dashboard</div>},
    {path: "profesores", element: <div>profesores</div>},
    {path: "alumnos", element: <div>alumnos</div>},
    {path: "tutor", element: <div>tutor</div>},
    {path: "materia", element: <div>materia</div>},
    {path: "configuración", element: <div>configuración</div>}
  ])

  return routes;
};
