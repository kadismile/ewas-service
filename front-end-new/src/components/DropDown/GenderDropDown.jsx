import { useEffect, useState } from "react";
import Select from 'react-select';

import { reportService } from '../../services/reporterService'


export default function GenderDropDown ({ label, dataToComponent }) {
  const [selectedOption, setSelectedOption] = useState('other');

  const handleClick = async (data) => {
    const { value } = data
    setSelectedOption(value)
    dataToComponent({label, value})
  }

  const options = () => {
    return [
      {
        value: 'Male',
        label: 'Male',
      },
      {
        value: 'Female',
        label: 'Female',
      }
  ]
  }

  const customStyles = {
    control: base => ({
      ...base,
      height: 52,
      minHeight: 52,
    })
  };
  
  return (
    <Select
        isSearchable={ false }
        styles={customStyles}
        defaultValue={{ label, value: selectedOption }}
        onChange={ handleClick }
        options={ options() }
        className={'select-react'}
    />
  );
};
