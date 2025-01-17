import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DisabledButton, LoadingButton, SubmitButton } from "../components/elements/Buttons"
import { reportService } from '../services/reporterService'
import toastr from 'toastr'
import { NotificationContainer, NotificationManager } from 'react-notifications';

export const ResetPassword = () => {
  const { passwordToken } = useParams();
  const [user, setuser] = useState(undefined)
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  useEffect(() => {
    const frontEnd = true
    reportService.verifyPasswordToken({ passwordToken, frontEnd})
    .then((res) => {
      const {status, data} = res
      if (status === 'success') {
        setuser(data)
      } else {
        NotificationManager.error(`Invalid Password Reset Token`, '', 10000);
      }
    })
  }, [])

  const formFields = {
    newPassword: "",
    repeatPassword: "",
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
  };

  const validateForm = (name, errors, value) => {
    switch (name) {
      case "newPassword":
        errors.newPassword = "";
        if (!value.length && value.length < 5) {
          errors.newPassword = "pls add password";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.newPassword;
        
      case "repeatPassword":
        errors.repeatPassword = "";
        if (!value.length && value.length < 5) {
          errors.repeatPassword = "pls add password";
          setSubmitForm(false);
        } else if (value !== formValues.newPassword) {
          errors.repeatPassword = "password mismatch";
        } else {
          setSubmitForm(true);
        }
        return errors.repeatPassword;
      default:
        setSubmitForm(false);
        break;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { newPassword } = formValues;
    const { email } = user;
    const frontEnd = true
    const response = await reportService.resetPassword({ email, newPassword, frontEnd})
    const { status, message } = response
    if (status === 'failed') {
      toastr.error(message);
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success(message);
      setTimeout(() => setLoading(false), 1000)
      window.location.replace("/");
    }
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="box-content">
        <NotificationContainer />
        <div className="row"> 
          <div className="col-lg-12"> 
            <div className="section-box">
              <div className="container"> 
                <div className="panel-white mb-30">
                  <div className="box-padding">               
                    <div className="login-register"> 
                      <div className="row login-register-cover pb-250">
                        <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                          <div className="form-login-cover">
                            <div className="text-center">
                              <h3 className="mt-10 mb-5 text-brand-1">Reset Your Password</h3>
                            </div>
                            <form className="login-register text-start mt-20" action="#">
                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">New Password *</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type={inputType}
                                  name="newPassword" 
                                  placeholder="***********"
                                  onChange={handleChange}
                                  value={formValues.newPassword}
                                />
                                { formValues.newPassword ? <i className="fa fa-eye ml-2" onClick={handleToggle} style={{top: '70%', left: '90%' }}></i> : ''}
                              </div>

                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Confirm New Password *</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" type="password" 
                                  name="repeatPassword" 
                                  placeholder="***********"
                                  onChange={handleChange}
                                  value={formValues.repeatPassword}
                                />
                                { formValues.repeatPassword ? <i className="fa fa-eye ml-2" onClick={handleToggle} style={{top: '70%', left: '90%' }}></i> : ''}
                              </div>
                              
                              <div className="form-group">
                              {
                                disableForm() ? (
                                  <DisabledButton title={'Submit'} className={'btn btn-brand-1 w-100'}/>
                                ) : !loading ? (
                                  <SubmitButton onClick={ handleSubmit } title={'Submit'} className={'btn btn-brand-1 w-100'}/>
                                ) : (
                                  <LoadingButton />
                                )
                              }
                              </div>
                              <div className="login_footer form-group d-flex justify-content-between">
                                
                                <Link className='text-muted' to="/login">
                                    Back to Login
                                </Link> 
                              </div>
                            </form>
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