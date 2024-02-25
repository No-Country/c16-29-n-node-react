import { useCallback, useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla";
import OffCanvas from "../../../components/OffCanvas";
import tutorFields from "../../../config/tutorFields";
import { colourOptions } from "../../../utils/data";
import { setSelectedOptions, clearSelectedOptions } from "../../../actions/actions";
import { useDispatch } from "react-redux";
import MOCK from "./mock";
import Alert from "../../../components/Alert";

export const DirectivoTutor = () => {
  const [alert, setAlert] = useState({ message: "", type: "" }); // nose que hace.. 1/2

  const dispatch = useDispatch();

  const [data, setData] = useState(MOCK);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);


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
        cell: ({ row: { original } }) => (
          <div className="flex jutify-center gap-2">
            <button onClick={() => console.log("edit")(original)}>
              <img src="/assets/edit.svg" alt="editar materia" />
            </button>
            <button onClick={() => console.log("delete")(original)}>
              <img src="/assets/trash.svg" alt="eliminar materia" />
            </button>
          </div>
        ),
      },
    ];
  }, []);

  const handleCreateTutor = () => {
    dispatch(setSelectedOptions([]));
    setCurrentForm({
      actionType: "crearTutor",
      title: "Crear Tutor",
      fields: tutorFields(colourOptions), //se cambia colourOptions por el const materiasOptions..... nose q hace 2/2
      onSubmit: (formData) => {
        //dispatch
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
      <div className="w-full h-full"></div>
      {/* ); */}
      <div className="flex justify-between">
        <p>{data.length} registros</p>
        <div className="">
          <button
            className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition duration-300 ease-in-out ml-4"
            onClick={handleCreateTutor}
          >
            Crear Profesor
          </button>
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
      </div>
      <SimpleTable columns={columns} data={data} />
    </div>
  );
};
