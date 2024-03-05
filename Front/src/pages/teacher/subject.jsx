import { useMemo, useState } from "react";
import { SimpleTable } from "../../components/SimpleTabla"
import { Link } from "react-router-dom";
import mock from "../principal/subjects/mock";

const Subject = () => {
  const [data, setData] = useState(mock);

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
        accessorFn: (row) => row.teachers[0].name,
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
        data={data}
      />
    </>
  )
}

export default Subject