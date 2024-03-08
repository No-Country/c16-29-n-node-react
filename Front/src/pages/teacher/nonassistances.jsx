import {useState, useMemo, useEffect } from "react"
import { SimpleTable } from "../../components/SimpleTabla";
import Offcanvas from "../../components/ui/offcanvas";
import useDisclosure from "../../hooks/useDisclosure";
import EditNonAttendance from "../../components/forms/teacher-edit-nonattendance";
import {useSelector, useDispatch } from "react-redux";
import { fetchNonAttendances } from "../../store/slice/teacher-nonassistances-slice";
const NonAssistances = () => {
  const nonassistancesList = useSelector(state=> state.nonAttendances.nonAttendances);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [ active, setActive] = useState({
    type:"",
    row:{}
  })

 
  useEffect(()=>{
    dispatch(fetchNonAttendances())
    console.log(nonassistancesList, "fetchnonattendances")
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
    DELAY: 'Tardanza',
    NON_ATTENDANCE: 'Inasistencia',
  };
  const handleConfirmEditNonAssistances = (row)=>{
    setSelectedId(row.id);
    setActive({
      type: "edit",
      row,
    });
    offcanvas.handleOpen();
    console.log("Editando inasistencias desde el index:", row);

      };

  const handleEditNonAssistances = async (updateNonassistancesData) =>{
    if (selectedId) {
      const res = await dispatch(updateNonAssistances({ id: selectedId, nonassistancesData:updateNonassistancesData })).unwrap();
      dispatch(getNonAssistances())
      setTimeout(() => {
        resetState(offcanvas.handleClose)();
      }, 100)
    } else {
      console.error("No se ha seleccionado ningún tipo de inasistencia");
    }

  }
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
      Header:"Materias",
      accessorKey: "subject_id",
      accessorFn: (row)=>row.subject?.fullName
    },
    {
      Header:"Tipo de Inasistencia",
      accessorKey:"type",
      Cell: ({ value }) => typeToLabelMapping[value] || value, 
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
          <button onClick={() => handleConfirmDeleteNonAssistances(original)}>
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
        title={"Editar Inasistencia"}
        >
        <EditNonAttendance
                  onClose={resetState(offcanvas.handleClose)}
                  onSubmit={handleEditNonAssistances}
                  initialValues={active.row}
                />
      </Offcanvas>
    
    </div>
  )
}

export default NonAssistances