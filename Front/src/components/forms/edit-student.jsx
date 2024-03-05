import { useEffect, useState } from "react";
import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectWithFilters from "../SelectWithFilters";
import { setSelectedOptions } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

const EditStudent = ({ onClose, onSubmit, initialValues }) => {

  // Estados

  const selectedOptions = useSelector((state) => state.select.selectedOptions);
  const dispatch = useDispatch();

  const handleSelectChange = (selectedOptions) => {
    dispatch(setSelectedOptions(selectedOptions));
  };

  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------ //

  // Data para el estilo de las opciones

  const [options, setOptions] = useState([
    {
      id: 1,
      value: "ocean",
      label: "Bart Simpson",
      name: "Bart Simpson",
      color: "#00B8D9",
    },
    {
      id: 2,
      value: "orange",
      label: "Lisa Simpson",
      name: "Lisa Simpson",
      color: "#FF8B00",
    },
    {
      id: 3,
      value: "forest",
      label: "Homero Simpson",
      name: "Homero Simpson",
      color: "#00875A",
    },
  ]);

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
    setValue("tutors", selectedOptions)
  }, [selectedOptions])

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base font-medium">
              Nombre
            </label>
            <input
              {...register("name")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.name ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.name && <p className="text-red-500 text-xs">{errors?.name.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="text-base font-medium">
              Apellido
            </label>
            <input
              {...register("lastname")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.lastname ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.lastname && <p className="text-red-500 text-xs">{errors?.lastname.message}</p>}
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
            <label htmlFor="phonenumber" className="text-base font-medium">
              Celular
            </label>
            <input
              {...register("phonenumber")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.phonenumber ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.phonenumber && <p className="text-red-500 text-xs">{errors?.phonenumber.message}</p>}
          </div>
          <div>
            <label htmlFor="tutors" className="text-base font-medium">
              Tutores Asociados
            </label>
            <SelectWithFilters
              data={options}
              selectedOptions={selectedOptions}
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
  name: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  lastname: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  username: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  password: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  // password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Debe ser alfanumérico y contener al menos 1 letra minúscula, 1 letra mayúscula, 1 dígito, 1 carácter especial, y tener una longitud mínima de 8 caracteres"),
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Dirección de correo electrónico inválida"),
  phonenumber: z.string().regex(/^\d{10}$/, "Número de teléfono inválido, debe tener 10 dígitos"),
  // state: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
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