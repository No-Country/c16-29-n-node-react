import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MOCK from "../mock"
import { SimpleTable } from "../../../../components/SimpleTabla";
import usePromise from "../../../../hooks/usePromise";

const SubjectView = () => {
  const { id } = useParams();
  const [data, isLoading, isError] = usePromise(() => {
    const [subject, grade, divition] = id.split(" ");
    const parsedGrade = parseInt(grade.charAt(0))
    const foundedSubject = MOCK.find((current) => 
      current.name === subject && current.grade === parsedGrade && current.divition === divition
    );
    if(!foundedSubject){
      throw new Error("No encontrado");
    } 

    return foundedSubject.students;
  })

  console.log(data, isLoading, isError);

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
            <button >
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
        !isError && !isLoading && (<SimpleTable 
        columns={columns}
        data={data ?? []}
      />)
      }
    </div>
  )
}

export default SubjectView