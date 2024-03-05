import { useState } from "react";
import { SimpleTable } from "../components/SimpleTabla";
import SelectWithFilters from "../components/SelectWithFilters";

const data = [
  { value: "ocean", label: "Matematica", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Lengua", color: "#0052CC", isDisabled: false },
  { value: "purple", label: "Ciencias Sociales", color: "#5243AA" },
  {
    value: "red",
    label: "Ciencias Naturales",
    color: "#FF5630",
    isFixed: true,
  },
  { value: "orange", label: "Musica", color: "#FF8B00" },
  { value: "yellow", label: "Educacion Fisica", color: "#FFC400" },
  { value: "green", label: "Historia", color: "#36B37E" },
  { value: "forest", label: "Geografia", color: "#00875A" },
  { value: "slate", label: "Economia", color: "#253858" },
  { value: "silver", label: "Contabilidad", color: "#666666" },
];

export const Tutor = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activatorSelectwithfilters, setActivatorSelectwithfilters] = useState(null);

  const handlerSelectwithfilters = () => {
    setActivatorSelectwithfilters(!activatorSelectwithfilters)
  }

  const handleClick = (index) => {
    setSelectedItem(index);
  };
  return (
    // w-[1440px]
    <div className="w-full h-[1024px] relative bg-slate-100">
      <div className=" pt-[12px] pl-[66px] text-blue-950 text-3xl font-medium font-[Poppins] leading-[37.50px] flex flex-col gap-y-[4px]">
        <h2>Notificaciones</h2>
        <span className="text-black text-xs font-normal font-[Poppins] leading-[15px]">
          x registro
        </span>
        <div className="flex items-center gap-x-[12px]">
          <div className="w-[244px] h-9 px-3 py-1.5 bg-white rounded border border-slate-300 justify-between items-center inline-flex">
            <div className="grow shrink basis-0 text-neutral-400 text-base font-normal font-['Poppins'] leading-normal">
              Buscar
            </div>
            <div className="w-6 h-6 relative" />
          </div>
          <div className="w-[100px] h-[26px] p-1 bg-sky-100 rounded justify-start items-center gap-2 inline-flex" onClick={handlerSelectwithfilters}>
             {activatorSelectwithfilters && <SelectWithFilters data={data} />}              
            <div className="justify-start items-center flex flex-row">
              <div className="text-blue-700 text-sm font-medium font-[Poppins] leading-[17.50px]">
                Alumno
              </div>
              <div className="w-2 h-2 relative" />
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="icon/down">
                  <path
                    id="Vector"
                    d="M4 6.4L0 2.13333H8L4 6.4Z"
                    fill="#778899"
                  />
                </g>
              </svg>
            </div>
            <div className="w-3 h-3 relative" />
            <select className="outline-none bg-transparent border-none appearance-none">
            </select>
          </div>
          <div className="w-[79px] h-[26px] p-1 justify-start items-center gap-2 inline-flex">
            <div className="justify-start items-center flex flex-row">
              <div className="text-blue-700 text-sm font-medium font-['Poppins'] leading-[17.50px]">
                Materia
              </div>
              <div className="w-2 h-2 relative" />
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="icon/down">
                  <path
                    id="Vector"
                    d="M4 6.4L0 2.13333H8L4 6.4Z"
                    fill="#778899"
                  />
                </g>
              </svg>
            </div>
          </div>

          {selectedItem === 1 && (
            <div className="w-[79px] h-[26px] p-1 justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center flex flex flex-row">
                <div className="text-blue-700 text-sm font-medium font-['Poppins'] leading-[17.50px]">
                  Estado
                </div>
                <div className="w-2 h-2 relative" />
                <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="icon/down">
                  <path
                    id="Vector"
                    d="M4 6.4L0 2.13333H8L4 6.4Z"
                    fill="#778899"
                  />
                </g>
              </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border-b-2 w-[1354px] h-[26px] justify-start items-end inline-flex ml-[66px] mt-9">
          <div
            className={`h-[26px] px-2 py-1 rounded-tl rounded-tr shadow-inner border border-slate-300 justify-start items-center gap-2.5 flex cursor-pointer ${
              selectedItem === 0
                ? "bg-purple-600 border-l border-r border-t border-slate-400 font-medium"
                : "bg-zinc-200"
            }`}
            onClick={() => handleClick(0)}
          >
            <div
              className={`text-sm font-normal font-['Poppins'] leading-[17.50px] ${
                selectedItem === 0 ? "text-white" : "text-gray-700"
              }`}
            >
              Notas
            </div>
          </div>
          <div
            className={`h-[26px] px-2 py-1 rounded-tl rounded-tr shadow-inner border border-slate-300 justify-start items-center gap-2.5 flex cursor-pointer ${
              selectedItem === 1
                ? "bg-purple-600 border-l border-r border-t border-slate-400 font-medium"
                : "bg-zinc-200"
            }`}
            onClick={() => handleClick(1)}
          >
            <div
              className={`text-sm font-normal font-['Poppins'] leading-[17.50px] ${
                selectedItem === 1 ? "text-white" : "text-gray-700"
              }`}
            >
              Asistencias
            </div>
          </div>
          <div
            className={`h-[26px] px-2 py-1 rounded-tl rounded-tr shadow-inner border border-slate-300 justify-start items-center gap-2.5 flex cursor-pointer ${
              selectedItem === 2
                ? "bg-purple-600 border-l border-r border-t border-slate-400 font-medium"
                : "bg-zinc-200"
            }`}
            onClick={() => handleClick(2)}
          >
            <div
              className={`text-sm font-normal font-['Poppins'] leading-[17.50px] ${
                selectedItem === 2 ? "text-white" : "text-gray-700"
              }`}
            >
              Amonestaciones
            </div>
          </div>
          <div
            className={`h-[26px] px-2 py-1 rounded-tl rounded-tr shadow-inner border border-slate-300 justify-start items-center gap-2.5 flex cursor-pointer ${
              selectedItem === 3
                ? "bg-purple-600 border-l border-r border-t border-slate-400 font-medium"
                : "bg-zinc-200"
            }`}
            onClick={() => handleClick(3)}
          >
            <div
              className={`text-sm font-normal font-['Poppins'] leading-[17.50px] ${
                selectedItem === 3 ? "text-white" : "text-gray-700"
              }`}
            >
              Anotaciones
            </div>
          </div>
        </div>
        <div className="w-[1353px] left-[66px] top-[180px] absolute rounded shadow border-2 border-slate-300 justify-start items-start inline-flex">
          <SimpleTable />
        </div>
      </div>
    </div>
  );
};
