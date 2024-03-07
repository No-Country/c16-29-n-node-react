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

const Banns = () => {

  const [data, setData] = useState([])
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

  // const handleCreateItem = (row) => {
  //   setData((prevData) => {
  //     const newId = Math.max(...prevData.map(item => item.id), 0) + 1;
  //     const newItem = {
  //       id: newId,
  //       date: row.date,
  //       reason: row.reason,
  //       gravity: row.gravity,
  //       student: row.student,
  //       subject: row.subject,
  //       note: row.note,
  //     }
  //     return [...prevData, newItem];
  //   });
  //   showAlert("Amonestación creada exitosamente", "success");
  //   offcanvas.handleClose();
  // }


  const handleEditItem = (row) => {
    setData((data) =>
      data.map((bann) =>
        bann.id === active.row.id ? {
          ...bann,
          date: row.date,
          reason: row.reason,
          gravity: row.gravity,
          student: row.student,
          subject: row.subject,
          note: row.note,
        } : bann
      )
    );
    showAlert("Amonestación editada exitosamente", "success");
    offcanvas.handleClose();
  };

  const handleDeleteItem = ({ id }) => {
    setData((data) => data.filter((bann) => bann.id !== id))
    showAlert("Amonestación eliminada exitosamente", "error")
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
        accessorKey: "gravity",
        cell: ({ row: { original } }) => (
          data ? (
            <span>{original.gravity?.value}</span>
          ) : null
        ),
      },
      {
        Header: "Alumno",
        accessorKey: "student",
        cell: ({ row: { original } }) => (
          data ? (
            <span>{original.student?.value}</span>
          ) : null
        ),
      },
      {
        Header: "Materia",
        accessorKey: "subject",
        cell: ({ row: { original } }) => (
          data ? (
            <span>{original.subject?.value}</span>
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
        <Alert
          message={alert.message}
          type={alert.type}
          onDismiss={() => setAlert({ message: "", type: "" })}
        />
      )}
      <SimpleTable
        // actions={<Button onClick={handleConfirmCreateItem}>Crear Amonestación</Button>}
        columns={columns}
        data={data}
      />
      <Offcanvas
        isOpen={offcanvas.isOpen}
        onClose={resetState(offcanvas.handleClose)}
        title={"Editar Alumno"}
      >
        {/* {active.type === "create" && (
          <TeacherCreateBann
            onClose={resetState(offcanvas.handleClose)}
            onAddBan={handleCreateItem}
          />
        )} */}
        {active.type === "edit" && (
          <TeacherEditBann
            onClose={resetState(offcanvas.handleClose)}
            onSubmit={handleEditItem}
            initialValues={{
              date: active.row.date,
              reason: active.row.reason,
              gravity: active.row.gravity,
              student: active.row.student,
              subject: active.row.subject,
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