import { useRoutes } from "react-router-dom";
import NotesView from "./teacher";

export const Profesor = () => {
  const routes = useRoutes([
    { path: "dashboard", element: <div>dashboard</div> },
    { path: "anotaciones/*", element: <NotesView /> },
    { path: "configuración", element: <div>configuración</div> },
  ]);

  return routes;
};
