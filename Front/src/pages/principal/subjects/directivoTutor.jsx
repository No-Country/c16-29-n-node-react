import { useCallback, useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import Button from "../../../components/ui/button";
import OffCanvas from "../../../components/OffCanvas";
import tutorFields from "../../../config/tutorFields";
import { colourOptions } from "../../../utils/data";
import {
  setSelectedOptions,
  clearSelectedOptions,
} from "../../../actions/actions";
import { useDispatch } from "react-redux";
import { tutor } from "./see-subject/mockTuto";
import Alert from "../../../components/Alert";
import useDisclosure from "../../../hooks/useDisclosure";
import EditTutor from "../../../components/forms/edit-tutor";
import Offcanvas from "../../../components/ui/offcanvas";

export const DirectivoTutor = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [data, setData] = useState(tutor);

  const [active, setActive] = useState({
    type: "",
    row: {},
  });

  const dispatch = useDispatch();
  const offcanvas = useDisclosure();

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

  const handleEditItem = (updatedTutor) => {
    setData((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((tutor) => tutor.id === updatedTutor.id);
      newState[index] = updatedTutor;
      return newState;
    });
  };

  const columns = useMemo(() => {
    return [
      {
        Header: "Nombre completo",
        id: "id",
        accessorFn: (row) => {
          return `${row.firstName} ${row.lastName}`;
        },
      },
      {
        Header: "Alumnos asociados",
        id: "students.id",
        accessorFn: (row) =>
          row.students
            .map(
              (estudiante) => `${estudiante.firstName} ${estudiante.lastName}`
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
              <button onClick={() => original}>
                <img src="/assets/trash.svg" alt="eliminar materia" />
              </button>
            </div>
          );
        },
      },
    ];
  }, []);

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const handleCreateTutor = () => {
    setCurrentForm({
      actionType: "crearTutor",
      title: "Crear Tutor",
      fields: tutorFields(colourOptions),
      onSubmit: (formData) => {
        setTimeout(() => {
          setAlert({
            message: "1 Tutor registrado con éxito.",
            type: "success",
          });
          setShowOffCanvas(false);
        });
      },
    });
    setShowOffCanvas(true);
  };

  const handleCloseForm = useCallback(() => {
    setShowOffCanvas(false);
  }, []);

  return (
    <div className="grow overflow-auto">
      <div className="flex justify-between">
        <div className="w-full">
          <p>{data.length} registros</p>
          <SimpleTable
            columns={columns}
            data={data}
            actions={<Button onClick={handleCreateTutor}>Crear tutor</Button>}
          />
        </div>
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
        {showOffCanvas && (
          <OffCanvas
            title={currentForm.title}
            actionType={currentForm.actionType}
            onSubmit={currentForm.onSubmit}
            fields={currentForm.fields}
            handleCloseForm={handleCloseForm}
          />
        )}
        <Offcanvas
          isOpen={offcanvas.isOpen}
          onClose={resetState(offcanvas.handleClose)}
          title={"Crear Tutor"}
        >
          {active.type === "edit" && (
            <EditTutor
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
                students: active.row.students.map((estudiante) => ({
                  value: estudiante.id,
                  label: `${estudiante.firstName} ${estudiante.lastName}`,
                })),
              }}
            />
          )}
        </Offcanvas>
      </div>
    </div>
  );
};
