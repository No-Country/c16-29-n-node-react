import { useMemo } from "react"
import { SimpleTable } from "../../components/SimpleTabla";
import Offcanvas from "../../components/ui/offcanvas";
const NonAssistances = () => {
 const columns = useMemo(()=>{
  return [
    {
      Header: "Fecha",
      accessorKey: "date",
    },
    {
      Header: "Alumno",
      accessorKey: "student",
    },
    {
      Header:"Materias",
      accessorKey: "subjects"
    },
    {
      Header:"Tipo de Inasistencia",
      accessorKey:"typeOnAssistances"
    },
    {
      Header: "Observación",
      accessorKey: "observation",
    },
    {
      Header: "Acciones",
      id: "actions",
      cell: ({ row: { original } }) => (
        <div className="flex jutify-center gap-2">
          <button onClick={() => handleConfirmEditNonAssistances(original)}>
            <img src="/assets/edit.svg" alt="editar inasitencia" />
          </button>
          <button onClick={() => handleConfirmDeleteNonAssistances(original)}>
            <img src="/assets/trash.svg" alt="eliminar inasistencia" />
          </button>
        </div>
      ),
    },
 ]
 }, [])
 
  return (
    <div>NonAssistances
      <SimpleTable
       columns={columns}
        data={data}/>
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Editar Inasistencia"}
        >
        <EditStudent
                  onClose={resetState(offcanvas.handleClose)}
                  onSubmit={handleEditNonAssistances}
                  initialValues={active.row}
                />
      </Offcanvas>
    
    </div>
  )
}

export default NonAssistances