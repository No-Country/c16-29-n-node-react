import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const data = [
  {
    value: "EXPELLED",
    label: "Expulsion"
  },
  {
    value: "SUSPENDED",
    label: "Suspendido"
  },
  {
    value: "WARNING",
    label: "Advertencia"
  },
]

const TeacherEditBann = ({ onClose, onSubmit, initialValues }) => {
  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  })

  const handleFormSubmit = (formData) => {
    const newItem = {
      ...formData,
      id: initialValues.id
    }
    onSubmit(newItem);
  };

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="reason" className="text-base font-medium">
              Razón
            </label>
            <input
              {...register("reason")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.reason ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.reason && <p className="text-red-500 text-xs">{errors?.reason.message}</p>}
          </div>
          <div>
            <label htmlFor="type" className="text-base font-medium">
              Gravedad
            </label>
            <Select
              id="type"
              placeholder="Seleccionar..."
              onChange={(option) => setValue("type", option)}
              options={data}
              defaultValue={initialValues.type}
            ></Select>
            {errors?.type && <p className="text-red-500 text-xs">{errors?.type.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="text-base font-medium">
              Observacion
            </label>
            <input
              {...register("note")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.note ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.note && <p className="text-red-500 text-xs">{errors?.note.message}</p>}
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer
        onClose={onClose}
        onSubmit={handleSubmit(handleFormSubmit)}
        text={"Asignar"}
      >
      </Offcanvas.Footer>
    </>
  )
}

export default TeacherEditBann;

const schema = z.object({
  reason: z.string().min(1, "Requerido"),
  type: z.object({
    label: z.string().min(1, "Requerido"),
    value: z.string().min(1, "Requerido")
  }),
  note: z.string().optional()
});