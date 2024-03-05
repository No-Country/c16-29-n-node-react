import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "react-select";
import { isAlphaNumeric } from "../../utils/validation";

const EditNonAssistances = ({ onClose, onSubmit, initialValues }) => {

  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });
  const typeOptions = [
    { value: 'NON_ATTENDANCE', label: 'Inasistencia' },
    { value: 'DELAYED', label: 'Tardanza' }
  ];
  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2"> 
          <div>
            <label htmlFor="nonAssistances" className="text-base font-medium">
              Tipo de Inasistencia
            </label>
            <Select
              options={[typeOptions]}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="observation" className="text-base font-medium">
              Observación
            </label>
            <input
              {...register("observation")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.observation ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.observation && <p className="text-red-500 text-xs">{errors?.observation.message}</p>}
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

export default EditNonAssistances;



const schema = z.object({
    nonAssitances: z.array(
        z.object({type: z.enum(['NON_ATTENDANCE', 'DELAYED']),})
      ).optional(),
    observation: z.string().optional().refine(isAlphaNumeric, "Debe ser alfanumerico"),
})
