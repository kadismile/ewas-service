import { reportService } from '../services/reporterService.js'
import { useState } from "react";
import toastr from 'toastr'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user-slice.js";
import { store } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { DisabledButton, LoadingButton, SubmitButton } from "../components/elements/Buttons.jsx";
import Places from '../components/Map/Places.jsx';



export const Register = () => {
  let user = store?.getState()?.user?.user
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mapAddress } = user || {}

  const formFields = {
    email: "",
    fullName: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
  };
  const [submitForm, setSubmitForm] = useState(false);
  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  });
  const [loading, setLoading] = useState(false);

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
    if (!mapAddress?.fullAddress) {
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
      case "fullName":
        errors.fullName = "";
        if (value.length && value.length <= 3) {
          errors.fullName = "fullName must be more than 3 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
      return errors.fullName;

      case "password":
        errors.password = "";
        if (value.length && value.length <= 3) {
          errors.password = "password must be more than 3 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
      return errors.password;

      case "repeatPassword":
        errors.repeatPassword = "";
        if (value.length && value.length <= 3) {
          errors.repeatPassword = "repeated password must be more than 3 characters long!";
          setSubmitForm(false);
        } else if (value !== formValues.password) {
          errors.repeatPassword = "repeated password must be same with password!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
      return errors.repeatPassword;

      case "phoneNumber":
        errors.phoneNumber = "";
        if (value.length >1 && value.length <= 10) {
          errors.phoneNumber = "phoneNumber must be more than 11 characters long!";
          setSubmitForm(true);
        } else {
          setSubmitForm(false);
        }
      return errors.phoneNumber;
      default:
        setSubmitForm(false);
        break;
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password, fullName, phoneNumber } = formValues;
    const address = mapAddress
    const response = await reportService.registerReporter({
      email,fullName,password,phoneNumber, address,
    })
    
    const { status, message, token, data } = response
    if (status === 'failed') {
      toastr.error(message);
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success('Registration Successful');
      setTimeout(() => setLoading(false), 1000)
      dispatch(setUser({ user: data, token }))
      navigate('/');
    }
  };

const { errors} = formValues

  return (
    <main className="main">
        <section className="pt-100 login-register">
          <div className="container"> 
            <div className="row login-register-cover">
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <h2 className="mt-10 mb-5 text-brand-1"> Register to Report</h2>
                </div>
                <form className="login-register text-start mt-20" action="#">
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-1">Full Name *</label>
                    <input className="form-control" 
                      type="text" 
                      placeholder="Full Name" 
                      onChange={handleChange}
                      name="fullName" 
                      value={formValues.fullName}
                      required
                    />
                    { errors.fullName ? <span className='form_error'> {errors.fullName}</span> : ''}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="input-2">Email *</label>
                    <input 
                      className="form-control"
                      type="email" 
                      placeholder="your email" 
                      onChange={handleChange}
                      name="email"
                      value={formValues.email}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="input-2">Phone Number *</label>
                    <input 
                      className="form-control"
                      type="text"
                      placeholder="your phone number" 
                      onChange={handleChange}
                      name="phoneNumber"
                      value={formValues.phoneNumber}
                      required
                    />
                    { errors.phoneNumber ? <span className="form_error"> {errors.phoneNumber}</span> : ""}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="input-2">Address *</label>
                    <Places />
                    { errors.address ? <span className="form_error"> {errors.address}</span> : ""}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-4">Password *</label>
                    <input 
                      className="form-control" 
                      type="password" 
                      onChange={handleChange}
                      name="password"
                      value={formValues.password}
                      placeholder="************"
                    />
                    { errors.password ? <span className="form_error"> {errors.password}</span> : ""}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="input-4">Repeat Password *</label>
                    <input 
                      className="form-control" 
                      type="password" 
                      onChange={handleChange}
                      name="repeatPassword"
                      value={formValues.repeatPassword}
                      placeholder="************"
                    />
                    { errors.repeatPassword ? <span className="form_error"> {errors.repeatPassword}</span> : ""}
                  </div>
                  
                  <div className="form-group">
                  {
                    disableForm() ? (
                      <DisabledButton title={'Register'} className={'btn btn-brand-1 hover-up w-100'}/>
                    ) : !loading ? (
                      <SubmitButton onClick={ handleSubmit } title={'Register'} className={'btn btn-brand-1 hover-up w-100'}/>
                    ) : (
                      <LoadingButton />
                    )
                  }
                  </div>
                  <div className="text-muted text-center">Already have an account? 
                    <Link to="/login">Sign in</Link>
                  </div>
                </form>
              </div>
              <div className="img-1 d-none d-lg-block"><img className="shape-1" src="images/img-1.svg" alt="JobBox" /></div>
              <div className="img-2"><img src="images/img-2.svg" alt="JobBox" /></div>
            </div>
          </div>
        </section>
      </main>
  )
}