import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import MOCK from "../../../principal/subjects/mock"
import { SimpleTable } from "../../../../components/SimpleTabla";
import usePromise from "../../../../hooks/usePromise";
import Button from '../../../../components/ui/button';
import Offcanvas from '../../../../components/ui/offcanvas';
import useDisclosure from '../../../../hooks/useDisclosure';
import Checkbox from '../../../../components/ui/checkbox';
import TeacherCreateNote from '../../../../components/forms/teacher-create-note';
import TeacherCreateBann from '../../../../components/forms/teacher-create-bann';
import TeacherCreateMark from '../../../../components/forms/teacher-create-mark';
import TeacherCreateNonAttendance from '../../../../components/forms/teacher-create-nonattendance';
import TeacherCreateExam from '../../../../components/forms/teacher-create-exam';

const SubjectView = () => {
  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const { id } = useParams();
  const [promiseResult, isLoading, isError] = usePromise(() => {
    const [subject, grade, divition] = id.split("_");
    const parsedGrade = parseInt(grade.charAt(0))
    const foundedSubject = MOCK.find((current) => 
      current.name === subject && current.grade === parsedGrade && current.divition === divition
    );
    if(!foundedSubject){
      throw new Error("No encontrado");
    } 

    return foundedSubject.students;
  })
  const [data, setData] = useState();
  const { handleClose, handleOpen, isOpen } = useDisclosure();
  const [selecteds, setSelecteds] = useState({});
  const hasSelecteds = Object.keys(selecteds).length === 0;

  useEffect(() => {
    setData(promiseResult);
  }, [promiseResult]);

  const resetState = (action) => () => {
    action();
    setTimeout(() => {
      setActive({
        type: "",
        row: {}
      });
    }, 400)
  }

  const handleRegisterNote = (row) => {
    setActive(
      {
        type: "Registrar Anotacion",
        row
      }
    );
    handleOpen();
  }
  const handleRegisterBann = (row) => {
    setActive(
      {
        type: "Registrar Amonestacion",
        row
      }
    );
    handleOpen();
  }
  const handleRegisterMark = (row) => {
    setActive(
      {
        type: "Registrar Calificacion",
        row
      }
    );
    handleOpen();
  }
  const handleRegisterNonAttendance = () => {
    setActive({
      type: "Registrar Inasistencias",
      row: {}
    });
    handleOpen();
  }
  const handleRegisterExam = () => {
    setActive({
      type: "Registrar Evaluacion",
      row: {}
    });
    handleOpen();
  }

  const columns = useMemo(() => {
    return [
      {
        id: "cell-selected",
        Header: ({ table }) => (
          <Checkbox 
            className='align-middle'
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox 
            className='align-middle'
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false
      },
      {
        Header: "Alumno",
        accessorKey: "name"
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex jutify-center gap-2">
            <button onClick={() => handleRegisterBann(original)} title='Registrar Amonestacion'>
              <img src="/assets/bann-action.svg" alt="Registrar Amonestacion" />
            </button>
            <button onClick={() => handleRegisterMark(original)} title='Registrar Evaluacion'>
              <img src="/assets/exam-action.svg" alt="Registrar Evaluacion" />
            </button>
            <button onClick={() => handleRegisterNote(original)} title='Registrar Nota'>
              <img src="/assets/note-action.svg" alt="Registrar Nota" />
            </button>
          </div>
        ),
      },
    ];
  }, [])

  return (
    <div
      className='grow flex flex-col overflow-y-auto'
    >
      {
        isError && <p>Hubo un error buscando la materia...</p> 
      }
      {
        !isError && !isLoading && (
          <SimpleTable 
            columns={columns}
            data={data ?? []}
            filters={(
              <button 
                className={`flex gap-1 items-center ${!hasSelecteds ? "" : "text-gray-500"}`}
                onClick={handleRegisterNonAttendance}
                disabled={hasSelecteds}
              >
                <img className='inline-block w-4 h-4' src="/assets/non-attendance-action.svg" />
                Inasistencia
              </button>
            )}
            actions={<Button onClick={handleRegisterExam}>Crear Evaluacion</Button>}
            onSelect={setSelecteds}
          />
        )
      }
      <Offcanvas
        isOpen={isOpen}
        onClose={resetState(handleClose)}
        title={active.type}
      >
        { active.type === "Registrar Anotacion" && (
          <TeacherCreateNote 
            onSubmit={() => 1}
            onClose={resetState(handleClose)}
          />
        )}
        { active.type === "Registrar Amonestacion" && (
          <TeacherCreateBann 
            onSubmit={() => 1}
            onClose={resetState(handleClose)}
          />
        )}
        { active.type === "Registrar Calificacion" && (
          <TeacherCreateMark 
            onSubmit={() => 1}
            onClose={resetState(handleClose)}
          />
        )}
        { active.type === "Registrar Inasistencias" && (
          <TeacherCreateNonAttendance 
            onSubmit={() => 1}
            onClose={resetState(handleClose)}
          />
        )}
        { active.type === "Registrar Evaluacion" && (
          <TeacherCreateExam 
            onSubmit={() => 1}
            onClose={resetState(handleClose)}
          />
        )}
      </Offcanvas>
    </div>
  )
}

export default SubjectView