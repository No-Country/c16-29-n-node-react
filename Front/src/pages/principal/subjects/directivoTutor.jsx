import { useEffect, useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import Button from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../components/Alert";
import useDisclosure from "../../../hooks/useDisclosure";
import EditTutor from "../../../components/forms/edit-tutor";
import Offcanvas from "../../../components/ui/offcanvas";
import CreateTutor from "../../../components/forms/create-tutor";
import {
  createTutor,
  deleteTutor,
  fetchTutor,
  hideAlert,
  resetStates,
  updateTutor,
} from "./../../../store/slice/tutorSlice";
import Modal from "../../../components/ui/modal";
import ConfirmDelete from "../../../components/modals/confirm-delete";
import { setSelectedOptions } from "../../../actions/actions";

export const DirectivoTutor = () => {
  const dispatch = useDispatch();
  const tutors = useSelector((state) => state.tutor.tutors);
  const stateCreating = useSelector((state) => state.tutor.stateCreating);
  const stateUpdating = useSelector((state) => state.tutor.stateUpdating);
  const stateDeleting = useSelector((state) => state.tutor.stateDeleting);
  const selectedOptions = useSelector((state) => state.select.selectedOptions);
  const stateAlertMessage = useSelector(
    (state) => state.tutor.stateAlertMessage
  );
  const alertType = useSelector((state) => state.tutor.alertType);
  // const stateMessage = useSelector((state) => state.tutor.alertMessage);

  const offcanvas = useDisclosure();
  const modal = useDisclosure();

  // const [data, setData] = useState(tutor);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [active, setActive] = useState({
    type: "",
    row: {},
  });

  useEffect(() => {
    if (
      !stateCreating.isLoading &&
      !stateUpdating.isLoading &&
      !stateDeleting.isLoading
    ) {
      const status = [stateCreating, stateUpdating, stateDeleting];
      if (status.some(({ status }) => status === "rejected")) {
        setAlert({
          message: stateAlertMessage,
          type: alertType,
        });
        dispatch(resetStates());
      } else if (status.some(({ status }) => status === "completed")) {
        setAlert({
          message: stateAlertMessage,
          type: alertType,
        });
        dispatch(resetStates());
        resetState();
        modal.handleClose();
        offcanvas.handleClose();
      }
      dispatch(fetchTutor());
      dispatch(setSelectedOptions([]));
      dispatch(hideAlert());
    }
  }, [dispatch, stateCreating, stateUpdating, stateDeleting]);

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {},
    });
    dispatch(setSelectedOptions([]));
  };

  const handleConfirmCreateItem = () => {
    setActive({
      type: "create",
    });
    offcanvas.handleOpen();
  };

  const handleConfirmEditItem = (row) => {
    setActive({
      type: "edit",
      row,
    });
    offcanvas.handleOpen();
  };

  const handleConfirmDeleteItem = (row) => {
    setActive({
      type: "delete",
      row,
    });
    modal.handleOpen();
  };

  const handleDeleteItem = ({ id }) => {
    dispatch(deleteTutor(id));
  };

  const handleCreateItem = (row) => {
    const parsedStudents = row.students.map((student) => {
      return {
        id: student.value,
      };
    });
    const newItem = {
      first_name: row.firstName,
      last_name: row.lastname,
      username: row.username,
      password: row.password,
      email: row.email,
      phone: row.phone,
      role: "TUTOR",
      students: parsedStudents,
    };
    dispatch(createTutor(newItem));
  };

  const handleEditItem = (updatedTutor) => {
    dispatch(
      updateTutor({
        id: updatedTutor.id,
        tutorData: {
          first_name: updatedTutor.firstName,
          last_name: updatedTutor.lastName,
          username: updatedTutor.username,
          email:
            updatedTutor.email === active.row.email
              ? undefined
              : updatedTutor.email,
          password: updatedTutor.password,
          phone: updatedTutor.phone,
          students: selectedOptions.map(({ value }) => ({
            id: value,
          })),
        },
      })
    );
  };

  const columns = useMemo(() => {
    return [
      {
        Header: "Nombre completo",
        id: "id",
        accessorFn: (row) => {
          return `${row.first_name} ${row.last_name}`;
        },
      },
      {
        Header: "Alumnos asociados",
        id: "students.id",
        accessorFn: (row) =>
          row.students
            .map(
              (estudiante) => `${estudiante.first_name} ${estudiante.last_name}`
            )
            .join(", "),
      },

      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => {
          return (
            <div className="flex jutify-center gap-2">
              <button onClick={() => handleConfirmEditItem(original)}>
                <img src="/assets/edit.svg" alt="editar materia" />
              </button>
              <button onClick={() => handleConfirmDeleteItem(original)}>
                <img src="/assets/trash.svg" alt="eliminar materia" />
              </button>
            </div>
          );
        },
      },
    ];
  }, [tutors]);

  return (
    <div className="grow flex flex-col overflow-auto">
      <p>{tutors.length} registros</p>
      <SimpleTable
        columns={columns}
        data={tutors}
        actions={<Button onClick={handleConfirmCreateItem}>Crear tutor</Button>}
      />
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
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Crear Tutor"}
      >
        {active.type === "create" && (
          <CreateTutor
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleCreateItem}
          />
        )}
        {active.type === "edit" && (
          <EditTutor
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleEditItem}
            initialValues={{
              id: active.row.id,
              firstName: active.row.first_name,
              lastName: active.row.last_name,
              username: active.row.username,
              email: active.row.email,
              phone: active.row.phone,
              students: active.row.students.map((estudiante) => ({
                value: estudiante.id,
                label: `${estudiante.first_name} ${estudiante.last_name}`,
              })),
            }}
          />
        )}
      </Offcanvas>
      <Modal isOpen={modal.isOpen} onClose={resetState(modal.handleClose)}>
        {active.type === "delete" && (
          <ConfirmDelete
            text={`${active.row.first_name} ${active.row.last_name}`}
            onClose={resetState(modal.handleClose)}
            onConfirm={() => handleDeleteItem(active.row)}
          />
        )}
      </Modal>
    </div>
  );
};
