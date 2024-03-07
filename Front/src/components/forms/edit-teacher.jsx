import Offcanvas from "../ui/offcanvas";
import { useForm,  } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import {isAlphabetic, isAlphaNumeric, isValidPhone, isValidEmail, isValidPassword} from "../../utils/validation";
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
    label: `${subject.name} ${subject.grade}° ${subject.divition}`
  }));

  {/*const handleFormSubmit = (formData) => {
    // Asegúrate de que estás enviando el ID de las materias, que es lo que comúnmente se requiere.
  const subjectsIds = formData.subjects.map(option => option.value);
  
  const dataToSubmit = {
    ...formData,
    subjects: subjectsIds, // Suponiendo que tu backend espera un arreglo de IDs
  };

  onSubmit(dataToSubmit);
  };*/
  useEffect(() => {
    dispatch(setSelectedOptions(initialValues.subjects.map(subject => ({
      value: subject.id,
      label: subject.fullName
    }))))
  }, [initialValues.subjects, dispatch]);
  
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
//
return (
    <>
        <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="text-base font-medium">Nombre</label>
            <input id="first_name" {...register("first_name")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.first_name ? 'border-red-500' : 'rounded'}`}
            />  
          {errors?.first_name && <p className="text-red-500 text-xs">{errors?.first_name.message}</p>} 
          </div>

          <div className="flex flex-col">
            <label htmlFor="last_name">Apellido</label>
            <input id="last_name" {...register("last_name")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.last_name ? 'border-red-500' : 'rounded'}`} />
            {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="username">Usuario</label>
            <input id="username" {...register("username")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.username ? 'border-red-500' : 'rounded'}`} />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" {...register("password")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.password ? 'border-red-500' : 'rounded'}`} />
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
}}

export default EditTeacher; 
const schema = z.object({
    first_name: z.string().min(6, "El nombre es obligatorio").refine(isAlphabetic, "El nombre debe ser alfabético").optional(),
    last_name: z.string().min(1, "El apellido es obligatorio").refine(isAlphabetic, "El apellido debe ser alfabético").optional(),
    email: z.string().refine(isValidEmail,"Debe ser un correo válido").optional(),
    username: z.string().min(6, "El usuario es obligatorio").refine(isAlphaNumeric, "El nombre de usuario debe ser alfanumérico"),
    password: z.optional(z.string().min(6, "Debe tener un minimo de 6 caracteres").refine(isValidPassword, "El nombre de usuario debe ser alfanumérico")),
    phone: z.string().optional().refine(isValidPhone, "Número de teléfono inválido, debe tener 10 dígitos"),
    subjects: z.optional(z.array(z.object({
      value: z.number(),
    }))),
});
