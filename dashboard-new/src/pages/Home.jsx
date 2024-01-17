import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer/Footer"
import { PageLoader } from "../components/elements/spinners"
import StateDropDown from "../components/elements/NigerianStates"
import LGADropDown from "../components/elements/LGADropDown"
import { IncidentType } from "../components/elements/IncidentTypes"
import moment from "moment"
import { CalendarModal } from "../modals/CalendarModal"
import { reportService } from "../services/reportsService.js"
import { crudService } from "../services/crudService"
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { LineChart } from "../components/charts/LineChart.jsx";
import { VerticalBarChart } from "../components/charts/VerticalBarChat.jsx";

export const Home = (props) => {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [coordinates, setCoordinates] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(false);
  const formFields = {
    state: undefined,
    localGovt: undefined,
    incidentType: undefined,
    date: '',
    rawDate: '',
  }

  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  })
  const { state, localGovt,incidentType, rawDate } = formValues
  const [lga, setLga] = useState(["select a state"])
  const [showModal, setShowModal] = useState(false);


  const fetchData = () => {
    const { state, localGovt,incidentType, rawDate } = formValues
    setLoading(true)
    crudService.getReports({state, localGovt,incidentType, rawDate}).then((res) => {
      const {
        data: { data },
      } = res
      setReports(data)
      prepareCoordinates(data)
      setTimeout(() => setLoading(false), 500)
    })
  }

  useEffect(() => {
    fetchData()
  }, [state, localGovt, incidentType, rawDate])

  const prepareCoordinates = (reports) => {
    let coordinates = []
    if (reports.length) {
      for (let report of reports) {
        coordinates.push(report)
      }
    }
    setCoordinates(coordinates)
  }

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
          <div className="panel-head">
            <div className="">
              <div className="row">
                <div className="col-xl-6 col-lg-5">
                  <span className="font-sm text-showing color-text-paragraph">
                  </span>
                </div>
                <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
                  <div className="display-flex2">
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
          <div className="row">
            <div className="col-xxl-12 col-xl-7 col-lg-7">

              <div className="section-box">
                <div className="row">
                  <div className="col-xxl-2 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                    <div className="card-style-1 hover-up">
                      <div className="card-image">
                        {" "}
                        <img src="/images/computer.svg" alt="jobBox" />
                      </div>
                      <div className="card-info">
                        <div className="card-title">
                          <h3>
                            {reports.length}
                            <span className="font-sm status up">
                              <span></span>
                            </span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">Total Reports</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                    <div className="card-style-1 hover-up">
                      <div className="card-image">
                        {" "}
                        <img src="/images/bank.svg" alt="jobBox" />
                      </div>
                      <div className="card-info">
                        <div className="card-title">
                          <h3>
                            0
                            <span className="font-sm status up">
                              <span></span>
                            </span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">
                          Total Incidents
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                    <div className="card-style-1 hover-up">
                      <div className="card-image"> <img src="/images/lamp.svg" alt="jobBox" /></div>
                      <div className="card-info"> 
                        <div className="card-title">
                          <h3>0<span className="font-sm status up"><span></span></span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">Total Conflicts</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                    <div className="card-style-1 hover-up">
                      <div className="card-image"> <img src="/images/headphone.svg" alt="jobBox" /></div>
                      <div className="card-info"> 
                        <div className="card-title">
                          <h3>0<span className="font-sm status up"><span></span></span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">Total Resolved</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                    <div className="card-style-1 hover-up">
                      <div className="card-image"> <img src="/images/look.svg" alt="jobBox" /></div>
                      <div className="card-info"> 
                        <div className="card-title">
                          <h3>0<span className="font-sm status up"><span></span></span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">Total Un Resolved</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                    <div className="card-style-1 hover-up">
                      <div className="card-image"> <img src="/images/doc.svg" alt="jobBox" /></div>
                      <div className="card-info"> 
                        <div className="card-title">
                          <h3>0<span className="font-sm status up"><span></span></span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">Total False Report</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-6 col-xl-5 col-lg-5">
            <div className="section-box">
                <div className="container">
                  <div className="panel-white">
                    <div className="panel-head">
                      <h5>Map Statistics</h5>
                      <a className="menudrop" id="dropdownMenu2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" />
                      <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenu2">
                        <li><a className="dropdown-item active" href="#">Add new</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Actions</a></li>
                      </ul>
                    </div>
                    <div className="panel-body">
                    <ReactMapGL
                      mapboxAccessToken={process.env.REACT_APP_MAP_BOX_KEY}
                      mapLib={import('mapbox-gl')}
                      initialViewState={{
                        longitude: 9.0820,
                        latitude: 8.6753,
                        zoom: 5.5
                      }}
                      style={{ width: '100%', height: '700px' }}
                      mapStyle="mapbox://styles/mapbox/light-v11"
                    >
                    {reports.map((report, index) => (
                      <div key={index}>
                        <Marker
                          longitude={Number(report.address.longitude)}
                          latitude={Number(report.address.latitude)}
                          anchor={"bottom-left"}
                          offsetLeft={-25} // very important 
                          offsetTop={50} // very important 
                        >
                          <div className="marker">
                            <img onClick={() => { setSelectedMarker(report) }} src="images/map-icon2.png" style={{ width: '8%' }} alt='dot' />
                          </div>
                        </Marker>
                        { selectedMarker && (
                          <Popup
                            latitude={Number(selectedMarker.address.latitude)}
                            longitude={Number(selectedMarker.address.longitude)}
                            closeOnClick={false}
                            onClose={() => {
                              setSelectedMarker(false);
                            }}
                          >
                            <div>
                            <Link to={`/report/${selectedMarker.reportSlug}`}>
                              <h6>{selectedMarker.address.state}</h6>
                              <p> {selectedMarker.reportTypeId.name}</p>
                            </Link>
                            </div>
                          </Popup>
                        )}
                      </div>
                      ))
                    }
                    <NavigationControl />
                  </ReactMapGL>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xxl-6 col-xl-5 col-lg-5">
              <div className="section-box">
                <div className="container"> 
                  <div className="panel-white">
                    <div className="panel-head"> 
                      <h5>Reports</h5>
                    </div>
                    <div className="panel-body" style={{height: '725px'}}>
                      <LineChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>



          <div className="row">
            <div className="col-xxl-12 col-xl-5 col-lg-5">
              <div className="section-box">
                <div className="container"> 
                  <div className="panel-white">
                    <div className="panel-head"> 
                      <h5>Reports</h5>
                    </div>
                    <div className="panel-body" style={{height: '725px'}}>
                      <VerticalBarChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <Footer />
        </div>
      )}
    </>
  )
}
