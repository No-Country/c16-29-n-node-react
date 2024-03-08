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
import { createStudent, deleteStudent, editStudent, getStudents } from "../../../actions/actions";

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
  const selectedTutorsOptions = useSelector((state) => state.tutorsOptions.selectedTutorsOptions);
  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const offcanvas = useDisclosure();
  const modal = useDisclosure();

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // UseEffect

  console.log(data)

  useEffect(() => {
    dispatch(getStudents())
  }, [dispatch])

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
      const newItem = {
        first_name: row.firstName,
        last_name: row.lastName,
        username: row.username,
        password: row.password,
        email: row.email,
        phone: row.phone,
        grade: row.grade,
        tutors: selectedTutorsOptions.map(option => ({ id: option.id })),
      }
      editStudent(newItem, row.id)
      .then(() => {
        dispatch(getStudents())
        resetState(offcanvas.handleClose)()
        showAlert("Alumno actualizado exitosamente", "success");
      })
      .catch(() => {
        showAlert("No se pudo actualizar el alumno", "error");
      })
  };

  const handleCreateItem = (row) => {
    const newItem = {
      first_name: row.firstName,
      last_name: row.lastName,
      role: "STUDENT",
      username: row.username,
      password: row.password,
      email: row.email,
      phone: row.phone,
      grade: row.grade,
      tutors: selectedTutorsOptions.map(option => ({ id: option.id })),
    }
    createStudent(newItem)
    .then(() => {
      dispatch(getStudents())
      resetState(offcanvas.handleClose)()
      showAlert("Alumno creado exitosamente", "success");
    })
    .catch(() => {
      showAlert("No se pudo crear el alumno", "error");
    })
  }

  const handleConfirmDeleteItem = (row) => {
    setActive({
      type: "delete",
      row
    })
    modal.handleOpen();
  }

  const handleDeleteItem = ({ id }) => {
    deleteStudent(id)
      .then(() => {
        dispatch(getStudents())
        resetState(modal.handleClose)()
        showAlert("Alumno eliminado exitosamente", "success");
      })
      .catch((error) => {
        showAlert(error.response.data.message, "error");
      })
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
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
          <div className=" p-4 rounded w-auto ">
            <Alert
              type={alert.type}
              message={alert.message}
              onDismiss={() => setAlert({ message: "", type: "" })}
            />
          </div>
        </div>
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
              id: active.row.id,
              firstName: active.row.firstName,
              lastName: active.row.lastName,
              username: active.row.username,
              password: active.row.password,
              email: active.row.email,
              phone: active.row.phone,
              grade: active.row.grade,
              tutors: active.row.tutors.map((tutor) => ({
                value: tutor.id,
                label: `${tutor.first_name} ${tutor.last_name}`
              }))
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
            text={`${active.row.firstName} ${active.row.lastName}`}
            onClose={resetState(modal.handleClose)}
            onConfirm={() => handleDeleteItem(active.row)}
          />
        )}
      </Modal>
    </div>
  );
}

export default PrincipalStudentsView;
