import { useState } from "react";
import Select from 'react-select';


export default function BooleanDropDown ({ label, dataToComponent }) {
  const [selectedOption, setSelectedOption] = useState('No');

  const handleClick = async (data) => {
    const { value } = data
    setSelectedOption(value)
    dataToComponent({label, value})
  }

  const options = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
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
        isSearchable={ false }
        styles={customStyles}
        defaultValue={{ label, value: selectedOption }}
        onChange={ handleClick }
        options={ options }
        
    />
  );
};
