import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer/Footer"
import { PageLoader } from "../components/elements/spinners"
import { reportService } from "../services/reportsService.js"
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';

export const Home = (props) => {
  console.log('Props ===============> ', props)
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [coordinates, setCoordinates] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(false);

  setTimeout(() => setLoading(false), 1000)
  const fetchData = () => {
    reportService.getReports().then((res) => {
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
  }, [])

  const prepareCoordinates = (reports) => {
    let coordinates = []
    if (reports.length) {
      for (let report of reports) {
        coordinates.push(report)
      }
    }
    setCoordinates(coordinates)
  }

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="box-content">
          <div className="box-heading">
            <div className="box-title">
              <h3 className="mb-35">Dashboard</h3>
            </div>
            <div className="box-breadcrumb">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    {" "}
                    <a className="icon-home" href="index.html">
                      Admin
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
                      style={{ width: '100%', height: '670px' }}
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
                      <h5>Most Recent  Reports</h5>
                    </div>
                    <div className="panel-body">
                    {
                      reports.map((report, key) => {
                        let number = key + 1;
                        return (
                        <div className="card-style-3 hover-up" key={key}>
                            <div className="card-title" style={{width: '100%'}}> 
                              <span>{number++}. </span> <h6>{report.reportSlug}</h6>
                            </div>
                        </div>
                        )
                      })
                    }
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
