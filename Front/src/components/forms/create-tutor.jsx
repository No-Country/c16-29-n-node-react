import { useEffect, useState } from "react";
import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectWithFilter from "../../components/SelectWithFilters";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOptions } from "../../actions/actions";
import { getStudents } from "../../store/slice/tutorSlice";

const CreateTutor = ({ onClose, onSubmit }) => {

    // const students = useSelector(state=>state.students.students || []);
    const students = useSelector(state=>state.tutor.students || []);
    const isStudentsLoaded = Array.isArray(students) && students.length > 0;
    const selectedOptions = useSelector((state) => state.select.selectedOptions);    
    const dispatch = useDispatch();

    
    const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
});

  useEffect(()=> {
  dispatch(getStudents())
},[])


  const handleSelectChange = (selectedOptions) => {
    dispatch(setSelectedOptions(selectedOptions));
  };

  const options = students.map(students => ({
    value: students.id,
    label: students.label,
    color: students.color,
  }));

//   const [options, setOptions] = useState([
//     {
//       id: 1,
//       value: "ocean",
//       label: "Bart Simpson",
//       name: "Bart Simpson",
//       color: "#00B8D9",
//     },
//     {
//       id: 2,
//       value: "orange",
//       label: "Lisa Simpson",
//       name: "Lisa Simpson",
//       color: "#FF8B00",
//     },
//     {
//       id: 3,
//       value: "forest",
//       label: "Homero Simpson",
//       name: "Homero Simpson",
//       color: "#00875A",
//     },
//   ]);

  useEffect(() => {
    setValue("students", selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-base font-medium">
              Nombre
            </label>
            <input
              {...register("firstName", { required: "El nombre es requerido" })}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.firstName ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.firstName && (
              <p className="text-red-500 text-xs">
                {errors?.firstName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="text-base font-medium">
              Apellido
            </label>
            <input
              {...register("lastname", {
                required: "El apellido es requerido",
              })}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.lastname ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.lastname && (
              <p className="text-red-500 text-xs">{errors?.lastname.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-base font-medium">
              Usuario
            </label>
            <input
              {...register("username", { required: "El usuario es requerido" })}
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
              {...register("password", {
                required: "El passoword es requerido",
              })}
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
              <p className="text-red-500 text-xs">{errors?.email.message}</p>
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
              Alumnos Asociados
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
            {/* <SelectWithFilter
              data={options}
              selectedOptions={selectedOptions}
              setSelectedOptions={handleSelectChange}
            /> */}
            {errors?.students && (
              <p className="text-red-500 text-xs">{errors?.students.message}</p>
            )}
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer
        text={"Crear"}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </>
  );
};

export default CreateTutor;

const schema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  lastname: z
    .string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  username: z
    .string()
    .min(3)
    .max(15)
    .regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  password: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  email: z
    .string()
    .regex(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Dirección de correo electrónico inválida"
    ),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Número de teléfono inválido, debe tener 10 dígitos"),

  students: z
    .array(
      z.object({        
        value: z.number(),
        label: z.string()
      })
    )
});
