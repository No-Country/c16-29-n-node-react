
import React from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import chroma from 'chroma-js';


const animatedComponents = makeAnimated();

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: '#EEFAFF' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, '#EEFAFF') > 2
            ? '#EEFAFF'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};


const SelectWithFilters = ({ data, selectedOptions, setSelectedOptions }) => {

  const handleSelectionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };



  return (
    <Select
      components={animatedComponents}
      closeMenuOnSelect={false}
      isMulti
      options={data}
      onChange={handleSelectionChange}
      styles={colourStyles}
      value={selectedOptions}
    />
  );
};

export default SelectWithFilters;



// Ejemplo de formato del array "data", lo que se deberia pasar por props:
// [
//   { value: 'ocean', label: 'Matematica', color: '#00B8D9', isFixed: true },
//   { value: 'blue', label: 'Lengua', color: '#0052CC', isDisabled: false },
//   { value: 'purple', label: 'Ciencias Sociales', color: '#5243AA' },
//   { value: 'red', label: 'Ciencias Naturales', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Musica', color: '#FF8B00' },
//   { value: 'yellow', label: 'Educacion Fisica', color: '#FFC400' },
//   { value: 'green', label: 'Historia', color: '#36B37E' },
//   { value: 'forest', label: 'Geografia', color: '#00875A' },
//   { value: 'slate', label: 'Economia', color: '#253858' },
//   { value: 'silver', label: 'Contabilidad', color: '#666666' },
// ]
