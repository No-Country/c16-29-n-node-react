import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const EditTutor = ({ onClose, onSubmit, initialValues }) => {

  const {formState: { errors }, register, handleSubmit, setValue, } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
});


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
                errors?.phonephone ? "border-red-500" : "rounded"
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
            <Select
              id="students"
              onChange={(option) => setValue("students", option)}
              defaultValue={{ value: 3, label: "Juan Alvarez" }}
              options={initialValues.students} 
            ></Select>
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
  value: z.string(),
  label: z.string().min(2).max(20),  
});

const schema = z.object({
  id: z.string(),
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  username: z.string().regex(/^[a-zA-Z0-9_]{4,16}$/),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,15}$/, "La contraseña debe tener entre 6 y 15 caracteres y contener al menos un dígito, una letra minúscula y una letra mayúscula."),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "solamente numeros de telefono"),
  students: z.array(studentSchema), 
});
