import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel, //paguinado
  getSortedRowModel, //ordenamiento
  getFilteredRowModel, //fikter
} from "@tanstack/react-table";
import data from "../assets/MOCK_DATA.json"; // aca viene la infomacion de ejemplo cambiar por la verdadera
import { useState } from "react";
import { PaginatedButtons } from "./PaginatedButtons";

export const SimpleTable = () => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  //en la propiedad Header va lo que se ven en la cabezera de la tabla
  const columns = [
    {
      Header: "Notas ",
      accessorKey: "Nombre Completo",
    },
    {
      Header: "Nombres de paises",
      accessorKey: "Materia Asociada",
    },
    {
      Header: "Estado",
      accessorKey: "Estado",
    },
    {
      Header: "Algo",
      accessorKey: "Acciones",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
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
    <div className="w-[1400px] h-screen flex flex-col items-center lex-wrap">
      <div className=" border-2  border-solid m-4">
        <input
          className=""
          placeholder="Buscar"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className="w-[1353px] h-[349px] border-2 overflow-auto hadow-custom">
        <table className="w-full h-full border-solid rounded border-[#C6D5DB]">
          <thead className="bg-[#DCE5E9]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-3 py-1 text-[#123259] text-xs font-bold font-poppins leading-4 not-italic text-left cursor-pointer"
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
                        className="w-[15.21px]  flex flex-col items-center p-0 px-4 gap-[3px]"
                        style={{ marginLeft: "auto" }}
                      >
                        <button>
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
                        </button>
                        <button>
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
                        </button>
                      </div>
                    </div>
                  </th>
                ))}

                {/* aca van los <th> para los botones del rol Profesor*/}

                {/* <th className="px-3 py-1 text-[#123259] text-xs font-bold font-poppins leading-4 not-italic text-left cursor-pointer">
                  Acciones
                </th>
                <div
                  className="w-[15.21px]  flex flex-col items-center pt-3 p-0 px-4 gap-[3px]"
                  style={{ marginLeft: "auto" }}
                >
                  <button>
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
                  </button>
                  <button>
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
                  </button>                  
                </div> */}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  className="px-3 py-1 text-[#4D5862] text-[16px] font-poppins not-italic font-normal leading-6 text-left bg-[#FFFFFD] whitespace-normal overflow-y-auto"
                  colSpan={table.visibleColumns.length}
                >
                  Sin datos
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
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

                {/* aca van los <td> para los botones del rol Profesor*/}

                {/* <td className="px-3 py-1 flex justify-end gap-2.5 bg-[#FFFFFD] whitespace-normal max-w-[200px] overflow-y-auto">
                  <button>
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group">
                        <path
                          id="Vector"
                          d="M13.475 3.60799L15.592 5.72499M14.836 1.74299L9.109 7.46999C8.81309 7.76549 8.61128 8.14198 8.529 8.55199L8 11.2L10.648 10.67C11.058 10.588 11.434 10.387 11.73 10.091L17.457 4.36399C17.6291 4.19189 17.7656 3.98759 17.8588 3.76273C17.9519 3.53787 17.9998 3.29687 17.9998 3.05349C17.9998 2.81011 17.9519 2.56911 17.8588 2.34425C17.7656 2.1194 17.6291 1.91509 17.457 1.74299C17.2849 1.57089 17.0806 1.43438 16.8557 1.34124C16.6309 1.2481 16.3899 1.20016 16.1465 1.20016C15.9031 1.20016 15.6621 1.2481 15.4373 1.34124C15.2124 1.43438 15.0081 1.57089 14.836 1.74299Z"
                          stroke="#1490FC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M16 13.2V16.2C16 16.7304 15.7893 17.2391 15.4142 17.6142C15.0391 17.9893 14.5304 18.2 14 18.2H3C2.46957 18.2 1.96086 17.9893 1.58579 17.6142C1.21071 17.2391 1 16.7304 1 16.2V5.2C1 4.66956 1.21071 4.16086 1.58579 3.78578C1.96086 3.41071 2.46957 3.2 3 3.2H6"
                          stroke="#1490FC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </button>
                  <button>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icon/deactivate">
                        <path
                          id="Vector"
                          d="M11.9997 3.2C11.6271 3.2 11.2697 3.34693 11.0063 3.60848C10.7428 3.87003 10.5948 4.22476 10.5948 4.59464V11.5679C10.5948 11.9378 10.7428 12.2925 11.0063 12.554C11.2697 12.8156 11.6271 12.9625 11.9997 12.9625C12.3722 12.9625 12.7296 12.8156 12.9931 12.554C13.2565 12.2925 13.4045 11.9378 13.4045 11.5679V4.59464C13.4045 4.22476 13.2565 3.87003 12.9931 3.60848C12.7296 3.34693 12.3722 3.2 11.9997 3.2ZM6.973 5.00885C6.77035 5.03427 6.5795 5.11761 6.42369 5.24873C5.35536 6.08482 4.49213 7.15073 3.89908 8.36613C3.30602 9.58153 2.99861 10.9147 3 12.2652C3 17.1869 7.04043 21.2 11.9997 21.2C16.9589 21.2 21 17.1869 21 12.2652C21 9.425 19.664 6.88395 17.5756 5.24803C17.4675 5.16218 17.3434 5.09831 17.2104 5.06007C17.0775 5.02183 16.9382 5.00996 16.8006 5.02514C16.663 5.04033 16.5298 5.08227 16.4085 5.14857C16.2872 5.21487 16.1803 5.30423 16.0938 5.41156C16.0073 5.51888 15.943 5.64206 15.9045 5.77407C15.8659 5.90608 15.854 6.04433 15.8693 6.18093C15.8846 6.31752 15.9268 6.44979 15.9936 6.57017C16.0604 6.69056 16.1504 6.79671 16.2585 6.88256C17.08 7.52276 17.744 8.34004 18.2004 9.27256C18.6567 10.2051 18.8935 11.2284 18.8927 12.2652C18.8949 13.1644 18.7181 14.0552 18.3725 14.8864C18.0269 15.7177 17.5192 16.4729 16.8787 17.1087C16.2382 17.7446 15.4774 18.2485 14.6401 18.5916C13.8028 18.9347 12.9055 19.1102 11.9997 19.108C11.0938 19.1102 10.1965 18.9347 9.35917 18.5916C8.52187 18.2485 7.7611 17.7446 7.12058 17.1087C6.48006 16.4729 5.97241 15.7177 5.62679 14.8864C5.28117 14.0552 5.1044 13.1644 5.10662 12.2652C5.10603 11.2285 5.34286 10.2052 5.7992 9.2727C6.25555 8.3402 6.91946 7.5229 7.74076 6.88256C7.92679 6.74385 8.06133 6.54793 8.12342 6.32534C8.1855 6.10276 8.17163 5.86604 8.08397 5.6521C7.99631 5.43816 7.83978 5.25905 7.63882 5.14269C7.43785 5.02633 7.20374 4.97927 6.973 5.00885Z"
                          fill="#F8453B"
                        />
                      </g>
                    </svg>
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginatedButtons table={table} />
    </div>
  );
};
