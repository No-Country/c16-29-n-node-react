import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleTable } from "../../../../components/SimpleTabla";
import Button from '../../../../components/ui/button';
import Offcanvas from '../../../../components/ui/offcanvas';
import useDisclosure from '../../../../hooks/useDisclosure';
import AssignStudents from "../../../../components/forms/assign-students";
import { useSelector, useDispatch } from "react-redux";
import { assignStudents, deassignStudent, fetchSubjectByFullname, hideAlert, resetStates } from '../../../../store/slice/principal-subject-slice';
import Alert from '../../../../components/Alert';

const SubjectView = () => {
  const { id } = useParams();
  const [ alert, setAlert ] = useState({
    message: "",
    type: ""
  });
  const dispatch = useDispatch()
  const stateFetching = useSelector((state) => state.principalSubject.stateFetching);
  const stateUpdating = useSelector((state) => state.principalSubject.stateUpdating);
  const stateDeleting = useSelector((state) => state.principalSubject.stateDeleting);
  const alertMessage = useSelector((state) => state.principalSubject.alertMessage);
  const alertType = useSelector((state) => state.principalSubject.alertType);
  const subject = useSelector((state) => state.principalSubject.subject);

  useEffect(() => {
    if (
      !stateFetching.isLoading &&
      !stateUpdating.isLoading &&
      !stateDeleting.isLoading
    ) {
      const [subject, grade, divition] = id.split("_");
      const status = [stateFetching, stateUpdating, stateDeleting];
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
        handleClose();
      }
      dispatch(fetchSubjectByFullname({
        name: subject,
        grade: grade[0],
        divition
      }));
      dispatch(hideAlert());
    }
  }, [dispatch, stateFetching, stateUpdating, stateDeleting]);
  const { handleClose, handleOpen, isOpen } = useDisclosure();


  const handleDeleteStudent = (id) => {
    dispatch(deassignStudent({
      subject: subject.id,
      user: id
    }))
  }

  const handleAssignStudent = (selected) => {
    dispatch(assignStudents({
      id: subject.id,
      data: selected.map((option) => option.value)
    }))
  }

  const columns = useMemo(() => {
    return [
      {
        Header: "Alumno",
        accessorKey: "first_name"
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex jutify-center gap-2">
            <button onClick={() => handleDeleteStudent(original.id)}>
              <img src="/assets/trash.svg" alt="eliminar materia" />
            </button>
          </div>
        ),
      },
    ];
  }, [])

  return (
    <div
      className='grow overflow-y-auto'
    >
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
      <SimpleTable 
        columns={columns}
        data={subject?.students ?? []}
        actions={<Button onClick={handleOpen}>Asignar Alumnos</Button>}
      />
      <Offcanvas
        isOpen={isOpen}
        onClose={handleClose}
        title={"Asignar Alumnos"}
      >
        <AssignStudents
          key={Math.random()}
          onClose={handleClose} 
          assigneds={[]}
          onSubmit={handleAssignStudent}
        />
      </Offcanvas>
    </div>
  )
}

export default SubjectView