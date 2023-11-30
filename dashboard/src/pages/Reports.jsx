import { useEffect, useState } from "react"
import React from "react"
import { crudService } from "../services/crudService"
import moment from "moment"
import { Link } from "react-router-dom"
import { PageLoader } from "../components/elements/spinners"
import StateDropDown from "../components/elements/NigerianStates"
import LGADropDown from "../components/elements/LGADropDown"
import { IncidentType } from "../components/elements/IncidentTypes"
import { CalendarModal } from "../modals/CalendarModal"
import { ReportFilterDropDown } from "../components/elements/ReportFilterDropDown"

export const Reports = () => {

  const formFields = {
    state: undefined,
    localGovt: undefined,
    incidentType: undefined,
    filterReport: undefined,
    date: '',
    rawDate: '',
  }

  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  })

  const { state, localGovt,incidentType, rawDate, filterReport } = formValues
  const [loading, setLoading] = useState(true)
  const [data, setdata] = useState([])
  const [lga, setLga] = useState(["select a state"])
  const [showModal, setShowModal] = useState(false);

  const fetchData = () => {
    setLoading(true)
    crudService.getReports({state, localGovt, incidentType, filterReport, rawDate}).then((res) => {
      const {
        data: { data },
      } = res
      setdata(data)
      setTimeout(() => setLoading(false), 500)
    })
  }

  useEffect(() => {
    fetchData()
  }, [state, localGovt, incidentType, filterReport, rawDate])

  const handleStateData = (data) => {
    const { value } = data || {}
    const errors = formValues.errors
    setLga(value?.lgas)
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        state: value?.state,
      }
    })
  }

  const handleLgaData = (data) => {
    const { value } = data || {}
    setFormValues((prevState) => {
      return {
        ...prevState,
        localGovt: value,
      }
    })
  }

  const handleDataFromDropDown = (data) => {
    const { value } = data || {}
    setFormValues((prevState) => {
      return {
        ...prevState,
        incidentType: value,
      }
    })
  }

  const handleFilterData = (data) => {
    const { value } = data || {}
    setFormValues((prevState) => {
      return {
        ...prevState,
        filterReport: value,
      }
    })
  }

  const listItems = data.map((report, key) => {
    let number = key + 1
    return (
      <tr key={key}>
        <td>{number++}</td>
        <td>
          <Link to={`/report/${report.reportSlug}`}> {report.reportSlug} </Link>{" "}
        </td>
        <td>
          <Link to={`/report/${report.reportSlug}`}>
            {report.reportTypeId.name}{" "}
          </Link>{" "}
        </td>
        <td>{report.address.state}</td>
        <td>{report.address.localGovt}</td>
        <td>{moment(report.createdAt).format("MMM D, YYYY")}</td>
      </tr>
    )
  })

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const calendarData = (calData = []) => {
    if (Array.isArray(calData)) {
      const formatedDates = calData?.map((date) =>moment(date).format('YYYY-MM-DD'))
      setFormValues((prevState) => {
        return {
          ...prevState,
          date: moment(calData[1]).format('LL'),
          rawDate: formatedDates
        };
      });
    }
  }


  return (
    <>
      <CalendarModal show={showModal} onHide={handleCloseModal} data={calendarData}/>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="box-content">
          <div className="box-heading">
            <div className="box-title">
              <h3 className="mb-35">Report Management</h3>
            </div>
            <div className="box-breadcrumb">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    {" "}
                    <a className="icon-home" href="index.html">
                      Reports
                    </a>
                  </li>
                  <li>
                    <span>Dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12 col-xl-7 col-lg-7">
              <div className="section-box">
                <div className="container">
                  <div className="panel-white">
                    <div className="panel-head">
                      <div className="">
                        <div className="row">
                          <div className="col-xl-4 col-lg-5">
                            <span className="font-sm text-showing color-text-paragraph">
                              Search Bar here 
                            </span>
                          </div>
                          <div className="col-xl-8 col-lg-7 text-lg-end mt-sm-15">
                            <div className="display-flex2">
                            <div
                                className="box-border mr-10"
                                style={{ padding: "0px 0px" }}
                              >
                                <ReportFilterDropDown label={"Filter"} dataToComponent={handleFilterData}/>
                              </div>

                              <div
                                className="box-border mr-10"
                                style={{ padding: "0px 0px" }}
                              >
                                <StateDropDown label={"State"} dataToComponent={handleStateData}/>
                              </div>

                              <div
                                className="box-border mr-10"
                                style={{ padding: "0px 0px" }}
                              >
                                <LGADropDown
                                  label={"LGA"}
                                  lgaData={lga}
                                  dataToComponent={handleLgaData}
                                />
                              </div>

                              <div
                                className="box-border mr-10"
                                style={{ padding: "0px 0px" }}
                              >
                                <IncidentType
                                  label={"Incident Type"}
                                  dataToComponent={handleDataFromDropDown}
                                />
                              </div>

                              
                              <div className="box-border mr-10"
                                style={{ padding: "0px 0px" }}>
                                  <input
                                    className="font-sm color-text-paragraph-2"
                                    name="date"
                                    style={{height: '39px'}}
                                    placeholder="Date"
                                    type="text"
                                    value={formValues.date}
                                    onClick={() => handleShowModal()}
                                  />
                              </div>
            
                              
                              {/* <a
                                href="#/"
                                onClick={fetchData}
                                style={{ marginRight: "10px" }}
                              >
                                <i class="fa-solid fa-magnifying-glass"></i>
                              </a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Report ID</th>
                            <th scope="col">Type</th>
                            <th scope="col">State</th>
                            <th scope="col">Local Govt</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>{listItems}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
