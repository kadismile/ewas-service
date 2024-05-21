import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton, SubmitButton } from "../components/elements/Buttons"
import { userService } from '../services/userService'
import toastr from 'toastr'

export const InvitedUser = () => {
  const { invitationalId } = useParams();
  const [user, setuser] = useState(undefined)

  useEffect(() => {
    userService.getInvitation(invitationalId)
    .then((res) => {
      const { status, data } = res
      if (status === 'success') {
        setuser(data)
        setFormValues((preVal) => {
          return {
            ...preVal,
            email: data?.email,
            departmentName: data?.department?.acronym,
            department: data?.department?._id,
            agencyName: data?.agency?.name || '',
            agency: data?.agency?._id,
          }
        })
      } else {
        toastr.error('invalid url')
      }
    })
  }, [])

  const [submitForm, setSubmitForm] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    phoneNumber: '',
    department: '',
    departmentName: '',
    agency: '',
    agencyName: '',
    fullName: '',
    password: '',
    repeatPassword: '',
  });
  const [loading, setLoading] = useState(false);

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
    if (submitForm === true) {
      if (formErrorMessage('fullName')?.length || formErrorMessage('phoneNumber')?.length
      || formErrorMessage('password')?.length || formErrorMessage('repeatPassword')?.length 
      || formErrorMessage('phoneNumber')?.length) {
        return false
      }
      return true 
    }
    return false
  }

  const formErrorMessage = (value) => {
    const { fullName, phoneNumber, password, repeatPassword} = formValues
    if (value === 'fullName') {
      if (submitForm && fullName.length < 3 ) {
        return 'full Name is too short'
      }
    }

    if (value === 'password') {
      if (submitForm && password?.length < 5 ) {
        return 'password is too short'
      }
    }

    if (value === 'phoneNumber') {
      if (submitForm && phoneNumber?.length < 10 ) {
        return 'phone number is incorrect'
      }
    }

    if (value === 'repeatPassword') {
      if (submitForm && repeatPassword?.length < 5 ) {
        return 'repeated password is too short'
      }
      if (submitForm && repeatPassword !== password ) {
        return 'repeated password must be same with password'
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitForm(true)
    if (failedValidation() === false) return
    setLoading(true);
    const { 
      fullName, email, phoneNumber, 
      password, department, agency, role='user' 
    } = formValues;

    const response = await userService.registerUser({
      fullName, email, phoneNumber, password, 
      department, role, responder: agency })
    const { status, message } = response
    if (status === 'failed') {
      toastr.error(message);
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success(message);
      setTimeout(() => setLoading(false), 1000)
      window.location.replace("/login");
    }
  };


  return (
    <>
      <div className="box-content">
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
                              <h5 className="mt-10 mb-5 text-brand-1">You have been Invited To Join EWERS 
                                  <br/> <span style={{color: '#3C65F5'}}>{formValues.email}</span>
                              </h5> 
                            </div>
                            <form className="login-register text-start mt-20" action="#">
                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Full Name *</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type="text" 
                                  name="fullName" 
                                  placeholder="Full Name"
                                  onChange={handleChange}
                                  value={formValues.fullName}
                                />
                                {  formErrorMessage('fullName')?.length && <span className="form_errors"> { formErrorMessage('fullName') } </span>}
                              </div>

                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Email</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type="text" 
                                  name="email" 
                                  readOnly
                                  placeholder="Full Name"
                                  onChange={handleChange}
                                  value={formValues.email}
                                />
                              </div>

                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Department</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type="text" 
                                  name="department" 
                                  readOnly
                                  placeholder="Department"
                                  onChange={handleChange}
                                  value={formValues.departmentName}
                                />
                              </div>
                              {
                                formValues.agency.length > 2 && 
                                <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Agency</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type="text" 
                                  name="agency" 
                                  readOnly
                                  placeholder="Agency"
                                  onChange={handleChange}
                                  value={formValues.agencyName}
                                />
                              </div>
                              }
                              

                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Phone Number *</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type="text" 
                                  name="phoneNumber" 
                                  placeholder="Phone Number"
                                  onChange={handleChange}
                                  value={formValues.phoneNumber}
                                />
                                { formErrorMessage('phoneNumber')?.length && <span className="form_errors"> { formErrorMessage('phoneNumber') } </span>}
                              </div>

                              

                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Password *</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type="password" 
                                  name="password" 
                                  placeholder="Set Password"
                                  onChange={handleChange}
                                  value={formValues.password}
                                />
                                { formErrorMessage('password')?.length && <span className="form_errors"> { formErrorMessage('password') } </span>}
                              </div>

                              <div className="form-group">
                                <label className="form-label" htmlFor="input-1">Repeat Password *</label>
                                <input 
                                  className="form-control" 
                                  id="input-1" 
                                  type="password" 
                                  name="repeatPassword" 
                                  placeholder="Set Password"
                                  onChange={handleChange}
                                  value={formValues.repeatPassword}
                                />
                                {  formErrorMessage('repeatPassword')?.length && <span className="form_errors"> { formErrorMessage('repeatPassword') } </span>}
                              </div>
                              
                              <div className="form-group">
                              {
                                !loading ? (
                                  <SubmitButton onClick={ handleSubmit } title={'Submit'} className={'btn btn-brand-1 w-100'}/>
                                ) : (
                                  <LoadingButton />
                                )
                              }
                              </div>
                              <div className="login_footer form-group d-flex justify-content-between">
                                
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