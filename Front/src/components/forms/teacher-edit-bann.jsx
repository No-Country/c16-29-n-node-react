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

const students = [
  {
    value: "Bart Simpsons",
    label: "Bart Simpsons"
  },
  {
    value: "Lisa Simpsons",
    label: "Lisa Simpsons"
  },
  {
    value: "Homero Simpsons",
    label: "Homero Simpsons"
  },
]

const subjects = [
  {
    value: "Lengua",
    label: "Lengua"
  },
  {
    value: "Matematica",
    label: "Matematica"
  },
  {
    value: "Geografia",
    label: "Geografia"
  },
]

const TeacherEditBann = ({ onClose, onSubmit, initialValues }) => {
  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  })

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

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
            <label htmlFor="gravity" className="text-base font-medium">
              Gravedad
            </label>
            <Select
              id="gravity"
              placeholder="Seleccionar..."
              onChange={(option) => setValue("gravity", option)}
              options={data}
              defaultValue={initialValues.gravity}
            ></Select>
            {errors?.gravity && <p className="text-red-500 text-xs">{errors?.gravity.message}</p>}
          </div>
          <div>
            <label htmlFor="student" className="text-base font-medium">
              Alumno
            </label>
            <Select
              id="student"
              placeholder="Seleccionar..."
              onChange={(option) => setValue("student", option)}
              options={students}
              defaultValue={initialValues.student}
            ></Select>
            {errors?.student && <p className="text-red-500 text-xs">{errors?.student.message}</p>}
          </div>
          <div>
            <label htmlFor="subject" className="text-base font-medium">
              Materia
            </label>
            <Select
              id="subject"
              placeholder="Seleccionar..."
              onChange={(option) => setValue("subject", option)}
              options={subjects}
              defaultValue={initialValues.subject}
            ></Select>
            {errors?.subject && <p className="text-red-500 text-xs">{errors?.subject.message}</p>}
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
  date: z.string().refine((date) => date && new Date(date).toISOString(), "Debe ser una fecha"),
  reason: z.string("Requerido").min(1, "Requerido"),
  gravity: z.object({
    label: z.string().min(1),
    value: z.string()
  }, {
    required_error: "Requerido"
  }),
  student: z.object({
    label: z.string().min(1),
    value: z.string()
  }, {
    required_error: "Requerido"
  }),
  subject: z.object({
    label: z.string().min(1),
    value: z.string()
  }, {
    required_error: "Requerido"
  }),
  note: z.string().optional()
});