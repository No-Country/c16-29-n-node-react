import { useRef } from "react"

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  const handleClose = (e) => {
    if(e.target === modalRef.current){
      onClose();
    }
  }

  if(!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 right-0 w-screen h-screen bg-gray-700/20 z-50 flex justify-center items-center"
      ref={modalRef}
      onClick={handleClose}
    >
      {children}
    </div>
  )
}

export default Modal