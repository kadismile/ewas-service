import isEmail from 'validator/lib/isEmail';
import '../styles/custom.css'

export const formErrorMessage = (value, formValues, submitForm)  => {
    
    if (value === 'password') {
      if (submitForm && !formValues.password?.length  ) {
        return <span className="form_errors">Password field is mandatory</span>
      }
      if (submitForm && formValues.password?.length < 5 ) {
        return <span className="form_errors">Password field must be 6 characters or longer</span>
      }
    }

    if (value === 'repeatPassword') {
      if (submitForm && !formValues.repeatPassword.length  ) {
        return <span className="form_errors">Repeated password field is mandatory</span>
      }
      if (submitForm && formValues.repeatPassword.length < 5 ) {
        return <span className="form_errors">Repeated Password field must be 6 characters or longer</span>
      }

      if (submitForm && formValues.repeatPassword !== formValues.password ) {
        return <span className="form_errors">Repeated Password value is not same with password field </span>
      }
    }

    if (value === 'email') {
      if (submitForm && !formValues?.email?.length) {
        return (
          <span className="form_errors"> Email field is mandatory </span>
        )
      }

      if (submitForm && (!isEmail(formValues?.email) )) {
        return (
          <span className="form_errors"> Email is in correct </span>
        )
      }
    }

    if (value === 'address') {
      if (submitForm && !formValues.address?.fullAddress?.length  ) {
        return <span className="form_errors">Address field is mandatory</span>
      }
    }

    if (value === 'fullName') {
      if (submitForm && !formValues.fullName?.length  ) {
        return <span className="form_errors">Your Full name field is mandatory</span>
      }
    }

    if (value === 'phoneNumber') {
      if (submitForm && !formValues.phoneNumber?.length  ) {
        return <span className="form_errors">Phone number field is mandatory</span>
      }
    }
    return '';
}