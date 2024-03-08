import { useEffect, useMemo, useState } from "react";
// import Button from "../../components/ui/button";
import { SimpleTable } from "../../components/SimpleTabla";
import Offcanvas from "../../components/ui/offcanvas";
import useDisclosure from "../../hooks/useDisclosure";
import Modal from "../../components/ui/modal";
// import TeacherCreateBann from "../../components/forms/teacher-create-bann";
import TeacherEditBann from "../../components/forms/teacher-edit-bann";
import ConfirmDelete from "../../components/modals/confirm-delete";
import Alert from "../../components/Alert";
import { deleteBann, editBanns, getBanns } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/dates";

const MAP = {
  WARNING: "Advertencia",
  SUSPENDED: "Suspension",
  EXPELLED: "Expulsion",
};

const Banns = () => {
  const dispatch = useDispatch();
  const banns = useSelector((state) => state.banns.banns);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [active, setActive] = useState({
    type: "",
    row: {},
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
    dispatch(getBanns());
  }, [dispatch]);

  const resetState = (action) => () => {
    action();
    setActive({
      type: "",
      row: {},
    });
  };

  const handleConfirmEditItem = (row) => {
    setActive({
      type: "edit",
      row,
    });
    offcanvas.handleOpen();
  };

  const handleConfirmDeleteItem = (row) => {
    setActive({
      type: "delete",
      row,
    });
    modal.handleOpen();
  };

  const handleEditItem = (row) => {
    const newItem = {
      reason: row.reason,
      type: row.type?.value,
      note: row.note,
    };
    editBanns(newItem, row.id)
      .then(() => {
        dispatch(getBanns());
        resetState(offcanvas.handleClose)();
        setAlert({
          message: "Se editó la amonestacion correctamente",
          type: "success",
        });
      })
      .catch(() => {
        setAlert({
          message: "No se pudo editar la amonestacion",
          type: "error",
        });
      });
  };

  const handleDeleteItem = ({ id }) => {
    deleteBann(id)
      .then(() => {
        dispatch(getBanns());
        resetState(offcanvas.handleClose)();
        setAlert({
          message: "Se elminó la amonestacion correctamente",
          type: "success",
        });
      })
      .catch(() => {
        setAlert({
          message: "No se pudo eliminar la amonestacion",
          type: "error",
        });
      });
  };

  const columns = useMemo(() => {
    return [
      {
        id: "date",
        Header: "Fecha",
        accessorFn: (row) => formatDate(new Date(row.date)),
      },
      {
        Header: "Razón",
        accessorKey: "reason",
      },
      {
        id: "type",
        Header: "Gravedad",
        accessorFn: (row) => MAP[row.type],
      },
      {
        Header: "Alumno",
        accessorKey: "student",
        cell: ({ row: { original } }) => (
          <span>{original.student?.fullName}</span>
        ),
      },
      {
        Header: "Materia",
        accessorKey: "subject",
        cell: ({ row: { original } }) => (
          <span>{original.subject?.fullName}</span>
        ),
      },
      {
        Header: "Nota",
        accessorKey: "note",
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
  }, []);

  return (
    <div className="grow flex flex-col overflow-y-auto">
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
      <SimpleTable columns={columns} data={banns} />
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
      <Modal isOpen={modal.isOpen} onClose={modal.handleClose}>
        {active.type === "delete" && (
          <ConfirmDelete
            text={`amonestacion`}
            onClose={resetState(modal.handleClose)}
            onConfirm={() => handleDeleteItem(active.row)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Banns;
