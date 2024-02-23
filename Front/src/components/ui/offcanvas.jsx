const Offcanvas = ({ isOpen, onClose, children, title }) => {
  return (
    <div
      className={`fixed w-80 h-screen top-0 right-0 ${isOpen ? "" : "translate-x-full"} duration-500 ease-in-out border-l`}
    >
      <div
        className="w-full h-full flex flex-col bg-white"
      >
        <div className="bg-gradient-to-br from-blue-400 to-purple-600 py-2 px-3 flex justify-between items-center">
          <h3 className="text-lg font-bold text-blue-950">{title}</h3>
          <button className="cursor-pointer" onClick={onClose}>
            <img src="/assets/Close.png" alt="btn-close" />
          </button>
        </div>
        <div className="grow">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Offcanvas