import { useRoutes } from "react-router-dom";
import NotesView from "./teacher";
import SubjectView from "./teacher/subject/see-subject/see-subject";

export const Profesor = () => {
  const routes = useRoutes([
    { path: "dashboard", element: <div>dashboard</div> },
    { path: "materias/:id", element: <SubjectView /> },
    { path: "materias", element: <NotesView /> },
    { path: "anotaciones", element: <NotesView /> },
    { path: "amonestaciones", element: <NotesView /> },
    { path: "inasistencias", element: <NotesView /> },
    { path: "evaluaciones", element: <NotesView /> },
    { path: "configuración", element: <div>configuración</div> },
  ]);


  return routes;

};
