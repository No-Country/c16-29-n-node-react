import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const data = [
  {
    value: 0,
    label: "No"
  },
  {
    value: 1,
    label: "Si"
  },
]

const TeacherCreateNote = ({ onClose, onSubmit }) => {
  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema)
  })
  
  return (
    <>
      <Offcanvas.Body>
      <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="date" className="text-base font-medium">
              Fecha de la anotacion
            </label>
            <input
              type="date"
              {...register("date")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.date ? 'border-red-500' : 'rounded'}`}
            />       
            {errors?.date && <p className="text-red-500 text-xs">{errors?.date.message}</p>}
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
          <div>
            <label htmlFor="isPublic" className="text-base font-medium">
              ¿Es Publico?
            </label>
            <Select
              id="isPublic"
              onChange={(option) => setValue("isPublic", option)}
              options={data}
            ></Select>
            {errors?.isPublic && <p className="text-red-500 text-xs">{errors?.isPublic.message}</p>}
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

export default TeacherCreateNote;

const schema = z.object({
  date: z.string().refine((date) => date && new Date(date).toISOString(), "Debe ser una fecha"),
  note: z.string().min(1, "Requerido"),
  isPublic: z.object({
    value: z.number().min(0).max(1),
    label: z.string()
  }, {
    required_error: "Requerido"
  })
});