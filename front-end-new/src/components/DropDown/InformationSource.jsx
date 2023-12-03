import { useState } from "react";
import Select from 'react-select';


export default function InformationSource ({ label, dataToComponent }) {
  const [selectedOption, setSelectedOption] = useState('No');

  const handleClick = async (data) => {
    const { value } = data
    setSelectedOption(value)
    dataToComponent({label, value})
  }

  const options = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Whatsapp', label: 'Whatsapp' },
    { value: 'Eye witness', label: 'Eye witness' },
    { value: 'Website Link', label: 'Website Link' },
  ];

  const customStyles = {
    input: (provided) => ({
      ...provided,
      width: 100,
      height: 38,
      display: 'flex',
      alignItems: 'center',
    }),
    singleValue: (provided) => ({
      ...provided,
      marginTop: 2,
    }),
  };
  
  return (
    <Select
        styles={customStyles}
        defaultValue={{ label, value: selectedOption }}
        onChange={ handleClick }
        options={ options }
    />
  );
};
