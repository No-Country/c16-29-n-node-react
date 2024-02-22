import React, { useState } from 'react';
import validateInput from '../utils/validateInput';
export const Input = ({ type, name, value, onChange, placeholder, validateInputConfig, ...rest }) =>{
      const [error, setError] = useState('');
  
      const handleBlur = (e) => {
        const errorMessage = validateInput(validateInputConfig, e.target.value);
        setError(errorMessage);
      };
    
      const handleChange = (e) => {
        onChange(e); 
        if(validateInputConfig){ 
        const errorMessage = validateInput(validateInputConfig, e.target.value);
        setError(errorMessage);
      }}

    return(
        <>
        <input className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${error ? 'border-red-500' : 'rounded'}`}
         type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        validations={validateInputConfig}
        {...rest}
        />       
         {error && <p className="text-red-500 text-xs">{error}</p>}
        </>
    )
}

export default Input;