import Offcanvas from "../ui/offcanvas";
import { useForm,  } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import { isValidPassword, isAlphabetic, isAlphaNumeric, isValidPhone, isValidEmail} from "../../utils/validation";
import { useEffect } from "react";
import SelectWithFilters from "../SelectWithFilters";
import { setSelectedOptions } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
const EditTeacher = ({onClose, onSubmit, initialValues}) =>{

  const selectedOptions = useSelector((state) => state.select.selectedOptions);
  const dispatch = useDispatch();
  const subjects = useSelector(state=>state.subjects.subjects || []);
  const isMateriasLoaded = Array.isArray(subjects) && subjects.length > 0;
 
 
  const handleSelectChange = (selectedOptions) => {
    dispatch(setSelectedOptions(selectedOptions));
  };

  const options = subjects.map(subject => ({
    value: subject.id,
    label: subject.label,
    color:subject.color,
  }));

  


  const { register, handleSubmit,formState: { errors } , setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues:initialValues
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };
  useEffect(()=>{
    setValue("subjects", selectedOptions)
},[selectedOptions, initialValues])
console.log(errors, "errores desde el edit teacher")
return (
    <>
        <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base font-medium">Nombre</label>
            <input id="name" {...register("name")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.name ? 'border-red-500' : 'rounded'}`}
            />  
          {errors?.name && <p className="text-red-500 text-xs">{errors?.name.message}</p>} 
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname">Apellido</label>
            <input id="lastname" {...register("lastname")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.lastname ? 'border-red-500' : 'rounded'}`} />
            {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="username">Usuario</label>
            <input id="username" {...register("username")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.username ? 'border-red-500' : 'rounded'}`} />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>
        
          <div className="flex flex-col">
            <label htmlFor="password">Contraseña</label>
            <input id="password" {...register("password")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.password ? 'border-red-500' : 'rounded'}`} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.email ? 'border-red-500' : 'rounded'}`} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone">Celular</label>
            <input id="phone" type="tel" {...register("phone")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.phone ? 'border-red-500' : 'rounded'}`} />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="subjects">Materias Asociadas</label>
            {isMateriasLoaded ? (
              <SelectWithFilters
                data={options}
                selectedOptions={selectedOptions}
                setSelectedOptions={handleSelectChange}
                />
                ) : ( 
            <p>Cargando materias ....</p>
          )}
                {errors.subjects && <p className="text-red-500 text-xs">{errors.subjects.message}</p>}
           </div>
          </div>
        </Offcanvas.Body>
        <Offcanvas.Footer
            text={"Actualizar"}
            onSubmit={handleSubmit(handleFormSubmit)}
            onClose={onClose}>
        </Offcanvas.Footer>
    </>
);
}

export default EditTeacher; 
const schema = z.object({
    name: z.string().min(6, "El nombre es obligatorio").refine(isAlphabetic, "El nombre debe ser alfabético"),
    lastname: z.string().min(1, "El apellido es obligatorio").refine(isAlphabetic, "El apellido debe ser alfabético"),
    email: z.string().optional().refine(isValidEmail,"Debe ser un correo válido"),
    username: z.string().min(6, "El usuario es obligatorio").refine(isAlphaNumeric, "El nombre de usuario debe ser alfanumérico"),
    password: z.string().min(6, "La contraseña es obligatoria").refine(isValidPassword, "La contraseña no es válida"),
    phone: z.string().optional().refine(isValidPhone, "Número de teléfono inválido, debe tener 10 dígitos"),
    subjects: z.array(z.object({
      label: z.string(),
      value: z.number(),
      color:z.string()
    })).optional(),
});
