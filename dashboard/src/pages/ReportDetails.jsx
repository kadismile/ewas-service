import { useState } from "react";
import { useLocation } from 'react-router-dom';
import moment from 'moment'
import { MediaDisplay } from '../components/elements/MediaDisplay';
import { DisplayFileModal } from "../modals/DisplayFileModal";
export const ReportDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState({});

  const location = useLocation();
  const { state :{report} } = location;

  if (!report || !report._id) {
    return <div>No report data available</div>;
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

  const handleShowModal = (file) => {
    setShowModal(true);
    setUrl(file)
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <DisplayFileModal show={showModal} onHide={handleCloseModal} data={url} />
    <div className="box-content">
        <div className="box-heading">
          <div className="box-title"> 
            <h3 className="mb-35">{report.title}</h3>
          </div>
          <div className="box-breadcrumb"> 
            <div className="breadcrumbs">
              <ul> 
                <li><span style={{color: colorStatus(report.status)}}>{capitalize(report.status)}</span></li>
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
                    <h5 className="icon-edu">Details</h5>
                    <div className="row mt-30">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Date of Incidence</label>
                              <input className="form-control" type="text" readOnly value={formatDate(report.dateOfIncidence)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Incident Type</label>
                              <input className="form-control" type="text" readOnly value={report.reportTypeId.name}  />
                            </div>
                          </div>

                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Srcurity Agency Intervention</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.intervention)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Srcurity Agency </label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.agencyId.name)} />
                            </div>
                          </div>
                          </div>



                          <div className="row">
                          <div className="col-lg-3 col-md-6">
                          <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Number killed </label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.numberKilled)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Number Injured</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.numberInjured)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Number Displaced</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.numberDisplaced)} />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Re Occurence</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.reoccurence)} />
                            </div>
                          </div>
                        </div> 


                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Address</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.address.fullAddress)} />                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group mb-30"> 
                              <label className="font-sm color-text-mutted mb-10">Media Links</label>
                              <input className="form-control" type="text" readOnly value={capitalize(report.mediaLinks)} />                            </div>
                          </div>
                          
                        </div> 

                          <div className="row">
                            <div className="col-lg-12"> 
                              <div className="form-group mb-30"> 
                                <label className="font-sm color-text-mutted mb-10">Description</label>
                                <textarea className="form-control"
                                readOnly
                                name="message" rows={10} 
                                value={ report.description }
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
                          <div className="item-timeline"> 
                            <div className="timeline-year"> <span>2008 - 2012</span></div>
                            <div className="timeline-info"> 
                              <h5 className="color-brand-1 mb-20">National Design Academy</h5>
                              <p className="color-text-paragraph-2 mb-15">Lorem ipsum dolor sit amet, consectetur dipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                            </div>
                            <div className="timeline-actions"> <a className="btn btn-editor" /><a className="btn btn-remove" /></div>
                          </div>
                          <div className="item-timeline"> 
                            <div className="timeline-year"> <span>2012 - 2014</span></div>
                            <div className="timeline-info"> 
                              <h5 className="color-brand-1 mb-20">University of Oxford</h5>
                              <p className="color-text-paragraph-2 mb-15">Lorem ipsum dolor sit amet, consectetur dipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                            </div>
                            <div className="timeline-actions"> <a className="btn btn-editor" /><a className="btn btn-remove" /></div>
                          </div>
                          <div className="item-timeline"> 
                            <div className="timeline-year"> <span>2014 - 2016</span></div>
                            <div className="timeline-info"> 
                              <h5 className="color-brand-1 mb-20">California Institute of Technology</h5>
                              <p className="color-text-paragraph-2 mb-15">Lorem ipsum dolor sit amet, consectetur dipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                            </div>
                            <div className="timeline-actions"> <a className="btn btn-editor" /><a className="btn btn-remove" /></div>
                          </div>
                          <div className="item-timeline"> 
                            <div className="timeline-year"> <span>2016 - Now</span></div>
                            <div className="timeline-info"> 
                              <h5 className="color-brand-1 mb-20">Stanford University</h5>
                              <p className="color-text-paragraph-2 mb-15">Lorem ipsum dolor sit amet, consectetur dipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                            </div>
                            <div className="timeline-actions"> <a className="btn btn-editor" /><a className="btn btn-remove" /></div>
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
        
      
      </div>
    </>
  )
}