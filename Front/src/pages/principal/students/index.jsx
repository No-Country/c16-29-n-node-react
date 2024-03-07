import { useEffect, useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import { useRoutes } from "react-router-dom";
import CreateStudent from "../../../components/forms/create-student";
import EditStudent from "../../../components/forms/edit-student";
import Button from "../../../components/ui/button";
import Offcanvas from "../../../components/ui/offcanvas";
import Modal from "../../../components/ui/modal";
import useDisclosure from "../../../hooks/useDisclosure";
import ConfirmDelete from "../../../components/modals/confirm-delete";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../components/Alert";
import { getStudents } from "../../../actions/actions";

// URL BACK https://no-country-backend-dev-srdg.1.us-1.fl0.io/api/users/role

const PrincipalStudentsView = () => {
  const routes = useRoutes([
    { path: "/", element: <StudentsView /> }
  ])

  return routes;
};

const StudentsView = () => {

  // Estados

  const dispatch = useDispatch();
  const data = useSelector((state) => state.students.students);
  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const offcanvas = useDisclosure();
  const modal = useDisclosure();
  // const [data, setData] = useState(MOCK);

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // UseEffect

  useEffect(() => {
    dispatch(getStudents())
  }, [])

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

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

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
          firstName: row.firstName,
          lastName: row.lastName,
          tutors: selectedOptions.map(option => option.label),
          email: row.email,
          phone: row.phone,
          password: row.password,
          username: row.username,
          grade: row.grade,
        } : student
      )
    );
    showAlert("Alumno editado exitosamente", "success");
    offcanvas.handleClose();
  };

  const handleCreateItem = (row) => {
    setData((prevData) => {
      const newId = Math.max(...prevData.map(item => item.id), 0) + 1;
      const newItem = {
        id: newId,
        firstName: row.firstName,
        lastName: row.lastName,
        username: row.username,
        password: row.password,
        email: row.email,
        phone: row.phone,
        grade: row.grade,
        tutors: selectedOptions.map(option => option.label),
      }
      return [...prevData, newItem];
    });
    showAlert("Alumno creado exitosamente", "success");
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
    showAlert("Alumno eliminado exitosamente", "error");
  }

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // Columnas 

  const columns = useMemo(() => {
    return [
      {
        Header: "Nombre",
        accessorKey: "firstName",
      },
      {
        Header: "Apellido",
        accessorKey: "lastName",
      },
      {
        Header: "Correo Electrónico",
        accessorKey: "email",
      },
      {
        Header: "Celular",
        accessorKey: "phone",
      },
      {
        Header: "Grado",
        accessorKey: "grade",
      },
      {
        Header: "Tutor asociado",
        id: "tutors",
        accessor: "tutors",
        cell: ({ row: { original } }) => (
          data ? (
            <span>
              {original.tutors.map(tutor => tutor.fullName).join(" / ")}
            </span>
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
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onDismiss={() => setAlert({ message: "", type: "" })}
        />
      )}
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
              firstName: active.row.firstName,
              lastName: active.row.lastName,
              username: active.row.username,
              password: active.row.password,
              email: active.row.email,
              phone: active.row.phone,
              grade: active.row.grade,
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
