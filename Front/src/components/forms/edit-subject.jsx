import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import { fetchTeachers } from "../../store/slice/principal-subjects-slice";
import { parseValues } from "../../utils/validation";

const EditSubject = ({ onClose, onSubmit, initialValues }) => {
  const teachers = useSelector((state) => state.principalSubjects.teachers);
  const dispatch = useDispatch()

  const { formState: { errors }, register, handleSubmit, setValue, getValues } = useForm({
    resolver: zodResolver(schema),
    defaultValues: parseValues(initialValues)
  })

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const options = teachers?.map((teacher) => ({
    value: teacher.id,
    label: `${teacher.first_name} ${teacher.last_name}`
  })) ?? [];

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base font-medium">
              Materia
            </label>
            <input
              {...register("name")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.name ? 'border-red-500' : 'rounded'}`}
            />       
            {errors?.name && <p className="text-red-500 text-xs">{errors?.name.message}</p>}
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
              id="teachers"
              onChange={(option) => setValue("teachers", option)}
              defaultValue={getValues("teachers")}
              options={options}
              isMulti
            ></Select>
            {errors?.teachers && <p className="text-red-500 text-xs">{errors?.teachers.message}</p>}
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
  name: z
          .string()
          .min(3, "Debe contener al menos 3 caracteres")
          .regex(/^[\w\d\s]+$/, "Debe ser alfanumerico"),
  grade: z
          .string()
          .regex(/^\d{1}$/, "Debe ser un solo digito"),
  divition: z
          .string()
          .min(1, "Debe contener al menos un caracter")
          .regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  teachers: z.array(z.object({
    label: z.string(),
    value: z.number()
  })),
})