"use client"; 
import { reportService } from '../services/reporterService.js'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user-slice.js";
import toastr from 'toastr'
import { Link } from "react-router-dom";
import { DisabledButton, LoadingButton, SubmitButton } from "../components/elements/Buttons.jsx";

export const Login = () => {
  
  const dispatch = useDispatch();
  const formFields = {
    email: "",
    password: "",
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
      case "password":
        errors.password = "";
        if (value.length && value.length <= 3) {
          errors.password = "password must be more than 3 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
      return errors.password;

      case "email":
        errors.email = "";
        if (!value.length) {
          errors.email = "pls add email";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.email;

      default:
        setSubmitForm(false);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = formValues;

    const response = await reportService.loginReporter({
      email,password
    })
    const { status, message, data, token } = response
    if (status === 'failed') {
      toastr.error(message);
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success('Login Successful');
      setTimeout(() => setLoading(false), 1000)
      dispatch(setUser({ user: data, token }))
      window.location.replace("/");
    }
  };

const { errors} = formValues

return (
  <main className="main">
      <section className="pt-100 login-register">
        <div className="container"> 
          <div className="row login-register-cover">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1"> Sign In</h2>
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
                  {
                    disableForm() ? (
                      <DisabledButton title={'Login'} className={'btn btn-brand-1 hover-up w-100'}/>
                    ) : !loading ? (
                      <SubmitButton onClick={ handleSubmit } title={'Login'} className={'btn btn-brand-1 hover-up w-100'}/>
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