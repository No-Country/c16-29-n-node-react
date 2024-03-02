import { useCallback, useEffect, useRef } from "react"

const Offcanvas = ({ isOpen, onClose, children, title }) => {
  const offcanvasRef = useRef();
  const handleClick = useCallback((e) => {
    if(isOpen && !offcanvasRef.current.contains(e.target)) {
      onClose();
    }
  }, [])
  useEffect(() => {
      

    if(isOpen){
      setTimeout(() => {
        window.addEventListener("click", handleClick);
      }, 100);
  
      return () => {
        window.removeEventListener("click", handleClick);
      }
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={offcanvasRef}
      className={`fixed w-80 h-screen top-0 right-0 ${isOpen ? "" : "translate-x-full"} duration-500 ease-in-out border-l`}
    >
      <div
        className="w-full h-full flex flex-col bg-white"
      >
        <div className="bg-gradient-to-br from-blue-400 to-purple-400 py-2 px-3 flex justify-between items-center">
          <h3 className="text-lg font-bold text-blue-950">{title}</h3>
          <button className="cursor-pointer" onClick={onClose}>
            <img src="/assets/Close.png" alt="btn-close" />
          </button>
        </div>
        <div className="grow flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}

Offcanvas.Body = function ({ children }){
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="grow p-2 overflow-y-auto"
    >
      { children }
    </div>
  )
}
Offcanvas.Body.displayName = "Offcanvas.Body"

Offcanvas.Footer = ({ onSubmit, onClose, text }) => {
  return (
    <div className="p-3 bg-gray-200 border-t border-gray-300 flex gap-4">
          <button
            className=" px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition duration-300 ease-in-out"
            type="submit"
            onClick={onSubmit}
          >
            {text}
          </button>
          <button
            className=" px-4 py-2 text-purple-600 border border-purple-600 rounded cursor-pointer text-center bg-white"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
  );
}
Offcanvas.Footer.displayName = "Offcanvas.Footer"

export default Offcanvas