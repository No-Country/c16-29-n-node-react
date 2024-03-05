import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import MOCK from "../mock"
import { SimpleTable } from "../../../../components/SimpleTabla";
import usePromise from "../../../../hooks/usePromise";
import Button from '../../../../components/ui/button';
import Offcanvas from '../../../../components/ui/offcanvas';
import useDisclosure from '../../../../hooks/useDisclosure';
import AssignStudents from "../../../../components/forms/assign-students";

const SubjectView = () => {
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

  useEffect(() => {
    setData(promiseResult);
  }, [promiseResult]);

  const handleDeleteStudent = (id) => {
    setData((data) => data.filter((student) => student.id !== id));
  }

  const handleAssignStudent = (selected) => {
    setData((data) => data.concat(selected.map((student) => ({
      id: student.value,
      name: student.label
    }))));
  }

  const columns = useMemo(() => {
    return [
      {
        Header: "Alumno",
        accessorKey: "name"
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
      {
        isError && <p>Hubo un error buscando la materia...</p> 
      }
      {
        !isError && !isLoading && (
          <SimpleTable 
            columns={columns}
            data={data ?? []}
            actions={<Button onClick={handleOpen}>Asignar Alumnos</Button>}
          />
        )
      }
      <Offcanvas
        isOpen={isOpen}
        onClose={handleClose}
        title={"Asignar Alumnos"}
      >
        <AssignStudents
          key={Math.random()}
          onClose={handleClose} 
          assigneds={data ?? []}
          onSubmit={handleAssignStudent}
        />
      </Offcanvas>
    </div>
  )
}

export default SubjectView