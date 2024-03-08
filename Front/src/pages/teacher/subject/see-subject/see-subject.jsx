import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleTable } from "../../../../components/SimpleTabla";
import Button from '../../../../components/ui/button';
import Offcanvas from '../../../../components/ui/offcanvas';
import useDisclosure from '../../../../hooks/useDisclosure';
import Checkbox from '../../../../components/ui/checkbox';
import TeacherCreateNote from '../../../../components/forms/teacher-create-note';
import TeacherCreateBann from '../../../../components/forms/teacher-create-bann';
import TeacherCreateMark from '../../../../components/forms/teacher-create-mark';
import TeacherCreateNonAttendance from '../../../../components/forms/teacher-create-nonattendance';
import TeacherCreateExam from '../../../../components/forms/teacher-create-exam';
import { useSelector, useDispatch } from "react-redux";
import { createExam, fetchSubjectByFullname } from "../../../../store/slice/teacher-subject-slice";

const SubjectView = () => {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.teacherSubject.subject);
  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const { id } = useParams();
  const { handleClose, handleOpen, isOpen } = useDisclosure();
  const [selecteds, setSelecteds] = useState({});
  const hasSelecteds = Object.keys(selecteds).length === 0;

  useEffect(() => {
    const [name, grade, divition] = id.split("_");
    dispatch(createExam())
    dispatch(fetchSubjectByFullname({
      name,
      grade: grade[0],
      divition
    }))
  }, [dispatch]);

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {}
    });
  }

  const handleConfirmRegisterNote = (row) => {
    setActive(
      {
        type: "Registrar Anotacion",
        row
      }
    );
    handleOpen();
  }
  const handleConfirmRegisterBann = (row) => {
    setActive(
      {
        type: "Registrar Amonestacion",
        row
      }
    );
    handleOpen();
  }
  const handleConfirmRegisterMark = (row) => {
    setActive(
      {
        type: "Registrar Calificacion",
        row
      }
    );
    handleOpen();
  }
  const handleConfirmRegisterNonAttendance = () => {
    setActive({
      type: "Registrar Inasistencias",
      row: {}
    });
    handleOpen();
  }
  const handleConfirmRegisterExam = () => {
    setActive({
      type: "Registrar Evaluacion",
      row: {}
    });
    handleOpen();
  }

  const handleCreateExam = (row) => {
    console.log(row);
    dispatch(createExam(row))
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
        accessorKey: "fullName"
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex jutify-center gap-2">
            <button onClick={() => handleConfirmRegisterBann(original)} title='Registrar Amonestacion'>
              <img src="/assets/bann-action.svg" alt="Registrar Amonestacion" />
            </button>
            <button onClick={() => handleConfirmRegisterMark(original)} title='Registrar Evaluacion'>
              <img src="/assets/exam-action.svg" alt="Registrar Evaluacion" />
            </button>
            <button onClick={() => handleConfirmRegisterNote(original)} title='Registrar Nota'>
              <img src="/assets/note-action.svg" alt="Registrar Nota" />
            </button>
          </div>
        ),
      },
    ];
  }, [])

  console.log(subject)

  return (
    <div
      className='grow flex flex-col overflow-y-auto'
    >
      <SimpleTable 
        columns={columns}
        data={subject?.students ?? []}
        filters={(
          <button 
            className={`flex gap-1 items-center ${!hasSelecteds ? "" : "text-gray-500"}`}
            onClick={handleConfirmRegisterNonAttendance}
            disabled={hasSelecteds}
          >
            <img className='inline-block w-4 h-4' src="/assets/non-attendance-action.svg" />
            Inasistencia
          </button>
        )}
        actions={<Button onClick={handleConfirmRegisterExam}>Crear Evaluacion</Button>}
        onSelect={setSelecteds}
      />
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
            onSubmit={handleCreateExam}
            onClose={resetState(handleClose)}
          />
        )}
      </Offcanvas>
    </div>
  )
}

export default SubjectView