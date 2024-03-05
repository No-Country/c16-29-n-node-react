import { useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import MOCK from "./mock";
import { useRoutes, Link } from "react-router-dom";
import SubjectView from "./see-subject/index";
import CreateSubject from "../../../components/forms/create-subject";
import EditSubject from "../../../components/forms/edit-subject";
import Button from "../../../components/ui/button";
import Offcanvas from "../../../components/ui/offcanvas";
import Modal from "../../../components/ui/modal";
import useDisclosure from "../../../hooks/useDisclosure";
import ConfirmDelete from "../../../components/modals/confirm-delete";

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
  const offcanvas = useDisclosure();
  const modal = useDisclosure();
  const [data, setData] = useState(MOCK);

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {}
    });
  } 

  const handleConfirmCreateItem = () => {
    setActive({
      type: "create"
    });
    offcanvas.handleOpen();
  }

  const handleConfirmEditItem = (row) => {
    setActive({
      type: "edit",
      row
    })
    offcanvas.handleOpen();
  }

  const handleEditItem = (row) => {
    setData((data) => data.map((subject) => {
      return subject.id === active.row.id 
      ? (
          {
            ...row,
            name: row.subject,
            teachers: [{
              id: row.teacher.value,
              name: row.teacher.label,
            }],
            students: []
          }
        ) 
      : (
        subject
      )
    })
    )
  }

  const handleCreateItem = (row) => {
    setData((data) => data.concat({
      ...row,
      name: row.subject,
      teachers: [{
        id: row.teacher.value,
        name: row.teacher.label,
      }],
      students: []
    }))
  }

  const handleConfirmDeleteItem = (row) => {
    setActive({
      type: "delete",
      row
    })
    modal.handleOpen();
  }

  const handleDeleteItem = ({ id }) => {
    setData((subjects) => subjects.filter((subject) => subject.id !== id))
  }

  const columns = useMemo(() => {
    return [
      {
        Header: "Materia",
        accessorKey: "name",
        cell: ({ row: { original } }) => (
          <Link 
            to={`${original.name}_${original.grade}°_${original.divition}`}
            className="underline text-[#1368CE]"
          >
            {original.name}
          </Link>
        )
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
            <button onClick={() => handleConfirmEditItem(original)}>
              <img src="/assets/edit.svg" alt="editar materia" />
            </button>
            <button onClick={() => handleConfirmDeleteItem(original)}>
              <img src="/assets/trash.svg" alt="eliminar materia" />
            </button>
          </div>
        ),
      },
    ];
  }, [])

  return (
    <div className="grow flex flex-col overflow-auto">
      <p>{data.length} Registros</p>
      <SimpleTable 
        columns={columns} 
        data={data}
        actions={<Button onClick={handleConfirmCreateItem}>Crear Materia</Button>}
      />
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Crear Materia"}
      >
        { active.type === "create" && (
          <CreateSubject 
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleCreateItem}
          />
        ) }
        { active.type === "edit" && (
          <EditSubject 
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleEditItem}
            initialValues={{
              subject: active.row.name,
              grade: active.row.grade.toString(),
              divition: active.row.divition,
              teacher: {
                value: active.row.teachers[0].id,
                label: active.row.teachers[0].name
              }
            }}
          />
        ) }
      </Offcanvas>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.handleClose}
      >
        { active.type === "delete" && (
          <ConfirmDelete 
            text={`${active.row.name} ${active.row.grade}° ${active.row.divition}`}
            onClose={resetState(modal.handleClose)}
            onConfirm={() => handleDeleteItem(active.row)}
          />
        ) }
      </Modal>
    </div>
  );
}

export default PrincipalSubjectsView;
