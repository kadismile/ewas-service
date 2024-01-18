import { useState, useEffect } from "react"
import { PageLoader } from "../components/elements/spinners"
import { store } from '../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import { reportService } from "../services/reporterService";
import moment from "moment";

export const Resources = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }
  const { fullName, email, address, phoneNumber } = user || {}

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
    reportService.getRosources()
    .then((data) => {
      setData(data?.data?.data)
    })
  }, [])
  const navigate = useNavigate();

  return (
    <>
      {
        loading ? <PageLoader /> :
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
                        {
                          data.map((article) => {
                            return (
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                              <div className="card-grid-2 grid-bd-16 hover-up">
                                <div className="card-grid-2-image"><span className="lbl-hot bg-green"><span>Freelancer</span></span>
                                  <div className="image-box">
                                  <Link to={ `/article/${article._id}` } > <figure><img src={article?.attachments[0]?.url} alt="jobBox" /></figure> </Link>
                                  </div>
                                </div>
                                <div className="card-block-info">
                                  <h5> <Link to={ `/article/${article._id}` } >{article.title}</Link></h5>
                                  <div className="card-2-bottom mt-20">
                                    
                                  </div>
                                  <p className="font-sm color-text-paragraph mt-20">
                                    {moment(article.createdAt).format('ll')}
                                  </p>
                                </div>
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
          </section>
        </main>
      }
    </>
  )
}