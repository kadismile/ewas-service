import { reportService } from '../services/reporterService.js'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user-slice.js";
import { store } from '../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingButton, SubmitButton } from "../components/elements/Buttons.jsx";
import Places from '../components/Map/Places.jsx';
import { PageLoader } from '../components/elements/spinners.jsx';
import { formErrorMessage } from '../utils/form-error-messages.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';



export const Register = () => {
  let user = store?.getState()?.user?.user
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mapAddress } = user || {}
  const [submitForm, setSubmitForm] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    fullName: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  const handleChange = (event) => {
    event.preventDefault();
    let { name, value } = event.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const failedValidation = () => {
    const {email, password, address, repeatPassword} = formValues
    if (!email.length || 
      !password.length || 
      !address.fullAddress.length || 
      !repeatPassword.length) 
      {
      return true
    }
    return undefined
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitForm(true)
    if (failedValidation()) {
      return;
    }
    setButtonLoading(true)
    const { email, password, fullName, phoneNumber } = formValues;
    const address = mapAddress
    const response = await reportService.registerReporter({
      email,fullName,password,phoneNumber, address,
    })
    
    const { status, message, token, data } = response
    if (status === 'failed') {
      setButtonLoading(false)
      setSubmitForm(false)
      NotificationManager.error(`${message}`, 'Error', 5000);
      setTimeout(() => setLoading(false), 1000)
    } else {
      NotificationManager.success('Registration Successful', '', 7000);
      setTimeout(() => setButtonLoading(false), 1000)
      dispatch(setUser({ user: data, token }))
      setTimeout(() => navigate('/'), 2000);
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  })

  const addressData = (data) => {
    setFormValues((preVal)=> {
      return {
        ...preVal,
        address: data
      }
    })
  }
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    { loading ? <PageLoader /> :
      <main className="main">
        <NotificationContainer/>
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
                    { formErrorMessage('fullName', formValues, submitForm)}
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
                    { formErrorMessage('email', formValues, submitForm)}
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
                  { formErrorMessage('phoneNumber', formValues, submitForm)}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="input-2">Address *</label>
                    <Places dataToComponent={addressData}/>
                    { formErrorMessage('address', formValues, submitForm)}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-4">Password *</label>
                    <input 
                      className="form-control" 
                      type={inputType}
                      onChange={handleChange}
                      name="password"
                      value={formValues.password}
                      placeholder="************"
                    />
                    { formErrorMessage('password', formValues, submitForm)}
                    { formValues.password ? <i className="fa fa-eye ml-2" onClick={handleToggle} style={{top: '70%', left: '90%' }}></i> : ''}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="input-4">Repeat Password *</label>
                    <input 
                      className="form-control" 
                      type={inputType}
                      onChange={handleChange}
                      name="repeatPassword"
                      value={formValues.repeatPassword}
                      placeholder="************"
                    />
                    { formErrorMessage('repeatPassword', formValues, submitForm)}
                    { formValues.repeatPassword ? <i className="fa fa-eye ml-2" onClick={handleToggle} style={{top: '70%', left: '90%' }}></i> : ''}
                  </div>
                  
                  <div className="form-group">
                  {
                    buttonLoading ? (
                      <SubmitButton onClick={ handleSubmit } title={'Register'} className={'btn btn-brand-1 hover-up w-100'}/>
                    ) : (
                      <LoadingButton />
                    )
                  }
                  </div>
                  <div className="text-muted text-center">Already have an account? 
                    <Link to="/login">Login in</Link>
                  </div>
                </form>
              </div>
             
            </div>
          </div>
        </section>
      </main>
    }
      
    </>

    )
}