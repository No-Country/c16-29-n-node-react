import { useMemo, useState } from "react";
import { SimpleTable } from "../../../components/SimpleTabla"
import MOCK from "./mock";



export const DirectivoTutor = () => {
  
    
    const [data, setData] = useState(MOCK);
    
    const columns = useMemo(() => {        
        
        return [ 
          {
            Header: 'Nombre completo',
            id: 'id',
            accessorFn: (row) => {              
              return `${row.firstName} ${row.lastName}`
            },
          },   
          {
            Header: 'Alumnos Asociados',
            id: 'students.id',
            accessorFn: (row) => (row.students.map((estudiante) => estudiante.name))
         }, 
         {
            Header: 'Estado',
            accessorKey: 'estate'
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
         }
        ];
      }, [])

    return(
        <div className="grow overflow-auto">
        <SimpleTable columns={columns} data={data} />
      </div>
    )
}