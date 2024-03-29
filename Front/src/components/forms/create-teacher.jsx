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
        label: `${subject.name} ${subject.grade}° ${subject.divition}`,
      }));
    useEffect(()=>{
      dispatch(setSelectedOptions([]))

    },[dispatch])
    useEffect(()=>{
        setValue("subjects", selectedOptions)
    },[selectedOptions, setValue])
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
            <input id="last_name" {...register("last_name")} className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.last_name ? 'border-red-500' : 'rounded'}`}/>
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
    first_name: z.string().min(6, "El nombre es obligatorio").refine(isAlphabetic, "El nombre debe ser alfabético"),
    last_name: z.string().min(1, "El apellido es obligatorio").refine(isAlphabetic, "El apellido debe ser alfabético"),
    username: z.string().min(6, "El usuario es obligatorio").refine(isAlphaNumeric, "El nombre de usuario debe ser alfanumérico"),
    password: z.string().min(6, "La contraseña es obligatoria").refine(isValidPassword, "La contraseña no es válida"),
    email: z.preprocess((value) => value === "" ? undefined : value, z.optional(z.string().optional().refine(isValidEmail,"Debe ser un correo válido"))),
    phone: z.preprocess((value) => value === "" ? undefined : value, z.optional(z.string().refine(isValidPhone, "Número de teléfono inválido, debe tener 10 dígitos"))),
    subjects: z.array(z.object({
      value: z.number(),
    })).optional(),
  });