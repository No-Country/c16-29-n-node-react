import { useState } from "react";
import { teachers } from "../../pages/principal/subjects/mock";
import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const EditSubject = ({ onClose, onSubmit, initialValues }) => {
  const [data, setData] = useState(() => teachers.map((student) => ({
    value: student.id,
    label: student.name
  })));
  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  })


  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-base font-medium">
              Materia
            </label>
            <input
              {...register("subject")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.subject ? 'border-red-500' : 'rounded'}`}
            />       
            {errors?.subject && <p className="text-red-500 text-xs">{errors?.subject.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="grade" className="text-base font-medium">
              Grado
            </label>
            <input 
              {...register("grade")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.grade ? 'border-red-500' : 'rounded'}`}
            />       
            {errors?.grade && <p className="text-red-500 text-xs">{errors?.grade.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="divition" className="text-base font-medium">
              Division
            </label>
            <input 
              {...register("divition")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.divition ? 'border-red-500' : 'rounded'}`}
            />       
            {errors?.divition && <p className="text-red-500 text-xs">{errors?.divition.message}</p>}
          </div>
          <div>
            <label htmlFor="teacher" className="text-base font-medium">
              Profesor Asociado
            </label>
            <Select
              id="teacher"
              onChange={(option) => setValue("teacher", option)}
              defaultValue={{value: 3, label: "Juan Alvarez"}}
              options={data}
            ></Select>
            {errors?.teacher && <p className="text-red-500 text-xs">{errors?.teacher.message}</p>}
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer 
        text={"Asignar"}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </>
  )
}

export default EditSubject;

const schema = z.object({
  subject: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumerico"),
  grade: z.string().regex(/^\d{1}$/, "Debe ser un numero"),
  divition: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  teacher: z.object({
    label: z.string(),
    value: z.number()
  }),
})