import { useEffect, useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import { useRoutes, Link } from "react-router-dom";
import SubjectView from "./see-subject/index";
import CreateSubject from "../../../components/forms/create-subject";
import EditSubject from "../../../components/forms/edit-subject";
import Button from "../../../components/ui/button";
import Offcanvas from "../../../components/ui/offcanvas";
import Modal from "../../../components/ui/modal";
import useDisclosure from "../../../hooks/useDisclosure";
import ConfirmDelete from "../../../components/modals/confirm-delete";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubject,
  deleteSubject,
  fetchSubjects,
  hideAlert,
  resetStates,
  updateSubject,
} from "../../../store/slice/principal-subjects-slice";
import Alert from "../../../components/Alert";

const PrincipalSubjectsView = () => {
  const routes = useRoutes([
    { path: "/", element: <SubjectsView /> },
    { path: "/:id", element: <SubjectView /> },
  ]);

  return routes;
};

const SubjectsView = () => {
  const [active, setActive] = useState({
    type: "",
    row: {},
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const offcanvas = useDisclosure();
  const modal = useDisclosure();
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.principalSubjects.subjects);
  const stateCreating = useSelector(
    (state) => state.principalSubjects.stateCreating
  );
  const stateUpdating = useSelector(
    (state) => state.principalSubjects.stateUpdating
  );
  const stateDeleting = useSelector(
    (state) => state.principalSubjects.stateDeleting
  );
  const alertType = useSelector((state) => state.principalSubjects.alertType);
  const alertMessage = useSelector(
    (state) => state.principalSubjects.alertMessage
  );

  useEffect(() => {
    if (
      !stateCreating.isLoading &&
      !stateUpdating.isLoading &&
      !stateDeleting.isLoading
    ) {
      const status = [stateCreating, stateUpdating, stateDeleting];
      if (status.some(({ status }) => status === "rejected")) {
        setAlert({
          message: alertMessage,
          type: alertType,
        });
        dispatch(resetStates());
        console.log(status);
      } else if (status.some(({ status }) => status === "completed")) {
        setAlert({
          message: alertMessage,
          type: alertType,
        });
        dispatch(resetStates());
        resetState();
        modal.handleClose();
        offcanvas.handleClose();
      }
      dispatch(fetchSubjects());
      dispatch(hideAlert());
    }
  }, [dispatch, stateCreating, stateUpdating, stateDeleting]);

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {},
    });
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

  const handleEditItem = (subject) => {
    const teachers = subject.teachers.map(({ value }) => value);
    dispatch(
      updateSubject({
        id: active.row.id,
        data: {
          ...subject,
          teachers,
        },
      })
    );
  };

  const handleCreateItem = (subject) => {
    const teachers = subject.teachers.map(({ value }) => value);
    dispatch(
      createSubject({
        ...subject,
        teachers,
      })
    );
  };

  const handleConfirmDeleteItem = (row) => {
    setActive({
      type: "delete",
      row,
    });
    modal.handleOpen();
  };

  const handleDeleteItem = ({ id }) => {
    dispatch(deleteSubject(id));
  };

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
        ),
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
        accessorFn: (row) =>
          row.teachers.length ? row.teachers[0].first_name : "",
      },
      {
        Header: "# Alumnos",
        id: "students",
        accessorFn: (row) => row.students.length,
        cell: (props) => (
          <p className="text-right pr-2">{props.cell.getValue()}</p>
        ),
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex justify-center gap-2">
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
  }, []);
  
  return (
    <div className="grow flex flex-col overflow-auto">
      <p>{subjects.length} Registros</p>
      <SimpleTable
        columns={columns}
        data={subjects}
        actions={
          <Button onClick={handleConfirmCreateItem}>Crear Materia</Button>
        }
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
        title={"Crear Materia"}
      >
        {active.type === "create" && (
          <CreateSubject
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleCreateItem}
          />
        )}
        {active.type === "edit" && (
          <EditSubject
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleEditItem}
            initialValues={{
              name: active.row.name,
              grade: active.row.grade.toString(),
              divition: active.row.divition,
              teachers: active.row.teachers.map(
                ({ id, first_name, last_name }) => ({
                  value: id,
                  label: `${first_name} ${last_name}`,
                })
              ),
            }}
          />
        )}
      </Offcanvas>
      <Modal isOpen={modal.isOpen} onClose={modal.handleClose}>
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
};

export default PrincipalSubjectsView;
