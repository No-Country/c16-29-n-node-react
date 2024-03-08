import { useEffect, useMemo, useState } from "react"
// import Button from "../../components/ui/button";
import { SimpleTable } from "../../components/SimpleTabla"
import Offcanvas from "../../components/ui/offcanvas";
import useDisclosure from "../../hooks/useDisclosure";
import Modal from "../../components/ui/modal";
// import TeacherCreateBann from "../../components/forms/teacher-create-bann";
import TeacherEditBann from "../../components/forms/teacher-edit-bann";
import ConfirmDelete from "../../components/modals/confirm-delete";
import Alert from "../../components/Alert";
import { deleteBann, editBanns, getBanns } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Banns = () => {

  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const banns = useSelector((state) => state.banns.banns);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [active, setActive] = useState({
    type: "",
    row: {}
  });
  const offcanvas = useDisclosure();
  const modal = useDisclosure();

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  useEffect(() => {
    dispatch(getBanns())
  }, [alert]);

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {}
    });
  }

  // const handleConfirmCreateItem = () => {
  //   setActive({
  //     type: "create"
  //   });
  //   offcanvas.handleOpen();
  // }

  const handleConfirmEditItem = (row) => {
    setActive({
      type: "edit",
      row
    })
    offcanvas.handleOpen();
  }

  const handleConfirmDeleteItem = (row) => {
    setActive({
      type: "delete",
      row
    })
    modal.handleOpen();
  }

  const handleEditItem = (row) => {
    const newItem = {
      reason: row.reason,
      type: row.type?.value,
      note: row.note,
    }
    dispatch(editBanns(newItem, row.id))
    showAlert("Alumno editado exitosamente", "success");
    offcanvas.handleClose();
  }

  const handleDeleteItem = ({ id }) => {
    dispatch(deleteBann(id))
    showAlert("Amonestación eliminada exitosamente", "error");
  }

  const columns = useMemo(() => {
    return [
      {
        Header: "Fecha",
        accessorKey: "date",
      },
      {
        Header: "Razón",
        accessorKey: "reason",
      },
      {
        Header: "Gravedad",
        accessorKey: "type",
      },
      {
        Header: "Alumno",
        accessorKey: "student",
        cell: ({ row: { original } }) => (
          data ? (
            <span>{original.student?.fullName}</span>
          ) : null
        ),
      },
      {
        Header: "Materia",
        accessorKey: "subject",
        cell: ({ row: { original } }) => (
          data ? (
            <span>{original.subject?.fullName}</span>
          ) : null
        ),
      },
      {
        Header: "Nota",
        accessorKey: "note"
      },
      {
        Header: "Acciones",
        id: "actions",
        cell: ({ row: { original } }) => (
          <div className="flex jutify-center gap-2">
            <button onClick={() => handleConfirmEditItem(original)}>
              <img src="/assets/edit.svg" alt="editar alumno" />
            </button>
            <button onClick={() => handleConfirmDeleteItem(original)}>
              <img src="/assets/trash.svg" alt="eliminar alumno" />
            </button>
          </div>
        ),
      },
    ];
  }, [])

  return (
    <div>
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
        data={banns}
      />
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Editar Alumno"}
      >
        {active.type === "edit" && (
          <TeacherEditBann
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleEditItem}
            initialValues={{
              id: active.row.id,
              reason: active.row.reason,
              type: active.row.type,
              note: active.row.note,
            }}
          />
        )}
      </Offcanvas>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.handleClose}
      >
        {active.type === "delete" && (
          <ConfirmDelete
            text={`${active.row.name} ${active.row.grade}° ${active.row.divition}`}
            onClose={resetState(modal.handleClose)}
            onConfirm={() => handleDeleteItem(active.row)}
          />
        )}
      </Modal>
    </div>
  )
}

export default Banns