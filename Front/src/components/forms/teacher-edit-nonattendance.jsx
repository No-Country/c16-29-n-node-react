import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import {useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import Select from "react-select";
const EditNonAttendance = ({ onClose, onSubmit, initialValues }) => {
  const nonassistancesList = useSelector(state=> state.nonAttendances.nonAttendances);


console.log(nonassistancesList, "lista de inasistencias desde el edit")

const data = [
  {
    value: "NONATTENDANCE",
    label: "Inasistencia"
  },
  {
    value: "DELAY",
    label: "Tardanza"
  }
]

  const initialTypeValue = useMemo(() => {
    return initialValues.type === 'NON_ATTENDANCE'
     ? { value: 'NONATTENDANCE', label: 'Inasistencia' }
     : { value: 'DELAY', label: 'Tardanza' };
   }, [initialValues.type]);
  const [selectedType, setSelectedType] = useState (initialTypeValue);


  


  const handleFormSubmit = (formData) => {
      onSubmit({
         ...formData, 
         type: selectedType ? selectedType.value : 'DEFAULT_VALUE'
        });
  };
  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...initialValues,
      type: initialTypeValue,
      note: initialValues.note //  'note' debe ser una cadena
    }
  });
  useEffect(() => {
    // Actualiza el valor de 'type' en 'react-hook-form'
    setValue('note', initialValues.note);
    setValue('type', initialTypeValue);
  }, [initialTypeValue,initialValues.note]);
 
   
 
console.log(errors)
  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2"> 
          <div>
            <label htmlFor="type" className="text-base font-medium">
              Tipo de Inasistencia
            </label>
            <Select
              options={data}
              value={selectedType} 
              onChange={(data) =>{setSelectedType(data); setValue('type', data)}}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="text-base font-medium">
              Observación
            </label>
            <input
              {...register("note")}
              defaultValue={initialValues.note}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.note ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.note && <p className="text-red-500 text-xs">{errors?.note.message}</p>}
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer
        text={"Actualizar"}
        onSubmit={handleSubmit(handleFormSubmit)}
        onClose={onClose}
      />
    </>
  );
};

export default EditNonAttendance;



const schema = z.object({
  type: z.object({
    label: z.string(),
    value: z.string()
  }, {
    required_error: "Requerido"
  }),
    note: z.string().min(1, "Requerido")
})
