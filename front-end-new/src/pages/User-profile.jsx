import { useState, useEffect } from "react"
import { PageLoader } from "../components/elements/spinners"
import { store } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { reportService } from "../services/reporterService";
import moment from "moment";

export const UserProfile = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(true)

  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }
  const { fullName, email, address, phoneNumber } = user || {}

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
    reportService.getUserReports(user._id)
    .then((data) => {
      setData(data?.data?.data)
    })
  }, [])
  const navigate = useNavigate();

  return (
    <>
      {
        !fullName ? navigate('/') : loading ? <PageLoader /> :
        <main className="main">
          <section className="section-box-2">
            <div className="container">
              <div className="banner-hero banner-image-single"><img src="/images/dashboard.png" alt="jobbox" /></div>
              <div className="box-company-profile">
                <div className="image-compay"><img src="/images/tribal-marks.jpg" alt="jobbox" style={{width: '9%'}}/></div>
                <div className="row mt-10">
                  <div className="col-lg-8 col-md-12">
                    <h5 className="f-18">
                      {fullName} 
                      <span className="card-location font-regular ml-20">{address?.fullAddress}</span>
                      <span className="card-location font-regular ml-20">{phoneNumber}</span>
                      <span className="card-location font-regular ml-20">{email}</span>
                    </h5>
                    
                  </div>
                </div>
              </div>
              
              <div className="border-bottom pt-10 pb-10" />
            </div>
          </section>
          <section className="section-box mt-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="box-related-job content-page">

                    <h3 className="mb-30">Your Report History</h3>

                    <div className="box-list-jobs display-list">
                      {data.length ?
                        data.map((report)=> {
                          return (
                          <div className="col-xl-12 col-12">
                            <div className="card-grid-2 hover-up wow animate__animated animate__fadeIn">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <div className="card-grid-2-image-left">
                                    <div className="right-info"><a className="name-job" href>{report.reportTypeId.name}</a>
                                    <span className="location-small">{report.address.fullAddress}</span>
                                    <span> {moment(report.createdAt).format('ll')} </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          )
                        }) : 'No Reports'
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      }
    </>
  )
}