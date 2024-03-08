import { useEffect, useMemo, useState } from "react";
import { SimpleTable } from "../../components/SimpleTabla";
import Alert from "../../components/Alert";
import MOCK from "./examsMock/mock";
import { useDispatch, useSelector } from "react-redux";
import { createMark, editMark, getExams, getMarksByExamId } from "../../actions/actions";
import { parseValues } from "../../utils/validation";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Button from "../../components/ui/button";

const Exams = () => {
  // Estados

  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.exams);
  // const marks = useSelector((state) => state.marks.marks);
  const [data, setData] = useState(MOCK);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [isScorePopupOpen, setIsScorePopupOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [active, setActive] = useState({});
  const [marks, setMarks] = useState([]);
  const [mark, setMark] = useState({});
  const [editPopupOpen, setEditPopupOpen] = useState(false);

  useEffect(() => {
    (async () => {
      let counter = 9999;
      if (active.id) {
        const data = await getMarksByExamId(active.id);
        const marks = active.subject.students.map((student) => {
          const mark = data.find(
            (current) => current.student_id === student.id
          );
          return {
            id: mark?.id ?? --counter,
            fullName: student.fullName,
            score: mark?.score,
            note: mark?.note,
            student_id: student.id
          };
        });
        setMarks(marks);
      }
    })();
  }, [active]);

  useEffect(() => {
    dispatch(getExams());
  }, [alert]);

  // useEffect(() => {
  //   console.log(active);
  // }, [active]);

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // Funciones

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setActive({});
    setMarks([]);
  };

  const handleActionClick = (action, row) => {
    setActive(row);
    setIsPopupOpen(true);
  };

  const handleEditButtonClick = (student) => {
    setMark(student);
    setEditPopupOpen(true);
  };

  const handleEditItem = (item) => {
    if(item.score){
      createMark({
        ...item,
        student_id: mark.student_id,
        exam_id: active.id
      })
      .then(() => {
        setActive({
          ...active
        });
        setAlert({
          message: "Se editó la amonestacion correctamente",
          type: "success",
        });
      })
      .catch(() => {
        setAlert({
          message: "No se pudo editar la amonestacion",
          type: "error",
        });
      })
      .finally(() => {
        setMark({});
        handleCloseEditPopup();
      });

    } else {
      editMark(item, mark.id)
        .then(() => {
          setActive({
            ...active
          });
          setAlert({
            message: "Se editó la amonestacion correctamente",
            type: "success",
          });
        })
        .catch(() => {
          setAlert({
            message: "No se pudo editar la amonestacion",
            type: "error",
          });
        })
        .finally(() => {
          setMark({});
          handleCloseEditPopup();
        });
    }
  };

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
  };

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // Columnas

  const columns = useMemo(() => {
    return [
      {
        Header: "Fecha",
        accessorKey: "date",
      },
      {
        Header: "Materia",
        accessorKey: "subject",
        cell: ({ row: { original } }) =>
          data ? <span>{original.subject?.name}</span> : null,
      },
      {
        Header: "Titulo",
        accessorKey: "title",
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex justify-end gap-2">
            <button onClick={() => handleActionClick("view", original)}>
              <img src={"/assets/eye.svg"} alt="ver alumno" />
            </button>
          </div>
        ),
      },
    ];
  }, []);

  const columnsStudent = useMemo(() => {
    return [
      {
        Header: "Alumno",
        accessorKey: "fullName",
      },
      {
        Header: "Puntaje",
        accessorKey: "score",
      },
      {
        Header: "Observaciones",
        accessorKey: "note",
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex justify-end gap-2">
            <button onClick={() => handleEditButtonClick(original)}>
              <img src={"/assets/edit-action.svg"} alt="editar alumno" />
            </button>
          </div>
        ),
      },
    ];
  }, [marks]);

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  return (
    <div>
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
      {!isPopupOpen && <SimpleTable columns={columns} data={exams} />}
      {isPopupOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className="relative bg-white rounded-lg shadow-lg p-6">
            <button
              className="absolute top-0 right-0 p-2"
              onClick={handlePopupClose}
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {active && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{active.subject.name}</h3>
              </div>
            )}
            <SimpleTable columns={columnsStudent} data={marks} />
          </div>
        </div>
      )}
      {editPopupOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-75 rounded-md">
          <div className="relative max-w-[40vw] bg-white rounded-lg shadow-lg">
            <div className="flex justify-center items-center bg-[#1490FC] w-full h-24 rounded-t-md">
              <h2 className="px-4 text-[#FFFFFF] text-lg font-semibold">
                Asigne un puntaje para {mark.fullName} en {active.title}
              </h2>
            </div>
            <EditScoreForm 
              handleEdit={handleEditItem} 
              initialValues={mark} 
              onClose={handleCloseEditPopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;

const EditScoreForm = ({ handleEdit, onClose, initialValues }) => {
  const parsed = parseValues(initialValues);
  const [score, setScore] = useState(parsed.score);
  const [note, setNote] = useState(parsed.note);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(score, note)
    if (initialValues.score) {
      handleEdit(parseValues({note}));
    } else {
      handleEdit(parseValues({
        note,
        score
      }));
    }
  };

  return (
    <form className="flex-column p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-start">
        <Label className="font-medium" htmlFor="score">
          Puntaje
        </Label>
        <Input
          disabled={Boolean(initialValues.score)}
          min={1}
          max={10}
          type="number"
          id="score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-6">
        <Label className="font-medium" htmlFor="note">
          Observación
        </Label>
        <Input
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="flex h-10 gap-4 justify-start items-center mt-8">
        <Button
          type="submit"
        >
          Confirmar
        </Button>
        <Button
          onClick={onClose}
          variant={"purple-outlined"}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
