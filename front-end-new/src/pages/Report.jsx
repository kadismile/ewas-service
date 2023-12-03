import { useState, useEffect } from "react";
import { store } from '../redux/store.js';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user-slice";
import DropDown from "../components/DropDown/DropDown"
import CalendarModal from "../components/Modals/CalendarModal";
import moment from 'moment'
import Places from '../components/Map/Places.jsx';
import { DisabledButton, LoadingButton, SubmitButton } from "../components/elements/Buttons.jsx";
import BooleanDropDown from "../components/DropDown/BooleanDropDown";
import { reportService } from "../services/reporterService";
import toastr from 'toastr'
import StateDropDown from "../components/DropDown/StateDropDown";
import LGADropDown from "../components/DropDown/LGADropDown";
import { TimeDropDown, TimePicker } from "../components/elements/TimePicker";
import InformationSource from "../components/DropDown/InformationSource";


export const Report = () => {
  let user = store?.getState()?.user?.user
  let mapAddress
  if (user) {
    mapAddress = user.mapAddress
  }

  const dispatch = useDispatch();

  const formFields = {
    timeOfIncidence: "",
    reoccurence: "",
    intervention: "",
    informationSource: '',
    mediaLinks: '',
    agency:"",
    resolved: "",
    description: '',
    date: '',
    rawDate: '',
    reportTypeId: '',
    fileUpload: '',
    state: '',
    localGovt: '',
  };

  const calendarData = (calData) => {
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        date: moment(calData).format('LL'),
        rawDate: moment(calData, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ").toDate()
      };
    });
  }

  const [submitForm, setSubmitForm] = useState(false);
  const [lga, setLga] = useState(['select a state']);
  const [formCol, setFormCol] = useState('col-lg-6 col-md-12')
  const [displayMediaLink, setDisplayLink] = useState(false)
  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  });
  const [loading, setLoading] = useState(false);

  const handleDataFromDropDown = (data) => {
    const { value } = data
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        reportTypeId: value
      };
    });
  };

  const handleStateData = (data) => {
    const {localGovt, state } = formValues
    const { label, value } = data
    const errors = formValues.errors;
    setLga(value.lgas)
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        state: label === 'State' ? value : state,
        localGovt: label === 'LGA' ? value : localGovt,
      };
    });
  };

  const handleDropDownData = (data) => {
    const { label, value } = data
    const {reoccurence, intervention, agency, resolved, informationSource } = formValues
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        reoccurence: label === 'Re-Occurence' ? value : reoccurence,
        intervention: label === 'Intervention' ? value : intervention,
        agency: label === 'Agency' ? value : agency,
        resolved: label === 'Resolved' ? value : resolved,
        informationSource: label === 'Source of Information' ? value : informationSource,
      };
    });
  };

  const disableForm = () => {
    const newValues = { ...formValues };
    let isError = false;
    for (let val of Object.values(newValues)) {
      if (val === "") {
        isError = true;
      }
    }
    if (isError && submitForm) {
      return true;
    }
    if (!isError && !submitForm) {
      return true;
    }
    if (isError && !submitForm) {
      return true;
    }
    if (!isError && !submitForm) {
      return false;
    }
    
  };

  const handleChange = (event) => {
    event.preventDefault();
    let { name, value } = event.target;
    let errors = formValues.errors;
    validateForm(name, errors, value);
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        [name]: value,
      };
    });
    for (let val of Object.values(formValues.errors)) {
      if (val !== "") {
        setSubmitForm(false);
      }
    }
  };

  const validateForm = (name, errors, value) => {
    switch (name) {
      case "description":
        errors.description = "";
        if (value.length && value.length <= 20) {
          errors.description = "incident description must be more than 20 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
      return errors.description;

      default:
        setSubmitForm(false);
        break;
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    handleShowModal()
  };

  useEffect(() => {
    if (formValues.intervention === 'Yes') {
      setFormCol('col-lg-4 col-md-12')
    } else {
      setFormCol('col-lg-6 col-md-12')
    }

    if (formValues.informationSource === 'Website Link') {
      setDisplayLink(true)
    } else {
      setDisplayLink(false)
    }
  }, [formValues.intervention, formValues.informationSource])

  const onFileChange = (e) => {
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        fileUpload: e.target.files[0],
      };
    });
  };

  const handleTimeInput = (time) => {
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        timeOfIncidence: moment(time, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ").toDate()
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let {
      title,
      reportTypeId,
      description,
      rawDate,
      timeOfIncidence,
      informationSource,
      mediaLinks,
      intervention,
      agency,
      fileUpload,
      state,
      localGovt,
      reoccurence,
      resolved
    } = formValues;

    mapAddress.state = state.state
    mapAddress.localGovt = localGovt

    const form = new FormData();
    form.append('title', title);
    form.append("reoccurence", reoccurence);
    form.append("resolved", resolved);
    form.append("dateOfIncidence", rawDate);
    form.append("timeOfIncidence", timeOfIncidence);
    form.append("informationSource", informationSource);
    form.append("mediaLinks", mediaLinks);
    form.append("reporterId", 'anonymous');
    form.append("reportTypeId", reportTypeId); 
    form.append("description", description);
    form.append("intervention", intervention);
    form.append("agencyId", agency);
    form.append("address", JSON.stringify(mapAddress));
    form.append("fileUpload", fileUpload);

    const response = await reportService.createReports(form)
    const { status, message, token, data } = response

    if (status === 'failed') {
      toastr.error(message);
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success('Report Submitted Successfully');
      setTimeout(() => setLoading(false), 1000)
      dispatch(setUser({ user: data, token }))
      window.location.replace("/");
    }
  };

  return (
    <>
      <CalendarModal show={showModal} onHide={handleCloseModal} data={calendarData}/>
      <main className="main">
        <section className="section-box">
          <div className="breacrumb-cover bg-img-about">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="mb-10">Report</h2>
                  <p className="font-lg color-text-paragraph-2">
                    Get the latest news, updates and tips
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        <section className="section-box mt-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-40">
                <h2 className="mt-5 mb-10">Report An Incident</h2>
                <p className="font-md color-text-paragraph-2">
                  The fields marked as * are important filelds
                  <br className="d-none d-lg-block" /> kindly fill all as accurate as possible
                </p>
                <form
                  className="contact-form-style mt-30"
                  id="contact-form"
                  action="#"
                  method="post"
                >
                  <div
                    className="row wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".1s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.1s",
                      animationName: "fadeInUp",
                    }}
                  >

                    <div className="col-lg-12 col-md-12">
                      <div className="textarea-style mb-30">
                      <label className="form-label" htmlFor="input-2">Describe the incident and number of casualty *</label>
                        <textarea
                          className="font-sm color-text-paragraph-2"
                          name="description"
                          placeholder="Describe the incident and number of casualty"
                          value={formValues.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group mb-30">
                        <div class="box-upload">
                        <label className="form-label" htmlFor="input-2">Upload photo/video </label>
                          <div className="add-file-upload">
                            <input className="fileupload" type="file" name="fileUpload" multiple="multiple" onChange={onFileChange}/>
                          </div>
                        </div>
                    
                        </div>
                    </div>


                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Date of Incident *</label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="date"
                          value={formValues.date}
                          placeholder="Date of incidence"
                          type="text"
                          onClick={handleClick}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Time of Incident *</label> <br/>
                      <TimeDropDown timeChange={handleTimeInput}/>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-3">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Type of Incident *</label>
                        <DropDown label={'Incident Type'} dataToComponent={ handleDataFromDropDown } />
                      </div>
                    </div>
                  
                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <div className="input-style mb-20">
                        <label className="form-label" htmlFor="input-2">State*</label>
                          <StateDropDown label={'State'} dataToComponent={ handleStateData } />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <div className="input-style mb-20">
                        <label className="form-label" htmlFor="input-2">Local Government*</label>
                          <LGADropDown label={'LGA'} lgaData={lga} dataToComponent={ handleStateData } />
                        </div>
                      </div>
                    </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="input-2">Address *</label>
                      <Places />
                    </div>
                  </div>
                    

                    <div className={formCol}>
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Has there been any response yet? </label>
                      <BooleanDropDown label={'Intervention'} dataToComponent={ handleDropDownData }/>
                      </div>
                    </div>

                    {
                      formValues.intervention === 'Yes' ? 
                      <>
                        <div className={formCol}>
                            <div className="input-style mb-20">
                            <label className="form-label" htmlFor="input-2">Security Agency intervention </label>
                            <DropDown label={'Agency'} dataToComponent={ handleDropDownData } />
                          </div>
                        </div> 

                      <div className={formCol}>
                        <div className="">
                        <label className="form-label" htmlFor="input-2">Has it been Resolved?</label>
                          <BooleanDropDown label={'Resolved'} dataToComponent={ handleDropDownData }/>
                        </div>
                      </div>
                      </>
                      : ""
                    }

                    <div className={formCol}>
                      <div className="">
                      <label className="form-label" htmlFor="input-2">Has it happened before?</label>
                        <BooleanDropDown label={'Re-Occurence'} dataToComponent={ handleDropDownData }/>
                      </div>
                    </div>

                    <div className={formCol}>
                      <div className="">
                      <label className="form-label" htmlFor="input-2">Source of Information</label>
                        <InformationSource label={'Source of Information'} dataToComponent={ handleDropDownData }/>
                      </div>
                    </div>

                    {
                      displayMediaLink ?
                      <div className={formCol}>
                      <div className="">
                      <label className="form-label" htmlFor="input-2">Website Link</label>
                      <input
                          className="font-sm color-text-paragraph-2"
                          name="mediaLinks"
                          value={formValues.mediaLinks}
                          placeholder="Website Link"
                          type="text"
                          onChange={handleChange}
                        />
                      </div>
                    </div> : ""
                    }
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>


                    {
                      /*  disableForm() ? (
                          <DisabledButton title={'Submit Report '} className={'submit btn btn-send-message'}/>
                        ) : !loading ? ( */
                        
                          <SubmitButton onClick={ handleSubmit } title={'Submit Report'} className={'submit btn btn-send-message'}/>
                      /*  ) : (
                          <LoadingButton />
                        ) */
                    }

                
                  </div>
                </form>
                <p className="form-messege" />
              </div>
              
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
