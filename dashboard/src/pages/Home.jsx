import { Footer } from "../components/Footer/Footer";


export const Home = () => {
  return (
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
                      <h3>1568<span className="font-sm status up"><span></span></span>
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
                      <h3>284<span className="font-sm status up"><span></span></span>
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
                      <h3>136<span className="font-sm status up"><span></span></span>
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
                      <h3>985<span className="font-sm status up"><span></span></span>
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
                  <div id="chartdiv" />
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
                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata1.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Robert Fox</h6><span className="job-position">UI/UX Designer</span>
                    </div>
                    <div className="card-location"> <span className="location">Chicago, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>
                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata2.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Cody Fisher</h6><span className="job-position">Network Engineer</span>
                    </div>
                    <div className="card-location"> <span className="location">New York, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>
                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata3.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Jane Cooper</h6><span className="job-position">Content Manager</span>
                    </div>
                    <div className="card-location"> <span className="location">Chicago, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>
                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata4.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Jerome Bell</h6><span className="job-position">Frontend Developer</span>
                    </div>
                    <div className="card-location"> <span className="location">Chicago, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>
                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata5.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Floyd Miles</h6><span className="job-position">NodeJS Dev</span>
                    </div>
                    <div className="card-location"> <span className="location">Chicago, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>

                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata5.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Floyd Miles</h6><span className="job-position">NodeJS Dev</span>
                    </div>
                    <div className="card-location"> <span className="location">Chicago, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>

                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata5.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Floyd Miles</h6><span className="job-position">NodeJS Dev</span>
                    </div>
                    <div className="card-location"> <span className="location">Chicago, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>

                  <div className="card-style-3 hover-up">
                    <div className="card-image online"><img src="/images/avata5.png" alt="jobBox" /></div>
                    <div className="card-title"> 
                      <h6>Floyd Miles</h6><span className="job-position">NodeJS Dev</span>
                    </div>
                    <div className="card-location"> <span className="location">Chicago, US</span></div>
                    <div className="card-rating"><img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <img src="/images/star.svg" alt="jobBox" /> <span className="font-xs color-text-mutted">
                        (65)</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
         
        </div>
      </div>

      

      <Footer />
    </div>
  )
}