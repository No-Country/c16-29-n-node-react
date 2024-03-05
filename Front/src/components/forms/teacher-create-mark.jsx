import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// DATA MOCKEADA
const data = [
  {
    value: 1,
    label: "Operaciones Simples - Escrito",
  },
  {
    value: 1,
    label: "Analisis Matematico - Escrito",
  },
  {
    value: 1,
    label: "Operaciones con Polinomios - Escritos",
  },
];

const TeacherCreateMark = ({ onClose, onSubmit }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="exam" className="text-base font-medium">
              Examen
            </label>
            <Select
              id="exam"
              onChange={(option) => setValue("exam", option)}
              options={data}
            ></Select>
            {errors?.exam && (
              <p className="text-red-500 text-xs">{errors?.exam.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="text-base font-medium">
              Fecha de la puntuacion
            </label>
            <input
              type="date"
              {...register("date")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.date ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.date && (
              <p className="text-red-500 text-xs">{errors?.date.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="score" className="text-base font-medium">
              Puntuacion
            </label>
            <input
              {...register("score")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${
                errors?.score ? "border-red-500" : "rounded"
              }`}
            />
            {errors?.score && (
              <p className="text-red-500 text-xs">{errors?.score.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="text-base font-medium">
              Observacion
            </label>
            <input
              {...register("note")}
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
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        text={"Crear"}
      ></Offcanvas.Footer>
    </>
  );
};

export default TeacherCreateMark;

const schema = z.object({
  exam: z.object({
    label: z.string(),
    value: z.number(),
  }, {
    required_error: "Requerido"
  }),
  score: z.coerce.number(),
  date: z.string().refine((date) => date && new Date(date).toISOString(), "Debe ser una fecha"),
  note: z.string(),
});
