
import { useEffect, useState } from "react";
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { setSearchParams } from "../../redux/user-slice";
import { store } from '../../redux/store';


export default function LGADropDown ({ label, lgaData, dataToComponent }) {
  let user = store?.getState()?.user?.user
  let lga
  if (user) {
    lga = user.searchParams?.lga
  }

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('other');
  const handleClick = async (data) => {
    const { value, label } = data || {}
    setSelectedOption(value)
    dispatch(setSearchParams({ lga: label }));
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
        defaultValue={{ 
          label: lga ? lga : label, 
          value: selectedOption 
        }}
        onChange={ handleClick }
        options={ options() }
        className={'select-react'}
        isClearable={true}
    />
  );
};
