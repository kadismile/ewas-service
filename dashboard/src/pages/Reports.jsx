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

  const listItems = data.map((report, key) => {
    let number = key + 1;
    return (
      <tr key={key}>
        <td>{number++}</td>
        <td>{report.title}</td>
        <td>{report.reportTypeId.name}</td>
        <td>{report.address.state}</td>
        <td>{report.address.localGovt}</td>
        <td>{moment(report.createdAt).format('MMM D, YYYY')}</td>
        
      </tr>
    );
  });

  const filterData = (localGOvt) => {

  }

  return (
    <>
   { 
        loading? <PageLoader /> :
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
                      <h5>Reports</h5>
                      <a className="menudrop" id="dropdownMenu2" type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-display="static"
                      />
                      <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenu2" >
                        FILTER BY
                        <li>
                          <a className="dropdown-item active" href="#/" onClick={filterData('localGOvt')} style={{fontSize: '12px'}}>
                           LOCAL GOVT
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item active" href="#/" style={{fontSize: '12px'}}>
                            STATE
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item active" href="#/" style={{fontSize: '12px'}}>
                            REPORT TYPE
                          </a>
                        </li>
                      </ul>
                    </div>
                      <div className="panel-body">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Title</th>
                              <th scope="col">Type</th>
                              <th scope="col">State</th>
                              <th scope="col">Local Govt</th>
                              <th scope="col">Date</th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            {listItems}
                          </tbody>
                        </table>
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