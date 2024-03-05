import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel, //paguinado
  getSortedRowModel, //ordenamiento
  getFilteredRowModel,
} from "@tanstack/react-table";
// import data from "../assets/MOCK_DATA.json"; // aca viene la infomacion de ejemplo cambiar por la verdadera
import { useEffect, useState } from "react";
import { PaginatedButtons } from "./PaginatedButtons";
import Input from "./Input";
import searchIcon from '../../../UI-UX/Iconografía/search.svg';

export const SimpleTable = ({ columns, data, actions, onSelect, filters }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  //en la propiedad Header va lo que se ven en la cabezera de la tabla
  // const columns = [
  //   {
  //     Header: "Notas ",
  //     accessorKey: "Nombre Completo",
  //   },
  //   {
  //     Header: "Nombres de paises",
  //     accessorKey: "Materia Asociada",
  //   },
  //   {
  //     Header: "Estado",
  //     accessorKey: "Estado",
  //   },
  //   {
  //     Header: "Algo",
  //     accessorKey: "Acciones",
  //   },
  // ];

  useEffect(() => {
    onSelect?.(rowSelection)
  }, [rowSelection])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    state: {
      rowSelection,
      sorting: sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  // faltantes:
  // 1-font-poppins: la letra no es la misma..
  // 2-no puedo cambiar de color al svg cuando hago click, sin crear un script CSS..
  // 3-los bortones del rol profesor estan hardcodeados.
  // 4-los botones para ordenar alfabeticamente no les pude dar funcion
  // 5- la anchura de las celdas se modifican

  return (
    <div className="grow flex flex-col items-start">
      <div className="w-full my-4 flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <div className="flex border-2 rounded py-2 px-2 has-[:focus]:border-1 has-[:focus]:border-black">
            <Input
              className="focus:outline-none"
              placeholder="Buscar"
              type="text"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
            <img className="cursor-pointer" src={searchIcon} alt="icono buscar" />
          </div>
          {filters}
        </div>
        <div>
          {actions}
        </div>
      </div>
      <div className="w-full  overflow-auto scrollbar grow mb-4">
        <table className="w-full border-solid rounded border-[#C6D5DB] shadow-custom border-2">
          <thead className="bg-[#DCE5E9]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-3 py-1 text-[#123259] text-xs font-bold leading-4 not-italic text-left cursor-pointer"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center ">
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.Header,
                            header.getContext()
                          )}
                          {/* {
                            {
                              asc: "^",
                              desc: "v",
                            }[header.column.getIsSorted() ?? null]
                          } */}
                        </div>
                      )}
                      <div
                        className="w-[15.21px] flex flex-col items-center p-0 px-4 gap-[3px]"
                        style={{ marginLeft: "auto" }}
                      >
                        <button className="flex flex-col gap-1 items-center justify-center">
                          <SortingIcon icon={header.column.getIsSorted()} />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* 
            <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  className="px-3 py-1 text-[#4D5862] text-[16px] font-poppins not-italic font-normal leading-6 text-left bg-[#FFFFFD] whitespace-normal overflow-y-auto"
                  colSpan={table.visibleColumns?.length} // MODIFICACION 1
                >
                  Sin datos
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b-[1px] border-solid border-[#ADADAD]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-1 w-[418px] text-[#4D5862] text-[16px] font-poppins not-italic font-normal leading-6 text-left bg-[#FFFFFD] whitespace-normal overflow-y-auto"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}

                </tr>
              ))
              )}
          </tbody>
           */}
            {table.getRowModel().rows.length === 0
              ? (
                <tr>
                  <td
                    className="px-3 py-1 text-[#4D5862] text-center text-[16px] not-italic font-normal leading-6 bg-[#FFFFFD] whitespace-normal overflow-y-auto"
                    colSpan={table.getVisibleFlatColumns().length}
                  >
                    Sin datos
                  </td>
                </tr>
              )
              : table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b-[1px] border-solid border-[#ADADAD] h-2"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="h-2 px-3 text-[#4D5862] text-[16px] not-italic font-normal leading-6 text-left bg-[#FFFFFD] whitespace-normal overflow-y-auto"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <PaginatedButtons table={table} />
    </div>
  );
};

const SortingIcon = ({ icon }) => {
  if (!icon) {
    return (
      <>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M1.67819 4.6C1.22819 4.6 0.915853 4.39567 0.741186 3.987C0.565853 3.579 0.636519 3.21667 0.953186 2.9L3.55319 0.3C3.65319 0.2 3.76152 0.125001 3.87819 0.0750008C3.99485 0.0250008 4.11985 0 4.25319 0C4.38652 0 4.51152 0.0250008 4.62819 0.0750008C4.74485 0.125001 4.85319 0.2 4.95319 0.3L7.55319 2.9C7.86985 3.21667 7.94052 3.579 7.76519 3.987C7.59052 4.39567 7.27819 4.6 6.82819 4.6H1.67819Z"
            fill="#93939F"
          />
        </svg>
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M3.55319 4.90001L0.953186 2.30001C0.636519 1.98334 0.565853 1.62101 0.741186 1.21301C0.915853 0.804339 1.22819 0.600006 1.67819 0.600006H6.82819C7.27819 0.600006 7.59052 0.804339 7.76519 1.21301C7.94052 1.62101 7.86985 1.98334 7.55319 2.30001L4.95319 4.90001C4.85319 5.00001 4.74485 5.07501 4.62819 5.12501C4.51152 5.17501 4.38652 5.20001 4.25319 5.20001C4.11985 5.20001 3.99485 5.17501 3.87819 5.12501C3.76152 5.07501 3.65319 5.00001 3.55319 4.90001Z"
            fill="#93939F"
          />
        </svg>
      </>
    );
  }

  return (
    icon === "asc"
      ? (
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M3.55319 4.90001L0.953186 2.30001C0.636519 1.98334 0.565853 1.62101 0.741186 1.21301C0.915853 0.804339 1.22819 0.600006 1.67819 0.600006H6.82819C7.27819 0.600006 7.59052 0.804339 7.76519 1.21301C7.94052 1.62101 7.86985 1.98334 7.55319 2.30001L4.95319 4.90001C4.85319 5.00001 4.74485 5.07501 4.62819 5.12501C4.51152 5.17501 4.38652 5.20001 4.25319 5.20001C4.11985 5.20001 3.99485 5.17501 3.87819 5.12501C3.76152 5.07501 3.65319 5.00001 3.55319 4.90001Z"
            fill="#93939F"
          />
        </svg>
      )
      : (
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M1.67819 4.6C1.22819 4.6 0.915853 4.39567 0.741186 3.987C0.565853 3.579 0.636519 3.21667 0.953186 2.9L3.55319 0.3C3.65319 0.2 3.76152 0.125001 3.87819 0.0750008C3.99485 0.0250008 4.11985 0 4.25319 0C4.38652 0 4.51152 0.0250008 4.62819 0.0750008C4.74485 0.125001 4.85319 0.2 4.95319 0.3L7.55319 2.9C7.86985 3.21667 7.94052 3.579 7.76519 3.987C7.59052 4.39567 7.27819 4.6 6.82819 4.6H1.67819Z"
            fill="#93939F"
          />
        </svg>
      )
  )
};
export default SimpleTable;