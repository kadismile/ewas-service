import { useState } from "react";
import Select from 'react-select';


export default function WardDropDown ({ label, wardData, dataToComponent }) {
  const [selectedOption, setSelectedOption] = useState('other');

  const handleClick = async (data) => {
    const { value } = data
    setSelectedOption(value)
    dataToComponent({label, value})
  }


  const options = () => {
    return wardData.map((data) => {
      return {
        value: data.ward,
        label: data.ward
      }
    })
  }

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
      options={ options() }
      className={'select-react'}
    />
  );
};
