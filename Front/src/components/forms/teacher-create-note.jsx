import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const data = [
  {
    value: false,
    label: "No"
  },
  {
    value: true,
    label: "Si"
  },
]

const TeacherCreateNote = ({ onClose, onSubmit }) => {
  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema)
  });
  
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
            <label htmlFor="is_public" className="text-base font-medium">
              ¿Es Publico?
            </label>
            <Select
              id="is_public"
              onChange={(option) => setValue("is_public", option)}
              options={data}
            ></Select>
            {errors?.is_public && <p className="text-red-500 text-xs">{errors?.is_public.message}</p>}
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
  is_public: z.object({
    value: z.boolean()
  }, {
    required_error: "Requerido"
  })
});