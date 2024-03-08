import { useMemo, useState, useEffect } from "react";
import SimpleTable from "../../components/SimpleTabla"
import Offcanvas from "../../components/ui/offcanvas";
import EditNotes from "../../components/forms/teacher-edit-notes"
import useDisclosure from "../../hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, editNote, fetchNotes, hideAlert, resetStates } from "../../store/slice/teacher-notes-slice";
import Modal from "../../components/ui/modal";
import ConfirmDelete from "../../components/modals/confirm-delete";
import Alert from "../../components/Alert";
import { formatDate } from "../../utils/dates";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.teacherNotes.notes);
  const state = useSelector((state) => state.teacherNotes.state);
  const alertType = useSelector((state) => state.teacherNotes.alertType);
  const alertMessage = useSelector((state) => state.teacherNotes.alertMessage);
  const [ active, setActive] = useState({
    type:"",
    row:{}
  })
  const offcanvas = useDisclosure();
  const modal = useDisclosure();
  const [alert, setAlert] = useState({
    message: "",
    type: ""
  });

  useEffect(() => {
    if (
      !state.isLoading
    ) {
      const status = [state];
      if (status.some(({ status }) => status === "rejected")) {
        setAlert({
          message: alertMessage,
          type: alertType,
        });
        dispatch(resetStates());
      } else if (status.some(({ status }) => status === "completed")) {
        setAlert({
          message: alertMessage,
          type: alertType,
        });
        dispatch(resetStates());
        resetState();
        modal.handleClose();
        offcanvas.handleClose();
      }
      dispatch(fetchNotes());
      dispatch(hideAlert());
    }
  }, [dispatch, state]);

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {}
    });
  } 

  // const handleEditNonAssistances = async (notaData) =>{
  //   if (selectedId) {
  //     const res = await dispatch(updateNonAssistances({ id: selectedId, notaData: notaData })).unwrap();
  //     dispatch(getNonAssistances())
  //     setTimeout(() => {
  //       resetState(offcanvas.handleClose)();
  //     }, 100)
  //   } else {
  //     console.error("No se ha seleccionado ningún tipo de anotacion");
  //   }
  // }

  const handleConfirmEditNotes = (row) => {
    setActive({
      type: "Editar Nota",
      row
    })
    offcanvas.handleOpen();
  }

  const handleConfirmDeleteNotes = (row) => {
    setActive({
      type: "Eliminar Nota",
      row
    })
    modal.handleOpen();
  }

  const handleEditNote = (row) => {
    dispatch(editNote({
      id: active.row.id,
      data: {
        ...row,
        is_public: row.is_public.value
      }
    }))
  }

  const handleDeleteNote = ({ id }) => {
    dispatch(deleteNote(id))
  }

  const columns = useMemo(()=>{
    return [
      {
        id: "date",
        Header: "Fecha",
        accessorFn: (row) => formatDate(new Date(row.date)),
      },
      {
        id: "student",
        Header: "Alumno",
        accessorFn: row => `${row.student.first_name} ${row.student.last_name}`,
      },
      {
        id: "subject",
        Header:"Materias",
        accessorFn: row => `${row.subject.name} ${row.subject.grade} ${row.subject.divition}`,
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
            <button onClick={() => handleConfirmEditNotes(original)}>
              <img src="/assets/edit.svg" alt="editar inasitencia" />
            </button>
            <button onClick={() => handleConfirmDeleteNotes(original)}>
              <img src="/assets/trash.svg" alt="eliminar inasistencia" />
            </button>
          </div>
        ),
      },
   ]
   }, [])

  return (
    <div className="grow flex flex-col overflow-y-auto">
    <SimpleTable
     columns={columns}
      data={notes}/>
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
    <Offcanvas
      isOpen={offcanvas.isOpen}
      onClose={resetState(offcanvas.handleClose)}
      title={"Editar Nota"}
      >
      <EditNotes
        onClose={resetState(offcanvas.handleClose)}
        onSubmit={handleEditNote}
        initialValues={{
          is_public: {
            value: Boolean(active.row.isPublic),
            label: active.row.isPublic ? "Si" : "No"
          },
          note: active.row.note
        }}
      />
    </Offcanvas>
    <Modal
      isOpen={modal.isOpen}
      onClose={resetState(modal.handleClose)}
    >
      <ConfirmDelete
        onClose={resetState(modal.handleClose)}
        text={"una nota"}
        onConfirm={() => handleDeleteNote(active.row)}
      />
    </Modal>
  </div>
  )
}

export default Notes