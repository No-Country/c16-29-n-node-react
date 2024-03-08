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

const TeacherCreateBann = ({ onClose, onSubmit }) => {
  const { formState: { errors }, register, handleSubmit, setValue, getValues } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="date" className="text-base font-medium">
              Fecha de amonestacion
            </label>
            <input
              type="date"
              {...register("date")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.date ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.date && <p className="text-red-500 text-xs">{errors?.date.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="reason" className="text-base font-medium">
              Razon
            </label>
            <input
              {...register("reason")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.reason ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.reason && <p className="text-red-500 text-xs">{errors?.reason.message}</p>}
          </div>
          <div>
            <label htmlFor="type" className="text-base font-medium">
              Tipo de Amonestacion
            </label>
            <Select
              id="type"
              placeholder="Seleccionar..."
              onChange={(option) => setValue("type", option)}
              value={getValues().type}
              options={data}
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
        onSubmit={handleSubmit(onSubmit)}
        text={"Crear"}
      >
      </Offcanvas.Footer>
    </>
  )
}

export default TeacherCreateBann;

const schema = z.object({
  date: z.string().refine((date) => date && new Date(date).toISOString(), "Debe ser una fecha"),
  reason: z.string().min(1, "Requerido"),
  type: z.object({
    value: z.string()
  }, {
    required_error: "Requerido"
  }),
  note: z.preprocess((value) => value === "" ? undefined : value, z.optional(z.string()))
});