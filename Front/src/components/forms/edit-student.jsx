import { useEffect, useState } from "react";
import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectWithFilters from "../SelectWithFilters";
import { getTutorsOptions, setSelectedTutorsOptions } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

const EditStudent = ({ onClose, onSubmit, initialValues }) => {

  // Estados

  const selectedTutorsOptions = useSelector((state) => state.select.selectedTutorsOptions);
  const dispatch = useDispatch();
  const tutorsFetchOptions = useSelector((state) => state.tutors.tutorsOptions);

  const handleSelectChange = (selectedTutorsOptions) => {
    console.log(selectedTutorsOptions);
    dispatch(setSelectedTutorsOptions(selectedTutorsOptions));
  };

  useEffect(() => {
    dispatch(getTutorsOptions())
    console.log(tutorsFetchOptions);
  }, [])

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  useEffect(() => {
    setValue("tutors", setSelectedTutorsOptions)
  }, [selectedTutorsOptions])

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
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.firstName ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.firstName && <p className="text-red-500 text-xs">{errors?.firstName.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-base font-medium">
              Apellido
            </label>
            <input
              {...register("lastName")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.lastName ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.lastName && <p className="text-red-500 text-xs">{errors?.lastName.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-base font-medium">
              Usuario
            </label>
            <input
              {...register("username")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.username ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.username && <p className="text-red-500 text-xs">{errors?.username.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-base font-medium">
              Contraseña
            </label>
            <input
              {...register("password")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.password ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.password && <p className="text-red-500 text-xs">{errors?.password.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              {...register("email")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.email ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.email && <p className="text-red-500 text-xs">{errors?.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-base font-medium">
              Celular
            </label>
            <input
              {...register("phone")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.phone ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.phone && <p className="text-red-500 text-xs">{errors?.phone.message}</p>}
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
          <div>
            <label htmlFor="tutors" className="text-base font-medium">
              Tutores Asociados
            </label>
            <SelectWithFilters
              data={tutorsFetchOptions}
              selectedOptions={selectedTutorsOptions}
              setSelectedOptions={handleSelectChange}
            />
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer
        text={"Asignar"}
        onSubmit={handleSubmit(handleFormSubmit)}
        onClose={onClose}
      />
    </>
  );
};

export default EditStudent;

// Validaciones 

const schema = z.object({
  firstName: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  lastName: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  username: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  password: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  // password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Debe ser alfanumérico y contener al menos 1 letra minúscula, 1 letra mayúscula, 1 dígito, 1 carácter especial, y tener una longitud mínima de 8 caracteres"),
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Dirección de correo electrónico inválida"),
  phone: z.string().regex(/^\d{10}$/, "Número de teléfono inválido, debe tener 10 dígitos"),
  // state: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  grade: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser un número"),
  tutors: z.array(
    z.object({
      id: z.number(),
      value: z.string(),
      label: z.string(),
      name: z.string(),
      color: z.string(),
    })
  ).nonempty("Debe seleccionar al menos un tutor"),
})

// ------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------ //