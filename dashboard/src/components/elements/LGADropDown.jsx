
import { useEffect, useState } from "react";
import Select from 'react-select';


export default function LGADropDown ({ label, lgaData, dataToComponent }) {
  const [selectedOption, setSelectedOption] = useState('other');
  const handleClick = async (data) => {
    const { value } = data || {}
    setSelectedOption(value)
    dataToComponent({label, value})
  }


  const options = () => {
    return lgaData?.map((lga) => {
      return {
        value: lga,
        label: lga
      }
    })
  }

  const customStyles = {
    input: (provided) => ({
      ...provided,
      width: 100,
      height: 15,
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
        options={ options() }
        className={'select-react'}
        isClearable={true}
    />
  );
};
