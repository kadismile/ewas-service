import { useEffect, useState } from "react";
import { store } from '../redux/store';
import { useLocation } from 'react-router-dom';
import moment from 'moment'
import { MediaDisplay } from '../components/elements/MediaDisplay';
import { DisplayFileModal } from "../modals/DisplayFileModal";
import { crudService } from "../services/crudService";
import { AssignmentModal } from "../modals/AssignmentModel";
import { VerifyReportModal } from "../modals/VerifyReportModal";

export const ReportDetails = () => {
  let user = store?.getState()?.user?.user
    if (user) {
      user = user.user
    }
  const [showModal, setShowModal] = useState(false);
  const [showAssModal, setShowAssModal] = useState(false);
  const [showVerifyModal, setVerifyModal] = useState(false);
  const [assData, setAssData] = useState();
  const [report, setReport] = useState(undefined);
  const [reportHistory, setreportHistory] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation()

  useEffect(() => {
    const match = pathname.match(/\/report\/([^/]+)/);
    if (match && match[1]) {
      const reportId = match[1];
      crudService.getOneReport(reportId)
      .then((res) => {
        const { status, data: { report, reportHistory} } = res
        if (status === 'success') {
          setReport(report)
          setreportHistory(reportHistory)
          setLoading(false)
          updateNotification(reportId)
        }
      })
    } else {
      console.log('No match found');
    }
  }, [])

  const updateNotification = async (reportId) => {
    await crudService.updateNotification(reportId)
  }

  const capitalize = (value) => {
    value = value?.toString().toUpperCase()
    return value ? value : 'None'
  }

  const formatDate = (value) => {
    return moment(value).format('DD MMMM YYYY')
  }

  const colorStatus = (status) => {
    if (status === 'processing') {
      return '#fe8d59'
    }
    if (status === 'pending') {
      return '#e41a28'
    }

    if (status === 'processed') {
      return '#5cc05c'
    }
  }

  const handleShowModal = (data) => {
    setShowModal(true);
    setShowAssModal(true);
    setAssData(data)
    setVerifyModal(data)
    // setUrl(file)
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAssModal(false);
    setVerifyModal(false)
  };

  const displayAssignmentButton = () => {
    if (report.department === user.department) {
      return false
    }
    return false
  }

  const displayVerifyButton = () => {
    if (report?.userId?._id === user._id) {
      return true
    }
  }

  const handleVerifyModal = (data) => {
    setVerifyModal(true)
    setAssData(data)
  }

  return (
    <>
    {/* <DisplayFileModal show={showModal} onHide={handleCloseModal} data={url} /> */}
    <AssignmentModal show={showAssModal} onHide={handleCloseModal} data={assData} />
    <VerifyReportModal show={showVerifyModal} onHide={handleCloseModal} data={assData} />
    {
      loading ? '......Loading ' : 

      <div className="box-content">
        <div className="box-heading">
          <div className="box-title"> 
            <h3 className="mb-35">{report?.title}</h3>
          </div>
          <div className="box-breadcrumb"> 
            <div className="breadcrumbs">
              <ul> 
                <li><span style={{color: colorStatus(report?.status), fontSize: '12px'}}>{capitalize(report?.status)}</span></li>
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
                  <div className="panel-head">
                    <h5>Details</h5>
                    {
                      displayVerifyButton() ?
                      <a className="menudrop" id="dropdownMenu2" type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-display="static"
                    /> : ''
                    }
                    
                    <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenu2" >
                    {
                      displayAssignmentButton() ? 
                      <li>
                        <a onClick={() => handleShowModal(report._id)} className="dropdown-item active" href="#">
                          Assign to self
                        </a>
                      </li> : <li> </li>
                    } 
                      {
                        displayVerifyButton() ? <li>
                        <a onClick={() => handleVerifyModal(report._id)  } className="dropdown-item" href="#">
                          verify report
                        </a>
                      </li> : ''
                      }
                      
                    </ul>
                    <p> Submitted By: <b style={{fontWeight: 'bolder', color: '#5e81ff'}}>{capitalize(report.reporterId)}</b> </p>
                    <p> Date: <b style={{fontWeight: 'bolder', color: '#5e81ff'}}>{moment(report.createdAt).format('DD MMM, YYYY')}</b> </p>
                  </div>
                    <div className="row mt-30">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Date of Incidence</label>
                              <input className="form-control" type="text" readOnly value={formatDate(report?.dateOfIncidence)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Incident Type</label>
                              <input className="form-control" type="text" readOnly value={report?.reportTypeId.name}  />
                            </div>
                          </div>

                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Srcurity Agency Intervention</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.intervention)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Srcurity Agency </label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.agencyId.name)} />
                            </div>
                          </div>
                          </div>



                          <div className="row">
                          <div className="col-lg-3 col-md-6">
                          <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Number killed </label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.numberKilled)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Number Injured</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.numberInjured)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Number Displaced</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.numberDisplaced)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Re Occurence</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.reoccurence)} />
                            </div>
                          </div>
                        </div> 


                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Address</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.address.fullAddress)} />                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Media Links</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.mediaLinks)} />                            </div>
                          </div>
                          
                        </div> 

                          <div className="row">
                            <div className="col-lg-12"> 
                              <div className="form-group mb-30"> 
                                <label className="font-sm color-text-mutted mb-10">Description</label>
                                <textarea className="form-control"
                                readOnly
                                name="message" rows={10} 
                                value={ report?.description }
                                />
                              </div>
                          </div>
                          <div className="row">
                          <label className="font-sm color-text-mutted mb-10">Report Files </label>
                          {
                            report.attachments.map((file) => {
                              return (
                              <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="card-grid-2 hover-up">
                                  <div className="card-grid-2-image-left">
                                    <div className="card-profile pt-10">
                                      <a  onClick={() => handleShowModal(file)}> 
                                      <MediaDisplay mediaLink={file.url}/></a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              )
                            })
                          }
                            </div>
                          <div className="col-lg-12"> 
                            <div className="form-group mt-10">
                              <button className="btn btn-default btn-brand">Report History</button>
                            </div>
                          </div>
                        </div>
                        <div className="box-timeline mt-50">
                          { reportHistory.map((rHistory) => {
                              return (
                              <div className="item-timeline"> 
                                <div className="timeline-year"> <span>{moment(rHistory.createdAt).format('DD MMM YYYY h:mma')}</span></div>
                                <div className="timeline-info"> 
                                  <p className="color-brand-1 mb-20" style={{fontSize: '15px'}}>{rHistory.comment}</p>
                                  <hr/>
                                </div>
                              </div>
                              )
                          })}
                          
                        </div>
                      </div>
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
  )
}