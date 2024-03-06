import Select from 'react-select';
import Offcanvas from '../ui/offcanvas'
import Label from '../Label';
import { useEffect, useState } from 'react';
import { students } from '../../pages/principal/subjects/mock';

const AssignSubject = ({ onClose, onSubmit, assigneds }) => {
  const [data, setData] = useState(() => students.map((student) => ({
    value: student.id,
    label: student.name
  })));
  const [selecteds, setSelecteds] = useState([]);

  useEffect(() => {
    const filtered = students.filter((currentStudent) => {
      return !assigneds.some(({id}) => currentStudent.id === id)
    });
    setData(filtered.map((student) => ({
      value: student.id,
      label: student.name
    })));
  }, [assigneds]);

  const handleSelectOne = (option) => {
    setSelecteds((selecteds) => selecteds.concat(option));
  }

  const handleDeselectOne = (option) => {
    setSelecteds((selecteds) => selecteds.filter((selected) => selected !== option));
  }

  const handleSubmit = () => {
    onSubmit(selecteds);
    onClose();
  }

  return (
    <>
      <Offcanvas.Body>
        <Label htmlFor="associated-students">Alumnos Asociados</Label>
        <Select
          id="associated-students"
          options={data.filter((selected) => !selecteds.includes(selected))}
          onChange={handleSelectOne}
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

export default AssignSubject