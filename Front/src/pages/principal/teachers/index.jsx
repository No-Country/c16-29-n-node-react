import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createTeacher,
  updateTeacher,
  fetchTeacher,
  deleteTeacher,
} from "./../../../store/slice/profesorSlice";
import SimpleTable from "../../../components/SimpleTabla";
import Button from "../../../components/ui/button";
import OffCanvas from "../../../components/ui/offcanvas";
import Modal from "../../../components/ui/modal";
import useDisclosure from "../../../hooks/useDisclosure";
import ConfirmDelete from "../../../components/modals/confirm-delete";
import CreateTeacherForm from "../../../components/forms/create-teacher";
import EditTeacher from "../../../components/forms/edit-teacher";
import { getSubjects } from "../../../store/slice/subjectsSlice";
import Alert from "../../../components/Alert";

const PrincipalTeachersView = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const offcanvas = useDisclosure();
  const modal = useDisclosure(); //modal para eliminar
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [active, setActive] = useState({
    type: "",
    row: {},
  });
  useEffect(() => {
    dispatch(fetchTeacher());
  }, [dispatch]);

  const resetState = (action) => () => {
    setSelectedTeacherId(null);
    action();
    setActive({
      type: "",
      row: {},
    });
  };
  const handleConfirmCreateTeacher = () => {
    dispatch(getSubjects());
    setActive({
      type: "create",
    });
    offcanvas.handleOpen();
  };

  const handleCreateTeacher = (teacherData) => {
    const formattedSubjects = teacherData.subjects.map((subject) => ({
      id: subject.value,
    }));
    const dataToSubmit = {
      ...teacherData,
      email: teacherData.email || undefined,
      phone: teacherData.phone || undefined,
      subjects: formattedSubjects,
    };

    dispatch(createTeacher(dataToSubmit))
      .unwrap()
      .then(() => {
        dispatch(fetchTeacher());
        setAlert({
          message: "Se creo el profesor correctamente",
          type: "success",
        });
        resetState(offcanvas.handleClose)();
      })
      .catch(() => {
        setAlert({
          message: "No se pudo crear el profesor",
          type: "error",
        });
      });
  };

  const handleConfirmEditTeacher = (row) => {
    dispatch(getSubjects());
    setSelectedTeacherId(row.id);
    setActive({
      type: "edit",
      row,
    });
    offcanvas.handleOpen();
  };

  const handleEditTeacher = async (teacherData) => {
    if (selectedTeacherId) {
      // Se obtiene los valores iniciales para la comparación
      const initialValues = active.row;

      // Objeto para almacenar solo los cambios
      let changes = {};

      // Iterar sobre los campos en teacherData para ver si han cambiado comparados con initialValues
      for (let key in teacherData) {
        if (teacherData[key] !== initialValues[key]) {
          changes[key] = teacherData[key];
        }
      }
      //solo se envia el id
      if (teacherData.subjects && teacherData.subjects.length > 0) {
        changes["subjects"] = teacherData.subjects.map((subject) => ({
          id: subject.value,
        }));
      }

      // Si hay cambios, despachar la acción updateTeacher con esos cambios
      if (Object.keys(changes).length > 0) {
        await dispatch(
          updateTeacher({ id: selectedTeacherId, teacherData: changes })
        )
          .unwrap()
          .then(() => {
            dispatch(fetchTeacher());
            setAlert({
              message: "Se edito el profesor correctamente",
              type: "success",
            });
            resetState(offcanvas.handleClose)();
          })
          .catch(() => {
            setAlert({
              message: "No se pudo editar al profesor",
              type: "error",
            });
          });
      } else {
        resetState(offcanvas.handleClose)();
      }
    } else {
      console.error("No se ha seleccionado ningún profesor para actualizar");
    }
  };
  const handleConfirmDeleteTeacher = (row) => {
    setActive({
      type: "delete",
      row,
    });
    modal.handleOpen();
  };
  const handleDeleteTeacher = async () => {
    if (active && active.type === "delete" && active.row.id) {
      try {
        await dispatch(deleteTeacher(active.row.id))
          .unwrap()
          .then(() => {
            dispatch(fetchTeacher());
            setAlert({
              message: "Se eliminó el profesor correctamente",
              type: "success",
            });
            resetState(modal.handleClose)();
          })
          .catch((message) => {
            setAlert({
              message: message,
              type: "error",
            });
          });
        modal.handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns = useMemo(() => {
    return [
      {
        Header: "Nombre",
        accessorKey: "first_name",
        id: "first_name",
      },
      {
        Header: "Apellido",
        accessorKey: "last_name",
        id: "last_name",
      },
      {
        Header: "Correo Electronico",
        accessorKey: "email",
        id: "email",
      },
      {
        Header: "Celular",
        accessorKey: "phone",
        id: "phone",
      },
      {
        Header: "Materias",
        accessorFn: (row) =>
          Array.isArray(row.subjects)
            ? row.subjects.map((subject) => subject.name).join("/")
            : "",
        id: "subjects",
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row }) => {
          return (
            <div className="flex justify-center gap-2">
              <button onClick={() => handleConfirmEditTeacher(row.original)}>
                <img src="/assets/edit.svg" alt="Editar profesor" />
              </button>
              <button onClick={() => handleConfirmDeleteTeacher(row.original)}>
                <img src="/assets/trash.svg" alt="Eliminar profesor" />
              </button>
            </div>
          );
        },
      },
    ];
  }, [teachers]);
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
      <p> {teachers.length} Registros</p>
      <SimpleTable
        columns={columns}
        data={teachers}
        actions={
          <Button onClick={handleConfirmCreateTeacher}>Crear Profesor</Button>
        }
      />
      <OffCanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={active.type === "create" ? "Crear Profesor" : "Editar Profesor"}
      >
        {active.type === "edit" && selectedTeacherId && (
          <EditTeacher
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleEditTeacher}
            initialValues={active.row}
          />
        )}
        {active.type === "create" && (
          <CreateTeacherForm
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleCreateTeacher}
          />
        )}
      </OffCanvas>
      <Modal isOpen={modal.isOpen} onClose={modal.handleClose}>
        {active.type === "delete" && (
          <ConfirmDelete
            text={`${active.row.first_name} ${active.row.last_name}`}
            onClose={resetState(modal.handleClose)}
            onConfirm={() => handleDeleteTeacher(active.row)}
          />
        )}
      </Modal>
    </div>
  );
};
export default PrincipalTeachersView;
