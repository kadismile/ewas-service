"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store.js";
import DropDown from "../../components/DropDown/DropDown"
import CalendarModal from "@/components/Modals/CalendarModal";
import moment from 'moment'
import Places from '@/components/Map/Places.jsx';
import { DisabledButton, LoadingButton, SubmitButton } from "@/components/elements/Buttons.jsx";
import BooleanDropDown from "@/components/DropDown/BooleanDropDown";
export default function Home() {
  const { user: { address }} = useAppSelector((state) => state.userReducer);
  const formFields = {
    title: "",
    reoccurence: "",
    intervention: "",
    agency:"",
    description: '',
    date: '',
    rawDate: '',
    killed: '',
    injured: '',
    displaced: '',
    mediaLinks: ''
  };

  const calendarData = (calData) => {
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        date: moment(calData).format('LL'),
        rawDate:calData,
      };
    });
  }

  const [submitForm, setSubmitForm] = useState(false);
  const [formCol, setFormCol] = useState('col-lg-6 col-md-12')
  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  });
  const [loading, setLoading] = useState(false);

  const handleDataFromDropDown = (data) => {
    const { label, value } = data
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        agency: label === 'Agency' ? value : '',
      };
    });
  };

  const handleDropDownData = (data) => {
    const { label, value } = data
    const errors = formValues.errors;
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        reoccurence: label === 'Re-Occurence' ? value : value,
        intervention: label === 'Intervention' ? value : value,
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
    if (!address?.fullAddress) {
      return true
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
    console.log('Intervention ', formValues.intervention)
    if (formValues.intervention === true) {
      setFormCol('col-lg-4 col-md-12')
    } else {
      setFormCol('col-lg-6 col-md-12')
    }
  }, [formValues.intervention])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const {
      title,
      reportType,
      description,
      rawDate,
      killed,
      injured,
      displaced,
      mediaLinks,
      intervention,
      agency
    } = formValues;

    console.log("FormFieldssss --------------> ", {
      title,
      reportType,
      description,
      rawDate,
      killed,
      injured,
      displaced,
      mediaLinks,
      intervention,
      address,
      agency
    })

    /* const response = await reportService.registerReporter({
      email,fullName,password,phoneNumber,address,
    })
    const { status, message, token, data } = response
    if (status === 'failed') {
      toastr.error(message);
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success('Registration Successful');
      setTimeout(() => setLoading(false), 1000)
      dispatch(setUser({ user: data, token }))
      window.location.replace("/");
    }  */
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
                      <label className="form-label" htmlFor="input-2">Describe the Incidence *</label>
                        <textarea
                          className="font-sm color-text-paragraph-2"
                          name="description"
                          placeholder="Describe the Incidence"
                          value={formValues.description}
                          onChange={handleChange}
                        />
                      </div>

                     

                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Title of Incident *</label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="title"
                          value={formValues.title}
                          placeholder="Title of incidence"
                          type="text"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Date of Incident *</label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="date"
                          value={formValues.date}
                          placeholder="Date of incidence"
                          type="text"
                          onClick={(handleClick)}
                        />
                      </div>
                    </div>

                    <div className={formCol}>
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Incident Type *</label>
                        <DropDown label={'Incident Type'} dataToComponent={ handleDataFromDropDown } />
                      </div>
                    </div>

                    <div className={formCol}>
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Security Agency Intervention Done? </label>
                      <BooleanDropDown label={'Intervention'} dataToComponent={ handleDropDownData }/>
                      </div>
                    </div>

                    {
                      formValues.intervention === true ? 
                        <div className={formCol}>
                          <div className="input-style mb-20">
                          <label className="form-label" htmlFor="input-2">Agency </label>
                          <DropDown label={'Agency'} dataToComponent={ handleDataFromDropDown } />
                        </div>
                      </div> : ""
                    }

                    <div className="col-lg-3 col-md-6">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Number killed</label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="killed"
                          placeholder="Number Killed"
                          type="text"
                          value={formValues.killed}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Number Injured</label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="injured"
                          placeholder="Number Injured"
                          type="text"
                          value={formValues.injured}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Number Displaced</label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="displaced"
                          placeholder="Number Displaced"
                          type="text"
                          value={formValues.displaced}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="">
                      <label className="form-label" htmlFor="input-2">Re Occurence</label>
                        <BooleanDropDown label={'Re-Occurence'} dataToComponent={ handleDropDownData }/>
                      </div>
                    </div>

                  <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Address of Incidence</label>
                        <div className="form-group">
                        <Places />
                  </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                      <label className="form-label" htmlFor="input-2">Media Links</label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="mediaLinks"
                          value={formValues.mediaLinks}
                          onChange={handleChange}
                          placeholder="Media links"
                          type="text"
                        />
                      </div>
                    </div>

                    {
                        disableForm() ? (
                          <DisabledButton title={'Submit Report '} className={'submit btn btn-send-message'}/>
                        ) : !loading ? (
                          <SubmitButton onClick={ handleSubmit } title={'Submit Report'} className={'submit btn btn-send-message'}/>
                        ) : (
                          <LoadingButton />
                        )
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
