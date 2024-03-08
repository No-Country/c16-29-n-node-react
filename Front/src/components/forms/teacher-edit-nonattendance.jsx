import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

const schema = z.object({
  note: z.preprocess((value) => value === "" ? undefined : value, z.optional(z.string())),
  type: z.object({
    value: z.string(),
  }).optional(), 
});

const EditNonAttendance = ({ onClose, onSubmit, initialValues }) => {
  const data = [
    {
      value: "NON_ATTENDANCE",
      label: "Inasistencia"
    },
    {
      value: "DELAYED",
      label: "Tardanza"
    }
  ];

  const initialTypeValue = useMemo(() => {
    return data.find(option => option.value === initialValues.type) || data[0] ;
  }, [initialValues.type]);

  const { formState: { errors }, register, handleSubmit, setValue, getValues, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  const handleFormSubmit = (formData) => {
    //Si en caso el input de observaciones no se coloca nada, al enviar se actualizara a un input vacio
    const noteValue = formData.note === undefined ? "" : formData.note;

    const submittedData = {
      ...formData,
      type:  formData.type.value,
      note: noteValue,
    };
    onSubmit(submittedData);
  };

  useEffect(() => {
    setValue('type', initialTypeValue);
    setValue('note', initialValues.note);
  }, [initialTypeValue, initialValues.note, setValue]);

  watch("type");
  watch("note");
 

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
              value={getValues('type')} 
              onChange={(option) => setValue('type', option)} 
              isClearable
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="text-base font-medium">
              Observación
            </label>
            <input
              {...register("note")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.note ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.note && <p className="text-red-500 text-xs">{errors.note.message}</p>}
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
