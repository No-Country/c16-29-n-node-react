import { useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import MOCK from "./mock";
import { useRoutes, Link } from "react-router-dom";
import SubjectView from "./see-subject/index";
import OffCanvas from "../../../components/OffCanvas";
import Button from "../../../components/ui/button";
import Offcanvas from "../../../components/ui/offcanvas";
import Modal from "../../../components/ui/modal";
import useDisclosure from "../../../hooks/useDisclosure";

const PrincipalSubjectsView = () => {
  const routes = useRoutes([
    { path: "/" , element: <SubjectsView />},
    { path: "/:id", element: <SubjectView />}
  ])

  return routes;
};

const SubjectsView = () => {
  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const {handleClose, handleOpen, isOpen} = useDisclosure();
  const [data, setData] = useState(MOCK);

  const handleAction = (action) => (row) => {
    setActive({
      type: action,
      row
    })
  }

  const columns = useMemo(() => {
    return [
      {
        Header: "Materia",
        accessorKey: "name",
        cell: ({ row: { original } }) => <Link to={`${original.name} ${original.grade}° ${original.divition}`}>{original.name}</Link>
      },
      {
        id: "grade",
        Header: "Grado",
        accessorFn: (row) => row.grade + "°",
      },
      {
        Header: "Division",
        accessorKey: "divition",
      },
      {
        Header: "Profesor Asociado",
        id: "teacher",
        accessorFn: (row) => row.teachers[0].name,
      },
      {
        Header: "# Alumnos",
        id: "students",
        accessorFn: (row) => row.students.length,
        cell: (props) => <p className="text-right pr-2">{props.cell.getValue()}</p>
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
      <button onClick={handleOpen}>Hola</button>
      <SimpleTable 
        columns={columns} 
        data={data}
        actions={<Button onClick={handleAction("create")}>Crear Materia</Button>}
      />
      {
        active.type === "edit" && <OffCanvas 
          title={"Editar Materia"}
          fields={[]}
          actionType={""}
          handleCloseForm={() => setActive({
            row: "",
            type: {}
          })}
        />
      }
      <Offcanvas
        isOpen={false}
        onClose={handleClose}
        title={"Crear Materia"}
      >

      </Offcanvas>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      ></Modal>
    </div>
  );
}

export default PrincipalSubjectsView;
