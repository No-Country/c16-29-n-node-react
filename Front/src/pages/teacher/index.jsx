import { useState } from "react";
import Tabs from "../../components/ui/tabs";
import Subject from "./subject";
import Exams from "./exams";
import NonAssistances from "./nonassistances";
import Banns from "./banns";
import Notes from "./notes";

const tabs = [
  {
    label: "Materia",
    value: "subject"
  },
  {
    label: "Evaluaciones",
    value: "exams"
  },
  {
    label: "Inasistencias",
    value: "nonassistances"
  },
  {
    label: "Amonestaciones",
    value: "banns"
  },
  {
    label: "Anotaciones",
    value: "notes"
  }
]

const NotesView = () => {
  const [tab, setTab] = useState("subject");

  return (
    <div className="grow flex flex-col">
      <Tabs 
        tabs={tabs} 
        active={tab} 
        onChange={(tab) => setTab(tab.value)} 
      />
      { tab === "subject" && <Subject /> }
      { tab === "exams" && <Exams /> }
      { tab === "nonassistances" && <NonAssistances /> }
      { tab === "banns" && <Banns /> }
      { tab === "notes" && <Notes /> }
    </div>
  );
}

export default NotesView