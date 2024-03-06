import {useState, useMemo } from "react"
import { SimpleTable } from "../../components/SimpleTabla";
import Offcanvas from "../../components/ui/offcanvas";
import useDisclosure from "../../hooks/useDisclosure";
import EditNonAssistances from "../../components/forms/teacher-edit-nonassistances";
import { nonAttendances, students, subjects } from "../../utils/data";

const NonAssistances = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [ active, setActive] = useState({
    type:"",
    row:{}
  })
  const resetState = (action) => () => {
    setSelectedId(null);
    action();
    setActive({
      type: "",
      row: {}
    });
  } 

  const getStudentNameById = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Desconocido';
  }

  // Encuentra el nombre de la materia por ID
  const getSubjectNameById = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Desconocida';
  }
  const handleConfirmEditNonAssistances = (row)=>{
    setSelectedId(row.id);
    setActive({
      type: "edit",
      row,
    });
    offcanvas.handleOpen();
    console.log("Editando inasistencias desde el index:", row);

      };

  const handleEditNonAssistances = async (nonassistancesData) =>{
    if (selectedId) {
      const res = await dispatch(updateNonAssistances({ id: selectedId, nonassistancesData: nonassistancesData })).unwrap();
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
      accessorFn: row => getStudentNameById(row.student_id),
      accessorKey: "student_id"
    },
    {
      Header:"Materias",
      accessorFn: row => getSubjectNameById(row.subject_id),
      accessorKey: "subject_id"
    },
    {
      Header:"Tipo de Inasistencia",
      accessorKey:"type"
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
 }, [students, subjects])
 const offcanvas= useDisclosure();
  return (
    <div>
      <SimpleTable
       columns={columns}
        data={nonAttendances}/>
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Editar Inasistencia"}
        >
        <EditNonAssistances
                  onClose={resetState(offcanvas.handleClose)}
                  onSubmit={handleEditNonAssistances}
                  initialValues={active.row}
                />
      </Offcanvas>
    
    </div>
  )
}

export default NonAssistances