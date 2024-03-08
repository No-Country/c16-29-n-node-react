import { useEffect, useMemo } from "react";
import { SimpleTable } from "../../components/SimpleTabla"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjects } from "../../store/slice/teacher-subjects-slice";

const Subject = () => {

  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.teacherSubjects.subjects);

  useEffect(() => {
    dispatch(fetchSubjects())
  }, [dispatch]);

  const columns = useMemo(() => {
    return [
      {
        Header: "Materia",
        accessorKey: "name",
        cell: ({ row: { original } }) => (
          <Link
            to={`./${original.name}_${original.grade}°_${original.divition}`}
            className="underline text-[#1368CE]"
          >
            {original.name}
          </Link>
        )
      },
      {
        id: "grade",
        Header: "Grado",
        accessorFn: (row) => row.grade + "°",
      },
      {
        Header: "Division",
        accessorKey: "divition",
      },
      {
        Header: "Profesor Asociado",
        id: "teacher",
        accessorFn: (row) => row.teachers.map((teacher) => teacher.fullName).join("/"),
      },
      {
        Header: "# Alumnos",
        id: "students",
        accessorFn: (row) => row.students.length,
        cell: (props) => <p className="text-right pr-2">{props.cell.getValue()}</p>
      }
    ];
  }, [])

  return (
    <>
      <SimpleTable 
        columns={columns}
        data={subjects}
      />
    </>
  )
}

export default Subject