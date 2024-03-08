import Select from 'react-select';
import Offcanvas from '../ui/offcanvas'
import Label from '../Label';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../../store/slice/principal-subject-slice";

const AssignStudents = ({ onClose, onSubmit }) => {
  const allStudents = useSelector((state) => state.principalSubject.allStudents);
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch]);

  const handleSelectOne = (option) => {
    setSelecteds((selecteds) => selecteds.concat(option));
  }

  const handleDeselectOne = (option) => {
    setSelecteds((selecteds) => selecteds.filter((selected) => selected !== option));
  }

  const handleSubmit = () => {
    onSubmit(selecteds);
  }

  return (
    <>
      <Offcanvas.Body>
        <Label htmlFor="associated-students">Alumnos Asociados</Label>
        <Select
          id="associated-students"
          options={allStudents.filter((selected) => !selecteds.includes(selected))}
          onChange={handleSelectOne}
          isMulti
          value={null}
        ></Select>
        <ul className='flex flex-col gap-1 mt-2'>
          {
            selecteds.map((selected) => (
              <li 
                key={selected.value}
                className='bg-[#DCE5E9] px-2 rounded flex justify-between cursor-pointer'
                onClick={() => handleDeselectOne(selected)}
              > 
                {selected.label}
                <img src="/assets/cross.svg" />
              </li>
            ))
          }
        </ul>
      </Offcanvas.Body>
      <Offcanvas.Footer 
        text={"Asignar"}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </>
  )
}

export default AssignStudents