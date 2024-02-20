import React, {useState, useCallback } from "react";
import Label from "./Label";
import Input from "./Input";
export const OffCanvas = ({
    title,
    actionType,
    onSubmit,
    fields,
    selectedOption,
    handleCloseForm,
}) =>{
const formInitialState = fields.reduce((acc,field)=>({
    ...acc,
    [field.name]:field.defaultValue || ''}),{});

const buttonText = actionType.includes('crear') ? 'Crear' : 'Editar';

const [formData, setFormData]=useState(formInitialState)
const [validationErrors, setValidationErrors]= useState({})

const handleChange = useCallback((e) =>{
    const { name, value } = e.target;
    setFormData(prevFormData =>({ ...prevFormData, [name]: value }));
},[setFormData])
const handleSelectChange = useCallback((name, selectedOption)=>{
    const values = isMulti ? selectedOption.map(option => option.value) : selectedOption.value;
    setFormData(prevFormData=>({ ...prevFormData, [name]: values }));
},[setFormData])
const handleSubmit = useCallback((e) =>{
    e.preventDefault();
    let errors = {};
    fields.forEach(field => {
        const error = validateInput(field.validations, formData[field.name]);
        if (error) {
        errors[field.name] = error;
        }
    });
    if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    dispatch(onSubmit(formData));
    setValidationErrors({})
},[fields,formData, onSubmit])
return (
    <div className={` fixed top-0 right-0 z-40 w-80 h-screen overflow-y-auto bg-white border-l transition-transform`}>
     <div className='bg-gradient-to-br from-blue-400 to-purple-600 py-2 px-3 flex justify-between items-center'>
         <h3 className='text-lg font-bold text-blue-950'>{title}</h3>
             <button className='cursor-pointer' onClick={handleCloseForm}>
                 <img src="./src/assets/Close.png" alt="btn-close"/>
             </button>
     </div>

     <form onSubmit={handleSubmit}  className=' flex flex-col h-full overflow-y-auto'>
     <div className='flex flex-col flex-1 p-2 gap-2 font-poppins text-base'>
     {fields.filter(field =>field.type !== 'select').map((field)=>(  
         <div key={field.name} className='grid'>
             <Label htmlFor={field.name}>{field.label}</Label>
             <Input  type={field.type || 'text'}
                     name={field.name}
                     value={formData[field.name] || ''}
                     onChange={handleChange}
                     placeholder={field.placeholder}
                     validations={field.validations}
             />
         </div>
    ))}
    {fields.filter(field => field.type === 'select').map((field) => (
             <div key={field.name}>
             <Label htmlFor={field.name}>{field.label}</Label>
             <Select
             name={field.name}
             options={field.options}
             value={formData[field.name]}
             onChange={handleSelectChange}
             isMulti={field.isMulti}
             styles={fields.styles}
             />
             </div>
        
    ))}
     </div>
     <div className='p-3 bg-gray-200 border-t border-gray-300 flex gap-4'>
     <button className=' px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition duration-300 ease-in-out' type="submit">{buttonText}</button>
     <button className=" px-4 py-2 text-purple-600 border border-purple-600 rounded cursor-pointer text-center bg-white" type="button" onClick={handleCloseForm}>Cancelar</button>
     </div>
     </form>
 </div>
)    
}

export default OffCanvas;