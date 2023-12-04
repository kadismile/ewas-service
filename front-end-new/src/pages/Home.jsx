import ReportDialogModal from '../components/Modals/ReportDialogModal';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { PageLoader } from '../components/elements/spinners';
export const Home = ()=> {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  })

  return (
    <>
    { loading ? <PageLoader /> : 
    
      <main className="main">
          <section className="section-box d-block d-sm-none">
              <div className="breacrumb-cover bg-img-home">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                
                      <p className="font-lg color-text-paragraph-2">
                        
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </section>

          <section className="section-box mb-70">
            <div className="banner-hero hero-1 banner-homepage5">
              <div className="banner-inner">
                <div className="row">
                  <div className="col-xl-7 col-lg-12">
                    <div className="block-banner">
                      <h1 className="heading-banner wow animate__animated animate__fadeInUp">Report that &nbsp;<br className="d-none d-lg-block" />Incident.</h1>
                      <div className="banner-description mt-20 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                      Help save millions of lives and properties by reporting incidents and conflicts as soon as you notice them, right before they escalate. Join us in saving lives across Nigeria. </div>
                      <div className="mt-30"> 

                    {/*   <Link to='/report' className="btn btn-default mr-15"> REPORT INCIDENCT </Link> */}
                    <a onClick={handleShowModal} className="btn btn-default mr-15">REPORT INCIDENCT</a>
                    <ReportDialogModal show={showModal} onHide={handleCloseModal} />
                      </div>
                      <div className="mt-50 mb-20"><span className="font-md color-text-paragraph-2">Partner Agency</span></div>
                      <div className="box-logos-485">
                        <div className="box-swiper">
                          <div className="swiper-container swiper-group-4-banner swiper">
                            <div className="swiper-wrapper">
                              <div className="swiper-slide"><a href="#"><img src="images/agency/T2.png" alt="jobBox" /></a></div>
                              <div className="swiper-slide"><a href="#"><img src="images/agency/T3.png" alt="jobBox" /></a></div>
                              <div className="swiper-slide"><a href="#"><img src="images/agency/T4.png" alt="jobBox" /></a></div>
                          {/*     <div className="swiper-slide"><a href="#"><img src="fonts/sony.svg" alt="jobBox" /></a></div>
                              <div className="swiper-slide"><a href="#"><img src="fonts/acer.svg" alt="jobBox" /></a></div>
                              <div className="swiper-slide"><a href="#"><img src="fonts/nokia.svg" alt="jobBox" /></a></div>
                              <div className="swiper-slide"><a href="#"><img src="fonts/asus.svg" alt="jobBox" /></a></div>
                              <div className="swiper-slide"><a href="#"><img src="fonts/casio.svg" alt="jobBox" /></a></div>
                              <div className="swiper-slide"><a href="#"><img src="fonts/dell.svg" alt="jobBox" /></a></div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-12 d-none d-xl-block col-md-6">
                    <div className="banner-imgs">
                      <div className="banner-1 shape-1"><img className="img-responsive" alt="jobBox" src="images/slider/356by356.png" /></div>
                      <div className="banner-2 shape-2"><img className="img-responsive" alt="jobBox" src="images/slider/ed1.png" /></div>
                      <div className="banner-3 shape-3"><img className="img-responsive" alt="jobBox" src="images/slider/165 c.png" /></div>
                      <div className="banner-4 shape-3"><img className="img-responsive" alt="jobBox" src="images/slider/145 B.png" /></div>
                      <div className="banner-5 shape-2"><img className="img-responsive" alt="jobBox" src="images/slider/131 by 131.png" /></div>
                      <div className="banner-6 shape-1"><img className="img-responsive" alt="jobBox" src="images/slider/120 by 120.png" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-box mt-5">
            <div className="section-box wow animate__animated animate__fadeIn">
              <div className="container">
                <div className="text-start">
                  <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Latest Incidence and Indicators Article</h2>
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
                      <div className="text-center mt-10"><a className="btn btn-brand-1 btn-icon-more hover-up">See more </a></div>
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