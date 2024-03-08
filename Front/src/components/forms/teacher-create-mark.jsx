import Offcanvas from "../ui/offcanvas";
import Select from "react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchExams } from "../../store/slice/teacher-subject-slice";

const TeacherCreateMark = ({ onClose, onSubmit }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const exams = useSelector((state) => state.teacherSubject.exams);
  const dispatch = useDispatch();

  const options = exams.map((exam) => ({
    value: exam.id,
    label: exam.title
  }));

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch])

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="exam_id" className="text-base font-medium">
              Examen
            </label>
            <Select
              id="exam_id"
              onChange={(option) => setValue("exam_id", option)}
              options={options}
            ></Select>
            {errors?.exam_id && (
              <p className="text-red-500 text-xs">{errors?.exam_id.message}</p>
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
  exam_id: z.object({
    value: z.number(),
  }, {
    required_error: "Requerido"
  }),
  score: z.coerce.number(),
  note: z.preprocess((value) => value === "" ? undefined : value, z.optional(z.string())),
});
