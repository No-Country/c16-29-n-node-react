import { useEffect, useState } from "react";
import Tabs from "../../components/ui/tabs";
import Subject from "./subject";
import Exams from "./exams";
import NonAssistances from "./nonassistances";
import Banns from "./banns";
import Notes from "./notes";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    label: "Materias",
    value: "materias"
  },
  {
    label: "Evaluaciones",
    value: "evaluaciones"
  },
  {
    label: "Inasistencias",
    value: "inasistencias"
  },
  {
    label: "Amonestaciones",
    value: "amonestaciones"
  },
  {
    label: "Anotaciones",
    value: "anotaciones"
  }
]

const NotesView = () => {
  const [tab, setTab] = useState("materias");

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/profesor/" + tab);
  }, [tab, navigate]);

  return (
    <div className="grow flex flex-col">
      <Tabs 
        tabs={tabs} 
        active={tab} 
        onChange={(tab) => setTab(tab.value)} 
      />
      { tab === "materias" && <Subject /> }
      { tab === "evaluaciones" && <Exams /> }
      { tab === "inasistencias" && <NonAssistances /> }
      { tab === "amonestaciones" && <Banns /> }
      { tab === "anotaciones" && <Notes /> }
    </div>
  );
}

export default NotesView