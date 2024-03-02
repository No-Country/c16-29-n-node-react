import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTeacher, updateTeacher, fetchTeacher, deleteTeacher} from "./../../../store/slice/profesorSlice"
import  SimpleTable  from "../../../components/SimpleTabla";
import Button from "../../../components/ui/button";
import OffCanvas from "../../../components/ui/offcanvas";
import Modal from "../../../components/ui/modal";
import useDisclosure from "../../../hooks/useDisclosure";
import ConfirmDelete from "../../../components/modals/confirm-delete";
import CreateTeacherForm from "../../../components/forms/create-teacher";
import EditTeacher from "../../../components/forms/edit-teacher";
import { getSubjects } from "../../../store/slice/subjectsSlice";
import Alert from "../../../components/Alert";

const PrincipalTeachersView = () => {
  const dispatch = useDispatch();
  const teachers  = useSelector((state)=>state.teachers.teachers);
  const offcanvas= useDisclosure();
  const modal = useDisclosure(); //modal para eliminar
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [ active, setActive] = useState({
    type:"",
    row:{}
  })


  useEffect(()=>{
    dispatch(fetchTeacher());

}, [dispatch])

  const resetState = (action) => () => {
    setSelectedTeacherId(null);
    action();
    setActive({
      type: "",
      row: {}
    });
  } 
  const handleConfirmCreateTeacher = () =>{
        dispatch(getSubjects())
        setActive({
          type:"create",
        });
        offcanvas.handleOpen();
      };

  const handleCreateTeacher =  (teacherData) =>{
       dispatch(createTeacher(teacherData))
      resetState(offcanvas.handleClose)();
  }
  
  const handleConfirmEditTeacher = (row)=>{
    dispatch(getSubjects())
    setSelectedTeacherId(row.id);
    setActive({
      type: "edit",
      row,
    });
    offcanvas.handleOpen();
    console.log("Editando profesor desde el index:", row);

      };

  const handleEditTeacher = async (teacherData) =>{
    if (selectedTeacherId) {
      const res = await dispatch(updateTeacher({ id: selectedTeacherId, teacherData: teacherData })).unwrap();
      dispatch(fetchTeacher())
      setTimeout(() => {
        resetState(offcanvas.handleClose)();
      }, 100)
    } else {
      console.error("No se ha seleccionado ningún profesor para actualizar");
    }

  }
  const handleConfirmDeleteTeacher=(row)=>{
    setActive({
      type: "delete",
      row
    });
    modal.handleOpen();
  }
  const handleDeleteTeacher = async()=>{
    if (active && active.type === "delete" && active.row.id) {
      try {
        await dispatch(deleteTeacher(active.row.id)); 
        modal.handleClose(); 
      } catch (error) {
        console.error(error);
      }
  }}

  const columns = useMemo(() => {
    return [
      {
        Header: "Nombre",
        accessorKey: "name",
        id:"name"
      },
      {
        Header: "Apellido",
        accessorKey: "lastname",
        id:"lastname"
      },
      {
        Header: "Correo Electronico",
        accessorKey: "email",
        id:"email"
      },
      {
        Header: "Celular",
        accessorKey: "phone",
        id:"phone"
      },
      {
        Header: "Materias",
        accessorKey: "subjects",
        id:"subjects",
        cell: ({ row: { original } }) => (
            <span>{original.subjects?.map((subject) => subject.label)?.join(" / ") ?? ""}</span>
        ),
      },
      {
        Header: "Acciones",
        id:"actions",
        cell: ({ row }) => {
          return (
            <div className="flex justify-center gap-2">
              <button onClick={()=>handleConfirmEditTeacher(row.original)}>
                <img src="/assets/edit.svg" alt="Editar profesor" />
              </button>
              <button onClick={()=>handleConfirmDeleteTeacher(row.original)}>
                <img src="/assets/trash.svg" alt="Eliminar profesor" />
              </button>
            </div>
        );
      },
    },
    ];
  }, [teachers])
return (
    <div className="grow flex flex-col overflow-auto">
     {alert.show && (
      <Alert message={alert.message} type={alert.type} onDismiss={() => setAlert({ show: false, message: "", type: "" })} />
    )}
      <p> {teachers.length} Registros</p>
      <SimpleTable
        columns={columns} 
        data={teachers} 
        actions={<Button onClick={handleConfirmCreateTeacher}>Crear Profesor</Button>} 
      />
      <OffCanvas 
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={active.type ==="create"? "Crear Profesor" : "Editar Profesor"}
      >
          { active.type === "edit" && selectedTeacherId && (
          <EditTeacher 
          onClose={resetState(offcanvas.handleClose)} 
          onSubmit={handleEditTeacher}
          initialValues={active.row}
          />
         
          )}
          { active.type === "create" && (
          <CreateTeacherForm 
          onClose={resetState(offcanvas.handleClose)} 
          onSubmit={handleCreateTeacher} />
          )}
      </OffCanvas>
      <Modal
          isOpen={modal.isOpen}
          onClose={modal.handleClose}
      >
      {active.type === "delete" && (
        <ConfirmDelete 
          text={`${active.row.name} ${active.row.lastname}`}
          onClose={resetState(modal.handleClose)}
          onConfirm={()=>handleDeleteTeacher(active.row)}
        />
      )}   
      </Modal>
  
    </div>
  );
      }
export default PrincipalTeachersView;
