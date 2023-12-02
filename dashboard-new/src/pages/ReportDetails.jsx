import { useEffect, useState } from "react";
import { store } from '../redux/store';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import { MediaDisplay } from '../components/elements/MediaDisplay';
import { DisplayFileModal } from "../modals/DisplayFileModal";
import { reportService } from "../services/reportsService";
import { crudService } from "../services/crudService";
import { AssignmentModal } from "../modals/AssignmentModel";
import { VerifyReportModal } from "../modals/VerifyReportModal";
import { SubmitButton } from "../components/elements/Buttons";
import { EditReportModal } from "../modals/EditReportModal";
import { ReviewModal } from "../modals/ReviewModal";
import { DraftModal } from "../modals/DraftModal";


export const ReportDetails = () => {
  const { reportSlug } = useParams();
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
  const [showEditModal, setEditModal] = useState(false);
  const [showCommentModal, setCommentModal] = useState(false);
  const [showDraftModal, setDraftModal] = useState(false);
  const [draftReport, setDraftReport] = useState(false);


  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    if (reportSlug) {
      crudService.getOneReport(reportSlug)
      .then((res) => {
        const { status, data: { report, reportHistory, draftReport} } = res
        if (status === 'success') {
          setLoading(false)
          setReport(report)
          setreportHistory(reportHistory)
          setDraftReport(draftReport)
          // updateNotification(reportId) visit this later 
        }
      })
    } else {
      console.log('No match found');
    }
  }


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

  const handleShowModal = () => {
    setShowModal(true);
    // setUrl(file)
  };

  const handleCloseModal = (data) => {
    if (data?.updated) {
      fetchData()
      setVerifyModal(true)
    }
    if (data?.closeVerifyModal) {
      fetchData()
      setVerifyModal(false)
    }
    if (data?.closeAssModal) {
      setShowAssModal(false);
      fetchData()
    }
    setShowModal(false);
    setEditModal(false);
    setCommentModal(false);
    setDraftModal(false);
  };


  const displayVerifyAssButton = () => {
    const actionableUser = report?.actionableUsers
    if (actionableUser?.currentUser?._id === user?._id &&
        actionableUser?.nextActionableDept === user?.department?._id
      ) {
      return true
    }
  }

  const displayEditButton = () => {
    const actionableUser = report?.actionableUsers
    if (actionableUser?.currentUser?._id === user?._id
      ) {
      return true
    }
    return false
  }

  const displayWorkOnReport = () => {
    const actionableUser = report?.actionableUsers
    if (displayEditButton() === true || actionableUser?.currentUser) return false
    if (
        actionableUser?.currentDepartment === user?.department._id
      ) {
      return true
    }
    return true
  }

  const displayActionButtons = () => {
    const actionableUser = report?.actionableUsers;
    return actionableUser?.nextActionableDept === user.department._id
  }

  const handleVerifyModal = (data) => {
    setVerifyModal(true)
    setAssData(data)
  }

  const handleAssingmentModal = (data) => {
    setShowAssModal(true);
    setAssData(data)
  }

  const getByTitle = () => {
    if (user?.department?.acronym === 'SSS') {
      return 'Assign to Responders'
    }

    if (user?.department?.acronym === 'CAMS') {
      return 'Verify Report'
    }
  }

  return (
    <>
    {
      loading ? '......Loading ' : 

      <div className="box-content">
        <ReviewModal show={showCommentModal} onHide={handleCloseModal} report={report} user={user}/>
        <EditReportModal show={showEditModal} onHide={handleCloseModal} data={report} user={ user } />
        {/* <DisplayFileModal show={showModal} onHide={handleCloseModal} data={url} /> */}
        <AssignmentModal show={showAssModal} onHide={handleCloseModal} data={assData} />
        <VerifyReportModal show={showVerifyModal} onHide={handleCloseModal} data={assData} depAcronym={user.department.acronym} title={getByTitle()}/>
        <DraftModal show={showDraftModal} onHide={handleCloseModal} draftReport={draftReport}/>
        <div className="box-heading">
          <div className="box-title"> 
            <h3 className="mb-35">{report?.reportSlug}</h3>
          </div>
          <div className="box-breadcrumb"> 
              <ul> 
                <li> 
                  { displayActionButtons() &&
                      <>
                      { 
                        displayWorkOnReport() ?
                          <li>
                            <a className={'btn btn-success btn-xm'}
                              onClick={() => handleAssingmentModal(report._id)}
                              style={{ padding: '6px 9px'}}> Work on Report ?
                            </a>
                          </li> : ""
                      }

                        { displayEditButton() ?
                          <li>
                            <div className="form-group mt-10">
                                <button 
                                  onClick={() => setEditModal(true)} 
                                  style={{lineHeight: '5px'}}
                                  className="btn btn-default btn-brand">Edit Report</button>
                            </div>
                          </li> : ''
                        }
                      </>
                  }
                  </li>
              </ul>
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
                    <p> Submitted By: <b style={{fontWeight: 'bolder', color: '#5e81ff'}}>{capitalize(report?.reporterId)}</b> </p>
                    <p> Date: <b style={{fontWeight: 'bolder', color: '#5e81ff'}}>{moment(report?.createdAt).format('DD MMM, YYYY')}</b> </p>
                    <p> Status: <span style={{color: colorStatus(report?.status), fontSize: '12px'}}>{capitalize(report?.status)}</span> </p>
                    <p> Reviews: <a href="#/" onClick={() => setCommentModal(true)}> <span style={{color: 'green', fontSize: '12px', fontWeight: 'bolder'}}>View All Reviews</span>  </a></p>
                    <p> Draft: <a href="#/" onClick={() => setDraftModal(true)}> <span style={{color: 'purple', fontSize: '12px', fontWeight: 'bolder'}}>View Draft</span>  </a></p>
                    
                    {displayActionButtons() &&
                      displayVerifyAssButton() ?
                      <p> <button style={{lineHeight: '0px'}} 
                            onClick={() => handleVerifyModal(report._id)  }  
                            className="btn btn-warning">Verify Report</button>
                      </p> : ""
                    }
                    
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
                              <label className="font-sm color-text-mutted mb-10">Response From Security Agency</label>
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
                              <label className="font-sm color-text-mutted mb-10">Has it Happened Before ?</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.reoccurence)} />
                            </div>
                          </div>
                        </div> 


                        <div className="row">
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">State</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.address.state)} />                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Local Govt</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.address.localGovt)} />                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">User Typed Address</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.address.userTypedAddress)} />                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Address</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report?.address.fullAddress)} />                            </div>
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