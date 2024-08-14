"use client"; 
import { reportService } from '../services/reporterService.js'
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LoadingButton, SubmitButton } from "../components/elements/Buttons.jsx";
import { PageLoader } from '../components/elements/spinners.jsx';
import { formErrorMessage } from '../utils/form-error-messages.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export const ForgotPassword = () => {
  const navigate = useNavigate();
  const from = useLocation()?.state?.state?.from || {};

  const [submitForm, setSubmitForm] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  })

  const failedValidation = () => {
    const {email} = formValues
    if (!email.length) {
      return true
    }
    return undefined
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitForm(true)
    if (failedValidation()) {
      return;
    }
    setButtonLoading(true)
    const { email } = formValues;
    const response = await reportService.forgotPasswordEmail({ email });
    const { status, message } = response;
    if (status === 'failed') {
      setButtonLoading(false)
      setSubmitForm(false)
      NotificationManager.error(`${message}`, '', 3000);
    } else {
      setButtonLoading(false)
      setSubmitForm(false)
      NotificationManager.success(`${message}`, '', 3000);
    }
  };

return (
  <>
  {
    loading ? <PageLoader /> : 
    <main className="main">
      <NotificationContainer/>
      <section className="pt-100 login-register">
        <div className="container"> 
          <div className="row login-register-cover">
            <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1"> Reset Your Password</h2>
              </div>
              <form className="login-register text-start mt-20" action="#">

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
                  {
                    buttonLoading ? (
                      <LoadingButton />
                    ) : (
                      <SubmitButton onClick={ handleSubmit } title={'Login'} className={'btn btn-brand-1 hover-up w-100'}/>
                    )
                  }
                </div>

                <div className="text-muted text-center"> don't have an account? Register?  
                  <Link to="/register"> Sign Up</Link>
                </div>
                <div className="text-muted text-center"> Forgot Pasword ? 
                  <Link to="/forgot-password"> Forgot Password</Link>
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