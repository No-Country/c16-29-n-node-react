import SelectWithFilters from "../SelectWithFilters"
import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAlphabetic, isAlphaNumeric, isValidEmail, isValidPassword, isValidPhone } from '../../utils/validation';
import { useEffect } from "react";
import { setSelectedOptions } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
const CreateTeacherForm = ({onClose, onSubmit}) =>{
    const subjects = useSelector(state=>state.subjects.subjects || []);
    const isSubjectsLoaded = Array.isArray(subjects) && subjects.length > 0;
    const selectedOptions = useSelector((state) => state.select.selectedOptions);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
        defaultValues:{
          phone:'',
          email:''
        }
      });
      const dispatch = useDispatch();
      
      
    
      const handleSelectChange = (selectedOptions) => {
        dispatch(setSelectedOptions(selectedOptions));
      };
      const options = subjects.map(subject => ({
        value: subject.id,
        label: subject.label,
        color:subject.color,
      }));

    useEffect(()=>{
        setValue("subjects", selectedOptions)
    },[selectedOptions])
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
            <input id="lastname" {...register("lastname")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.lastname ? 'border-red-500' : 'rounded'}`}/>
            {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname.message}</p>}
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
            {isSubjectsLoaded ? (
                <SelectWithFilters 
                  id="subjects"
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
        onSubmit={handleSubmit(onSubmit)}
        text={"Crear"}
        onClose={onClose}
      />
      
        </>
    )
}

export default CreateTeacherForm;

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
      color: z.string()
    })).optional(),
  });