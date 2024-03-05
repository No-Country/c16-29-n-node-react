import Label from '../Label'
import Input from '../Input'
import Button from '../ui/button'
import { useState } from 'react';

const ConfirmDelete = ({ text, onClose, onConfirm }) => {
  const [isConfirmed, setIsConfirmed] = useState();

  const handleChange = (e) => {
    setIsConfirmed(/^\d+$/.test(e.currentTarget.value))
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  }

  return (
    <div className='flex flex-col rounded-md overflow-hidden'>
      <div className='px-4 py-8 bg-[#F8453B] text-white text-2xl'>
        ¿Eliminar {text}? 
      </div>
      <div className='flex flex-col gap-4 bg-white px-2 py-4'>
        <p>Estas a punto de eliminar un registro</p>
        <div className='flex flex-col'>
          <Label htmlFor={"confirm"}>Introduce un digito para continuar</Label>
          <Input 
            name={"confirm"}
            placeholder={1}
            onChange={handleChange}
          />
        </div>
        <div className='flex gap-2'>
          <Button onClick={handleConfirm} size={"xs"} variant={"red"} disabled={!isConfirmed} >Confirmar</Button>
          <Button onClick={onClose} size={"xs"} variant={"gray-outlined"}>Cancelar</Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete