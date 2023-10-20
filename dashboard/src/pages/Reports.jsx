import { useEffect, useState } from "react";
import { crudService } from "../services/crudService";
import moment from 'moment';
import { Link } from 'react-router-dom'
import { PageLoader } from "../components/elements/spinners";

export const Reports = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);


  const fetchData = () => {
    crudService.getReports().then((res) => {
      const {
        data: { data },
      } = res;
      setdata(data);
      setTimeout(() => setLoading(false), 500)
    });
  }

   useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
    { loading? <PageLoader /> :
      <div className="box-content">
        <div className="box-heading">
          <div className="box-title"> 
            <h3 className="mb-35">Reports Management</h3>
          </div>
          <div className="box-breadcrumb"> 
            <div className="breadcrumbs">
              <ul> 
                
                <li><span>Reports</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row"> 
          <div className="col-lg-12"> 
            <div className="section-box">
              <div className="container"> 
                <div className="panel-white mb-30">
                  <div className="box-padding">
                    <div className="row mb-30"> 
                      <div className="col-12"> 
                        
                      </div>
                    </div>
                    <div className="row">

                      {
                        data.map((report)=> {
                          return (
                          <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="card-grid-2 hover-up">
                              <div className="card-grid-2-image-left">
                                
                                <div className="card-profile pt-10">
                                {/* <Link to={{ pathname: `/report/${report._id}`, state={{{ data: report }}}> </Link> */}
                                <Link to={`/report/${report._id}`} state={{ report }} className="link"><h5>{report.title}</h5> </Link>
                                    <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                                      <span className="font-xs color-text-mutted">{report.reportTypeId.name}
                                    </span>
                                </div>
                              </div>
                              <div className="card-block-info">
                                
                                <div className="employers-info align-items-center justify-content-center mt-15">
                                  <div className="row">
                                    <div className="col-6"><span className="d-flex align-items-center">
                                      <i class="fa fa-map-pin" aria-hidden="true"></i> &nbsp; &nbsp;
                                      <span className="font-sm color-text-mutted"> {report.address.state}</span>
                                    </span></div>
                                    <div className="col-6">
                                      <span className="d-flex justify-content-end align-items-center">
                                        <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp; &nbsp;
                                        <span className="font-sm color-brand-1"> {moment(report.dateOfIncidence).format('ll')}</span>
                                        </span>
                                    </div>
                                  </div>
                                </div>
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
        </div>

      </div>
    }
    </>
  );
}