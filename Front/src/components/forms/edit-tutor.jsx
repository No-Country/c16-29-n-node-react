import Offcanvas from "../ui/offcanvas";
// import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../store/slice/tutorSlice";
import { setSelectedOptions } from "../../actions/actions";
import SelectWithFilter from "../../components/SelectWithFilters";

const EditTutor = ({ onClose, onSubmit, initialValues }) => {
  const students = useSelector(state=>state.tutor.students || []);
  const isStudentsLoaded = Array.isArray(students) && students.length > 0;
  const selectedOptions = useSelector((state) => state.select.selectedOptions); 
  const dispatch = useDispatch();

  const {formState: { errors }, register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
});

useEffect(()=> {
  dispatch(getStudents())
  dispatch(setSelectedOptions(initialValues.students))
},[])

const handleSelectChange = (selectedOptions) => {
  dispatch(setSelectedOptions(selectedOptions));
};

const options = students.map(students => ({
  value: students.id,
  label: students.label,
  color: students.color,
}));

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-base font-medium">
              Nombre
            </label>
            <input
              {...register("firstName")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.firstName ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.firstName && (
              <p className="text-red-500 text-xs">{errors?.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-base font-medium">
              Apellido
            </label>
            <input
              {...register("lastName")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.lastName ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.lastName && (
              <p className="text-red-500 text-xs">{errors?.lastName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-base font-medium">
              Usuario
            </label>
            <input
              {...register("username")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.username ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.username && (
              <p className="text-red-500 text-xs">{errors?.username.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-base font-medium">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.password ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.password && (
              <p className="text-red-500 text-xs">{errors?.password.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              {...register("email")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.email ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.email && (
              <p className="text-red-500 text-xs">
                {errors?.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-base font-medium">
              Celular
            </label>
            <input
              {...register("phone")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.phone ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.phone && (
              <p className="text-red-500 text-xs">{errors?.phone.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="students" className="text-base font-medium">
              Alumno Asociado
            </label>
            {isStudentsLoaded ? (
                <SelectWithFilter 
                //   id="students"
                  data={options}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={handleSelectChange}
                />
          ) : ( 
            <p>Cargando studiantes ....</p>
          )}
            {/* <Select
              id="students"
              onChange={handleStudentChange}
              defaultValue={selectedStudents}
              options={data}
            ></Select> */}
            {errors?.students && (
              <p className="text-red-500 text-xs">{errors?.students.message}</p>
            )}
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer
        text={"Actualizar"}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </>
  );
};

export default EditTutor;

const studentSchema = z.object({
  value: z.number(),
  label: z.string(),  
});

const schema = z.object({
  id: z.number(),
  firstName: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  lastName: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  username: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  // password: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  email: z.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Dirección de correo electrónico inválida"),
  phone: z.string().regex(/^\d{10}$/, "Número de teléfono inválido, debe tener 10 dígitos"),
  students: z.array(studentSchema), 
});
