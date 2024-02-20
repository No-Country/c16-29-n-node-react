
import { useRoutes, BrowserRouter } from "react-router-dom";
import { Login } from "./components/Login";
import { Directivo } from "./pages/Directivo"; 
import { Profesor } from "./pages/Profesor";
import { Tutor } from "./pages/Tutor";
import { Alumno } from "./pages/Alumno";


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login/> },
    { path: "/directivo", element: <Directivo /> },
    { path: "/profesor", element: <Profesor/> },
    { path: "/tutor", element: <Tutor /> },
    { path: "/alumno", element: <Alumno /> },    
  ]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );


}

export default App;
