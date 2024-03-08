import { useEffect, useMemo, useState } from "react";
import { SimpleTable } from "../../components/SimpleTabla";
import Alert from "../../components/Alert";
import MOCK from "./examsMock/mock";
import { useDispatch, useSelector } from "react-redux";
import { getExams } from "../../actions/actions";

const Exams = () => {

  // Estados

  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.exams);
  // const marks = useSelector((state) => state.marks.marks);
  const [data, setData] = useState(MOCK);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [isScorePopupOpen, setIsScorePopupOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState()
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const [editPopupOpen, setEditPopupOpen] = useState(false);

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  useEffect(() => {
    dispatch(getExams())
  }, [alert]);

  // useEffect(() => {
  //   console.log(active);
  // }, [active]);

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // Funciones

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setActive(null);
  };

  const handleActionClick = (action, row) => {
    setActive(row);
    setIsPopupOpen(true);
  };

  const handleEditButtonClick = (studentId) => {
    handleEditScore(studentId);
  };

  console.log(exams);

  const handleEditScore = (studentId) => {
    const student = exams.flatMap(exam => exam.subject?.users).find(student => student && student.id === studentId);
    if (student) {
      setEditPopupOpen(true);
      setActiveStudent(student);
    } else {
      console.error("El estudiante no fue encontrado");
    }
  };

  const handleEditItem = (editedData) => {
    setData(prevData => {
      return prevData.map(exam => {
        const updatedStudents = exam.subject.students.map(student => {
          if (student.name === editedData.name) {
            return {
              ...student,
              score: editedData.score,
              notes: editedData.notes
            };
          }
          return student;
        });
        return {
          ...exam,
          subject: {
            ...exam.subject,
            students: updatedStudents
          }
        };
      });
    });
    setEditPopupOpen(false);
    setIsPopupOpen(false);
    showAlert("Calificación editada exitosamente", "success");
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
        cell: ({ row: { original } }) => (
          data ? (
            <span>{original.subject?.name}</span>
          ) : null
        ),
      },
      {
        Header: "Titulo",
        accessorKey: "title"
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
        accessorKey: "notes"
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex justify-end gap-2">
            <button onClick={() => handleEditButtonClick(original.id)}>
              <img src={"/assets/edit-action.svg"} alt="editar alumno" />
            </button>
          </div>
        ),
      },
    ];
  }, [exams]);

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  const EditScoreForm = ({ student, handleEdit }) => {
    const [score, setScore] = useState(student ? student.score : '');
    const [notes, setNotes] = useState(student ? student.notes : '');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (student) {
        handleEdit({ name: student.name, score, notes });
      }
    };

    return (
      <form className="flex-column h-3/4 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col h-16 justify-start">
          <label className="font-medium" htmlFor="score">Puntaje</label>
          <input className="bg-[#F4F4F4] h-3/4 border border-[#98AEBC] mt-1 rounded-md" type="number" id="score" onChange={(e) => setScore(e.target.value)} />
        </div>
        <div className="flex flex-col h-16 my-6">
          <label className="font-medium" htmlFor="notes">Observación</label>
          <input className="bg-[#F4F4F4] h-3/4 border border-[#98AEBC] mt-1 rounded-md" id="notes" onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="flex h-10 gap-4 justify-start items-center mt-8">
          <button className="bg-[#9312FF] w-28 text-white p-2 rounded-md" type="submit">Confirmar</button>
          <button className="bg-[#FFFFFF] border border-[#98AEBC] w-28 text-black p-2 rounded-md" onClick={handleCloseEditPopup}>Cancelar</button>
        </div>
      </form>
    );
  };

  return (
    <div>
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onDismiss={() => setAlert({ message: "", type: "" })}
        />
      )}
      {!isPopupOpen && (
        <SimpleTable
          columns={columns}
          data={exams}
          handleActionClick={handleActionClick}
        />
      )}
      {isPopupOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className="relative h-2/4 w-3/4 md:w-1/2 lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
            <button className="absolute top-0 right-0 p-2" onClick={handlePopupClose}>
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {active && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{active.subject.name}</h3>
              </div>
            )}
            {active.subject.users.length !== 0 && <SimpleTable
              columns={columnsStudent}
              data={active.subject.users}
            />}
          </div>
        </div>
      )}
      {editPopupOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-75 rounded-md">
          <div className="relative w-1/3 h-96 bg-white rounded-lg shadow-lg">
            <div className="flex justify-center items-center bg-[#1490FC] w-full h-24 rounded-t-md">
              <h2 className="text-center text-[#FFFFFF] text-lg font-semibold">Asigne un puntaje para {activeStudent.name} en {active.name}</h2>
            </div>
            <EditScoreForm student={activeStudent} handleEdit={handleEditItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;