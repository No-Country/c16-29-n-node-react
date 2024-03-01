import { useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import MOCK from "./mock";
import { useRoutes } from "react-router-dom";
import CreateStudent from "../../../components/forms/create-student";
import EditStudent from "../../../components/forms/edit-student";
import Button from "../../../components/ui/button";
import Offcanvas from "../../../components/ui/offcanvas";
import Modal from "../../../components/ui/modal";
import useDisclosure from "../../../hooks/useDisclosure";
import ConfirmDelete from "../../../components/modals/confirm-delete";
import { useSelector } from "react-redux";

const PrincipalStudentsView = () => {
  const routes = useRoutes([
    { path: "/", element: <StudentsView /> }
  ])

  return routes;
};

const StudentsView = () => {

  // Estados

  const selectedOptions = useSelector((state) => state.select.selectedOptions);

  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const offcanvas = useDisclosure();
  const modal = useDisclosure();
  const [data, setData] = useState(MOCK);

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // Funciones 

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {}
    });
  }

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

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
    setData((data) =>
      data.map((student) =>
        student.id === active.row.id ? {
          ...row,
          name: row.name,
          state: row.state,
          tutors: selectedOptions.map(option => option.label),
          email: row.email,
          phonenumber: row.phonenumber,
          password: row.password,
          username: row.username
        } : student
      )
    );
    offcanvas.handleClose();
  };

  const handleCreateItem = (row) => {
    setData((prevData) => {
      const newId = Math.max(...prevData.map(item => item.id), 0) + 1;
      const newItem = {
        id: newId,
        name: row.name,
        lastname: row.lastname,
        username: row.username,
        password: row.password,
        email: row.email,
        phonenumber: row.phonenumber,
        tutors: selectedOptions.map(option => option.label),
        state: row.state,
      }
      return [...prevData, newItem];
    });
    offcanvas.handleClose();
  }

  const handleConfirmDeleteItem = (row) => {
    setActive({
      type: "delete",
      row
    })
    modal.handleOpen();
  }

  const handleDeleteItem = ({ id }) => {
    setData((students) => students.filter((student) => student.id !== id))
  }

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // Columnas 

  const columns = useMemo(() => {
    return [
      {
        Header: "Nombre",
        accessorKey: "name",
      },
      {
        Header: "Apellido",
        accessorKey: "lastname",
      },
      {
        Header: "Correo Electrónico",
        accessorKey: "email",
      },
      {
        Header: "Celular",
        accessorKey: "phonenumber",
      },
      {
        Header: "Tutor asociado",
        id: "tutors",
        accessor: "tutors",
        cell: ({ row: { original } }) => (
          data ? (
            <span>{original.tutors?.join(" / ")}</span>
          ) : null
        ),
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex jutify-center gap-2">
            <button onClick={() => handleConfirmEditItem(original)}>
              <img src="/assets/edit.svg" alt="editar alumno" />
            </button>
            <button onClick={() => handleConfirmDeleteItem(original)}>
              <img src="/assets/trash.svg" alt="eliminar alumno" />
            </button>
          </div>
        ),
      },
    ];
  }, [])

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  return (
    <div className="grow flex flex-col overflow-auto">
      <p>{data.length} Registros</p>
      <SimpleTable
        columns={columns}
        data={data}
        actions={<Button onClick={handleConfirmCreateItem}>Crear Alumno</Button>}
      />
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Editar Alumno"}
      >
        {active.type === "create" && (
          <CreateStudent
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleCreateItem}
          />
        )}
        {active.type === "edit" && (
          <EditStudent
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleEditItem}
            initialValues={{
              name: active.row.name,
              lastname: active.row.lastname,
              username: active.row.username,
              password: active.row.password,
              email: active.row.email,
              phonenumber: active.row.phonenumber,
              state: active.row.state,
            }}
          />
        )}
      </Offcanvas>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.handleClose}
      >
        {active.type === "delete" && (
          <ConfirmDelete
            text={`${active.row.name} ${active.row.grade}° ${active.row.divition}`}
            onClose={resetState(modal.handleClose)}
            onConfirm={() => handleDeleteItem(active.row)}
          />
        )}
      </Modal>
    </div>
  );
}

export default PrincipalStudentsView;
