'use client'
import { useEffect, useState } from "react";
import Select from 'react-select';

import { reportService } from '../../services/reportsService'


export const RespondersDropDown = ({ dataToComponent }) => {
  const [selectedOption, setSelectedOption] = useState('other');
  const [reportTypes, setReportTypes] = useState([])

  const handleClick = async (data) => {
    const { value } = data
    setSelectedOption(value)
    dataToComponent({value})
  }

  useEffect(() => {
    (async () => {
      const res = await reportService.getReportTypes()
      setReportTypes(res.data)
    })();
  }, []);

  const options = () => {
    return reportTypes.map((report) => {
      return {
        value: report._id,
        label: report.name
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
        styles={customStyles}
        defaultValue={{ label: 'Responsders', value: selectedOption }}
        onChange={ handleClick }
        options={ options() }
        className={'select-react'}
    />
  );
};
