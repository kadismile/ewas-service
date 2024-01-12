import { useState, useEffect } from "react"
import { PageLoader } from "../components/elements/spinners"
import { store } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { reportService } from "../services/reporterService";
import moment from "moment";

export const Resources = () => {
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
              <div className="banner-hero banner-image-single"><img src="/images/resource-banner.jpg" alt="jobbox" /></div>
              <div className="box-company-profile">
              </div>
            </div>
          </section>
          
          <section className="section-box mt-5">
            <div className="section-box wow animate__animated animate__fadeIn">
              <div className="container">
                <div className="text-start">
                  <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Our Resources & Materials</h2>
                  <div className="border-bottom pt-10 pb-10" />
                </div>
                <div className="mt-50">
                  <div className="tab-content" id="myTabContent-1">
                    <div className="tab-pane fade show active" id="tab-job-1" role="tabpanel" aria-labelledby="tab-job-1">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="card-grid-2 grid-bd-16 hover-up">
                            <div className="card-grid-2-image"><span className="lbl-hot bg-green"><span>Freelancer</span></span>
                              <div className="image-box">
                                <figure><img src="images/img1.png" alt="jobBox" /></figure>
                              </div>
                            </div>
                            <div className="card-block-info">
                              <h5><a href="job-details.html">Herders and farmers Clashes in Nigeria</a></h5>
                              <div className="card-2-bottom mt-20">
                                <div className="row">
                                  
                                </div>
                              </div>
                              <p className="font-sm color-text-paragraph mt-20">
                                The struggle between herders and farmers in Nigeria over farmland and pasture is a serious and escalating 
                                conflict registering huge casualties and raising tensions particularly in the country’s Middle Belt. 
                                Drought and desertification in the north have forced pastoralist herdsmen to seek grazing lands further 
                                south resulting in competition over resources and clashes with settled farmers
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="card-grid-2 grid-bd-16 hover-up">
                            <div className="card-grid-2-image"><span className="lbl-hot bg-green"><span>Freelancer</span></span>
                              <div className="image-box">
                                <figure><img src="images/img1.png" alt="jobBox" /></figure>
                              </div>
                            </div>
                            <div className="card-block-info">
                              <h5><a href="job-details.html">Herders and farmers Clashes in Nigeria</a></h5>
                              <div className="card-2-bottom mt-20">
                                <div className="row">
                                  
                                </div>
                              </div>
                              <p className="font-sm color-text-paragraph mt-20">
                                The struggle between herders and farmers in Nigeria over farmland and pasture is a serious and escalating 
                                conflict registering huge casualties and raising tensions particularly in the country’s Middle Belt. 
                                Drought and desertification in the north have forced pastoralist herdsmen to seek grazing lands further 
                                south resulting in competition over resources and clashes with settled farmers
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="card-grid-2 grid-bd-16 hover-up">
                            <div className="card-grid-2-image"><span className="lbl-hot bg-green"><span>Freelancer</span></span>
                              <div className="image-box">
                                <figure><img src="images/img1.png" alt="jobBox" /></figure>
                              </div>
                            </div>
                            <div className="card-block-info">
                              <h5><a href="job-details.html">Herders and farmers Clashes in Nigeria</a></h5>
                              <div className="card-2-bottom mt-20">
                                <div className="row">
                                  
                                </div>
                              </div>
                              <p className="font-sm color-text-paragraph mt-20">
                                The struggle between herders and farmers in Nigeria over farmland and pasture is a serious and escalating 
                                conflict registering huge casualties and raising tensions particularly in the country’s Middle Belt. 
                                Drought and desertification in the north have forced pastoralist herdsmen to seek grazing lands further 
                                south resulting in competition over resources and clashes with settled farmers
                              </p>
                            </div>
                          </div>
                        </div>
                                          
                      </div>
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