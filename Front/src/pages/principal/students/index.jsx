import { useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import MOCK from "./mock";
import { useRoutes, Link } from "react-router-dom";
import StudentView from "./see-student/index";

const PrincipalStudentsView = () => {
  const routes = useRoutes([
    { path: "/" , element: <StudentsView />},
    { path: "/:id", element: <StudentView />}
  ])

  return routes;
};

const StudentsView = () => {
  const handleAction = (action) => (row) => {
    console.log(action, row);
  }

  const [active, setActive] = useState(0);
  const [data, setData] = useState(MOCK);

  const filterSomething = (e) => {
    setData(data.filter((subject) => e.currentTarget.value))
  }

  // const filters = [
  //   (table) => (
  //   <div className="border-2">
  //     <label htmlFor="name"></label>
  //     <input type="text" />
  //   </div>
  //   ),
  //   (table) => (
  //   <div className="border-2">
  //     <label htmlFor="name"></label>
  //     <input type="text" />
  //   </div>
  //   ),
  // ]

  // const tabs = [
  //   (table, index) => (
  //     <div onClick={() => setActive(index)} className={`border-b-2 ${active === index ? "bg-slate-500" : ""}`}>
  //       Materia
  //     </div>
  //     ),
  //   (table, index) => (
  //   <div onClick={() => setActive(index)} className={`border-b-2 ${active === index ? "bg-slate-500" : ""}`}>
  //     Calificaciones
  //   </div>
  //   ),
  //   (table, index) => (
  //     <div onClick={() => setActive(index)} className={`border-b-2 ${active === index ? "bg-slate-500" : ""}`}>
  //       Inasistencias
  //     </div>
  //     ),
  //   (table, index) => (
  //   <div onClick={() => setActive(index)} className={`border-b-2 ${active === index ? "bg-slate-500" : ""}`}>
  //     Amonestaciones
  //   </div>
  //   ),
  //   (table, index) => (
  //     <div onClick={() => setActive(index)} className={`border-b-2 ${active === index ? "bg-slate-500" : ""}`}>
  //       Anotaciones
  //     </div>
  //     ),
  // ]

  const columns = useMemo(() => {
    return [
      {
        Header: "Nombre Completo",
        accessorKey: "name",
        cell: ({ row: { original } }) => <Link to={`${original.name} ${original.grade}° ${original.divition}`}>{original.name}</Link>
      },
      {
        id: "tutors",
        Header: "Tutores Asociados",
        accessorKey: "tutors"
      },
      {
        Header: "Estado",
        accessorKey: "state",
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex jutify-center gap-2">
            <button onClick={() => handleAction("edit")(original)}>
              <img src="/assets/edit.svg" alt="editar materia" />
            </button>
            <button onClick={() => handleAction("delete")(original)}>
              <img src="/assets/trash.svg" alt="eliminar materia" />
            </button>
          </div>
        ),
      },
    ];
  }, [])

  return (
    <div className="grow overflow-auto">
      <SimpleTable columns={columns} data={data} />
    </div>
  );
}

export default PrincipalStudentsView;
