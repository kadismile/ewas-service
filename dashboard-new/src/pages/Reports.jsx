import { useEffect, useState } from "react"
import React from "react"
import { crudService } from "../services/crudService"
import { reportService } from "../services/reportsService"
import moment from "moment"
import { Link } from "react-router-dom"
import { PageLoader } from "../components/elements/spinners"
import { Search } from "../components/elements/Search"
import { FilterModal } from "../modals/FilterModal"

export const Reports = () => {

  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const fetchData = () => {
    setLoading(true)
    crudService.getReports().then((res) => {
      const {
        data: { data },
      } = res
      setReports(data)
      setTimeout(() => setLoading(false), 500)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const listItems = reports.map((report, key) => {
    let number = key + 1
    return (
      <tr key={key}>
        <td>{number++}</td>
        <td>
          <Link to={`/report/${report.reportSlug}`}> {report.reportSlug} </Link>{" "}
        </td>
        <td>
          <Link to={`/report/${report.reportSlug}`}>
            {report.reportTypeId.name}{" "}
          </Link>{" "}
        </td>
        <td>{report.address.state}</td>
        <td>{report.address.localGovt}</td>
        <td>{moment(report.createdAt).format("MMM D, YYYY")}</td>
      </tr>
    )
  })


  const handleCloseModal = () => {
    setShowModal(false);
    setShowFilterModal(false)
  };


  const handleSearchText = () => {
    setLoading(true)
    fetchData()
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading)
  };

  const handleDataChange = (data) => {
    setReports(data);
  };

  const handleFilterData = (data) => {
    setLoading(true)
    if (data.length) {
      setLoading(false)
      setReports(data)
    } else {
      setLoading(false)
    }
  }

  return (
    <>
      <FilterModal show={showFilterModal} onHide={handleCloseModal} dataFromFilter={handleFilterData} />
      {loading ? (
        <PageLoader />
      ) : (
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
                      <div className="">
                        <div className="row">
                          <div className="col-xl-4 col-lg-5">
                            <span className="font-sm text-showing color-text-paragraph">
                            <Search
                              loading={loading} 
                              setLoading={ handleLoadingChange }
                              setData={ handleDataChange }
                              searchTextHandler={ handleSearchText }
                              model={'report'}
                            />
                            </span>
                          </div>
                          <div className="col-xl-8 col-lg-7 text-lg-end mt-sm-15">
                          <button 
                            onClick={() => setShowFilterModal(true)}
                            className="btn btn-default" 
                            type="submit" 
                          >
                            <i class="fa-solid fa-bars"></i> FIlter 
                          </button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Report ID</th>
                            <th scope="col">Type</th>
                            <th scope="col">State</th>
                            <th scope="col">Local Govt</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>{listItems}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
