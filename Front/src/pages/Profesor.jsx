import { useCallback, useState, useEffect } from "react"
import  OffCanvas  from "../components/OffCanvas"
import profesorFields from "../config/profesorFields"
import { colourOptions } from "../utils/data";
import { setSelectedOptions, clearSelectedOptions } from '../actions/actions';
import { useDispatch } from 'react-redux';
import Alert from "../components/Alert";
export const Profesor = () => {
  const [alert, setAlert] = useState({ message: '', type: '' });

  const dispatch =useDispatch()

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  {/*const [materiasOptions, setMateriasOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('http://localhost:3000/materias')
      .then(response => {
        setMateriasOptions(response.data);
      })
      .catch(error => console.error(error));
  }, []);*/}
  const handleCreateProfesor = () => {
    dispatch(setSelectedOptions([]))
    setCurrentForm({
      actionType: 'crearProfesor',
      title: 'Crear Profesor',
      fields: profesorFields(colourOptions), //se cambia colourOptions por el const materiasOptions
      onSubmit: (formData) => {
        //dispatch
        setTimeout(() => {
          setAlert({ message: "1 Profesor registrado con éxito.", type: "success" });
          setShowOffCanvas(false);
        })
      },
    }); setShowOffCanvas(true)}

    const handleCloseForm = useCallback(() =>{
      setShowOffCanvas(false);
    },[]);
  
  return (
    <div className="w-full h-full ">
    <div className="p-5">
    <h1 className="text-3xl font-medium font-poppins  text-[#123259]">Profesores</h1>
               <button className='px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition duration-300 ease-in-out m-4' onClick={handleCreateProfesor}>
               Crear Profesor
               </button>

     </div>
            {alert.message && (
              <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
        <div className=" p-4 rounded w-auto ">
          <Alert
            type={alert.type}
            message={alert.message}
            onDismiss={() => setAlert({ message: '', type: '' })}
          />
          </div>
          </div>
        )}
     {showOffCanvas && (
       <OffCanvas
         title={currentForm.title}
         actionType={currentForm.actionType}
         onSubmit={currentForm.onSubmit}
         fields={currentForm.fields}
         handleCloseForm={handleCloseForm}
       />
     )}
   </div>
    );
  };