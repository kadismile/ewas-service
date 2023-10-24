import {useState, useEffect, useRef} from 'react'
import { Footer } from "../components/Footer/Footer";
import { PageLoader } from "../components/elements/spinners";
import {reportService} from '../services/reportsService.js'
import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1Ijoia2FkaXNtaWxlMSIsImEiOiJjbG8zMTk4MzAwbXkwMmttc21hd2l0a2E0In0.L7hsWeL1L6qBjWINHxBiTg';

export const Home = () => {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])

  setTimeout(() => setLoading(false), 1000)
  const fetchData = () => {
    reportService.getReports().then((res) => {
      const {
        data: { data },
      } = res;
      setReports(data);
      setTimeout(() => setLoading(false), 500)
    });
  }

   useEffect(() => {
    fetchData()
  }, []);


  const ref = useRef(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (ref.current && !map) {
      const map = new mapboxgl.Map({
        container: ref.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [9.0820, 8.6753],
        zoom: 1
      });
      setMap(map);
    }
  }, [ref, map]);

  return (
    <>
      { loading? <PageLoader /> :
        <div className="box-content">
          <div className="box-heading">
            <div className="box-title"> 
              <h3 className="mb-35">Dashboard</h3>
            </div>
            <div className="box-breadcrumb"> 
              <div className="breadcrumbs">
                <ul> 
                  <li> <a className="icon-home" href="index.html">Admin</a></li>
                  <li><span>Dashboard</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row"> 
            <div className="col-xxl-8 col-xl-7 col-lg-7">
              <div className="section-box">
                <div className="row"> 
                  <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6"> 
                    <div className="card-style-1 hover-up">
                      <div className="card-image"> <img src="/images/computer.svg" alt="jobBox" /></div>
                      <div className="card-info"> 
                        <div className="card-title">
                          <h3>{reports.length}<span className="font-sm status up"><span></span></span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">Total Reports</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                    <div className="card-style-1 hover-up">
                      <div className="card-image"> <img src="/images/bank.svg" alt="jobBox" /></div>
                      <div className="card-info"> 
                        <div className="card-title">
                          <h3>0<span className="font-sm status up"><span></span></span>
                          </h3>
                        </div>
                        <p className="color-text-paragraph-2">Total Incidents</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
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
                  <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
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
              <div className="section-box">
                <div className="container"> 
                  <div className="panel-white">
                    <div className="panel-head"> 
                      <h5>Map Statistics</h5><a className="menudrop" id="dropdownMenu2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" />
                      <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenu2">
                        <li><a className="dropdown-item active" href="#">Add new</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Actions</a></li>
                      </ul>
                    </div>
                    <div className="panel-body"> 
                        <div className="map-container" ref={ref} />
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-5">
              <div className="section-box">
                <div className="container"> 
                  <div className="panel-white">
                    <div className="panel-head"> 
                      <h5>Most Recent  Reports</h5><a className="menudrop" id="dropdownMenu4" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" />
                      <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenu4">
                        <li><a className="dropdown-item active" href="#">Add new</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Actions</a></li>
                      </ul>
                    </div>
                    <div className="panel-body">
                    {
                      reports.map((report, key) => {
                        let number = key + 1;
                        return (
                          <div className="card-style-3 hover-up">
                          <div className="card-title" style={{width: '100%'}}> 
                            <span>{number++}. </span> <h7>{report.title}</h7>
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
      }
    </>
    
  )
}