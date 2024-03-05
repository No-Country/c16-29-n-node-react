import { useRoutes, BrowserRouter } from "react-router-dom";
import { Login } from "./components/Login";
import { Directivo } from "./pages/Directivo"; 
import { Profesor } from "./pages/Profesor";
import { Tutor } from "./pages/Tutor";
import { Alumno } from "./pages/Alumno";
import DashboardLayout from "./layouts/DashboardLayout";
import { PrincipalMenues, TeacherMenues, TutorMenues, StudentMenues } from "./components/sidebar/menues";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login/> },
    { path: "/directivo/*", element: <DashboardLayout menues={PrincipalMenues}><Directivo /></DashboardLayout> },
    { path: "/profesor/*", element: <DashboardLayout menues={TeacherMenues}><Profesor/></DashboardLayout> },
    { path: "/tutor/*", element: <DashboardLayout menues={TutorMenues}><Tutor /></DashboardLayout> },
    { path: "/alumno/*", element: <DashboardLayout menues={StudentMenues}><Alumno /></DashboardLayout> }
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
