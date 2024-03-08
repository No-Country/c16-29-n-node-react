import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

const data = [
  {
    value: true,
    label: "Si",
  },
  {
    value: false,
    label: "No",
  },
];

const EditNotes = ({ onClose, onSubmit, initialValues }) => {
  
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    getValues
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

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
              defaultValue={initialValues.is_public}
              onChange={(option) => setValue("is_public", option)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="text-base font-medium">
              Observación
            </label>
            <input
              {...register("note")}
              defaultValue={initialValues.note}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.note ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.note && (
              <p className="text-red-500 text-xs">{errors?.note.message}</p>
            )}
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer
        text={"Actualizar"}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </>
  );
};

export default EditNotes;

const schema = z.object({
  is_public: z.object(
    {
      label: z.string(),
      value: z.boolean(),
    },
    {
      required_error: "Requerido",
    }
  ),
  note: z.string().min(1, "Requerido"),
});
