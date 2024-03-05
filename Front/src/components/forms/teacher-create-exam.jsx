import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const TeacherCreateExam = ({ onSubmit, onClose }) => {
  const { formState: { errors }, register, handleSubmit } = useForm({
    resolver: zodResolver(schema)
  })

  return (
    <>
      <Offcanvas.Body>
      <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="date" className="text-base font-medium">
              Fecha de la evaluacion
            </label>
            <input
              type="date"
              {...register("date")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.date ? 'border-red-500' : 'rounded'}`}
            />       
            {errors?.date && <p className="text-red-500 text-xs">{errors?.date.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-base font-medium">
              Titulo
            </label>
            <input 
              {...register("title")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.title ? 'border-red-500' : 'rounded'}`}
            />       
            {errors?.title && <p className="text-red-500 text-xs">{errors?.title.message}</p>}
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

export default TeacherCreateExam

const schema = z.object({
  date: z.string().refine((date) => date && new Date(date).toISOString(), "Debe ser una fecha"),
  title: z.string().min(1, "Requerido")
});