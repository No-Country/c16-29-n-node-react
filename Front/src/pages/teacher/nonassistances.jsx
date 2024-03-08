import {useState, useMemo, useEffect } from "react"
import { SimpleTable } from "../../components/SimpleTabla";
import Offcanvas from "../../components/ui/offcanvas";
import useDisclosure from "../../hooks/useDisclosure";
import EditNonAttendance from "../../components/forms/teacher-edit-nonattendance";
import {useSelector, useDispatch } from "react-redux";
import { deleteNonAttendaces, fetchNonAttendances, updateNonAttendaces } from "../../store/slice/teacher-nonassistances-slice";
import Modal from "../../components/ui/modal";
import ConfirmDelete from "../../components/modals/confirm-delete";
const NonAssistances = () => {
  const modal = useDisclosure();
  const nonassistancesList = useSelector(state=> state.nonAttendances.nonAttendances);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [ active, setActive] = useState({
    type:"",
    row:{}
  })

 
  useEffect(()=>{
    dispatch(fetchNonAttendances())
  },[dispatch])

  const resetState = (action) => () => {
    setSelectedId(null);
    action();
    setActive({
      type: "",
      row: {}
    });
  } 
  const typeToLabelMapping = {
    DELAYED: 'Tardanza',
    NON_ATTENDANCE: 'Inasistencia',
  };
  const handleConfirmEditNonAssistances = (row)=>{
    setSelectedId(row.id);
    setActive({
      type: "edit",
      row,
    });
    offcanvas.handleOpen();
      };

  const handleEditNonAttendances = async (updateNonassistancesData) =>{
    if (selectedId) {
        try{
            await dispatch(updateNonAttendaces({ id: selectedId, nonAttendancesData:updateNonassistancesData })).unwrap();
             dispatch(fetchNonAttendances())
          } catch(error) {
      console.error("Error al actualizar la inasistencia", error);
         }
          finally{
            setTimeout(() => {
              resetState(offcanvas.handleClose)();
            }, 100)
          }
  }else{
    console.error("No se ha seleccionado ningún tipo de inasistencia");
  }}

  const handleConfirmDeleteNonAttendances=(row)=>{
    setActive({
      type: "delete",
      row
    });
    modal.handleOpen();
  }
  const handleDeleteNonAttendances = async()=>{
    if (active && active.type === "delete" && active.row.id) {
      try {
        await dispatch(deleteNonAttendaces(active.row.id)); 
        modal.handleClose(); 
      } catch (error) {
        console.error(error);
      }
  }}
 const columns = useMemo(()=>{
  return [
    {
      Header: "Fecha",
      accessorKey: "date",
    },
    {
      Header: "Alumno",
      accessorKey: "students",
      accessorFn: (row)=>row.student?.fullName
    },
    {
      Header:"Materia",
      accessorKey: "subject_id",
      accessorFn: (row)=>row.subject?.fullName
    },
    {
      Header:"Tipo de Inasistencia",
      accessorKey:"type",
      accessorFn: (row) => typeToLabelMapping[row.type] || row.type,
    },
    {
      Header: "Observación",
      accessorKey: "note",
    },
    {
      Header: "Acciones",
      id: "actions",
      cell: ({ row: { original } }) => (
        <div className="flex jutify-center gap-2">
          <button onClick={() => handleConfirmEditNonAssistances(original)}>
            <img src="/assets/edit.svg" alt="editar inasitencia" />
          </button>
          <button onClick={() => handleConfirmDeleteNonAttendances(original)}>
            <img src="/assets/trash.svg" alt="eliminar inasistencia" />
          </button>
        </div>
      ),
    },
 ]
 }, [nonassistancesList])
 const offcanvas= useDisclosure();
  return (
    <div>
      <SimpleTable
       columns={columns}
        data={nonassistancesList}/>
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Editar asistencia"}
        >
        <EditNonAttendance
                  onClose={resetState(offcanvas.handleClose)}
                  onSubmit={handleEditNonAttendances}
                  initialValues={active.row}
                />
      </Offcanvas>
      <Modal
          isOpen={modal.isOpen}
          onClose={modal.handleClose}
      >
      {active.type === "delete" && (
        <ConfirmDelete 
          text={`${active.row.student.fullName}`}
          onClose={resetState(modal.handleClose)}
          onConfirm={()=>handleDeleteNonAttendances(active.row)}
        />
      )}   
      </Modal>
    </div>
  )
}

export default NonAssistances