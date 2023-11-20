'use client'
import { useEffect, useState } from "react";
import Select from 'react-select';
import NaijaStates from 'naija-state-local-government';
import { useDispatch } from "react-redux";
import { setSearchParams } from "../../redux/user-slice";
import { store } from '../../redux/store';


export default function StateDropDown ({ label, dataToComponent }) {
  let user = store?.getState()?.user?.user
  let userState
  if (user) {
    userState = user.searchParams?.state
  }

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('other');
  const [state, setState] = useState([])

  const handleClick = async (data) => {
    const { value, label } = data || {};
    setSelectedOption(value)
    dispatch(setSearchParams({ state: label }));
    dataToComponent({ label, value })
  }

  useEffect(() => {
    (async () => {
      setState(NaijaStates.all())
    })();
  }, []);

  const options = () => {
    return state.map((data) => {
      return {
        value: data,
        label: data.state
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
          label: userState ? userState : label, 
          value: selectedOption 
        }}
        onChange={ handleClick }
        options={ options() }
        className={'select-react'}
        isClearable={true}
    />
  );
};
