import { useEffect } from "react";

export const Alert = ({message, type, onDismiss}) =>{
    const alertStyles = {
        success: 'bg-green-100 text-green-800 border-green-400',
        error: 'bg-red-100 text-red-800 border-red-400',
      };
    useEffect(() => {
        const timer = setTimeout(() => {onDismiss();}, 5000);
        return () => clearTimeout(timer);
    }, [message, type, onDismiss]);
     return(
        <div role="alert" className={` border px-4 py-3 relative ${alertStyles[type]}`}>
        <span className="block sm:inline">{message}</span>
      </div>
    )
}

export default Alert