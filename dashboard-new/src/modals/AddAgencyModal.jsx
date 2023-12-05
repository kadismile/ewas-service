import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import toastr from 'toastr';
import { LoadingButton, SubmitButton } from "../components/elements/Buttons"
import { crudService } from '../services/crudService';
import '../styles/custom.css';
export const AddAgencyModal = (props) => {
  const formFields = {
    name: '',
    email: '',
    phoneNumbers: '',
  };

  const [submitForm, setSubmitForm] = useState(false);

  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  });

  const [loading, setLoading] = useState(false);

  const failedValidation = () => {
    const { email, name, phoneNumbers } = formValues
    if (name.length < 3) {
      return true
    }
    if (email.length < 3) {
      return true
    }
    if (phoneNumbers.length < 10) {
      return true
    }

    return false
  }

  const formErrorMessage = (value) => {
    const {name, phoneNumbers, email} = formValues
    if (value === 'name') {
      if (submitForm && name.length < 3 ) {
        return 'Name is too short'
      }
    }

    if (value === 'phoneNumbers') {
      if (submitForm && phoneNumbers.length < 10 ) {
        return 'Phone Number is in-correct'
      }
    }

    if (value === 'email') {
      if (submitForm && email.length < 3 ) {
        return 'Email is in-correct'
      }
    }
  }

  const handleChange = (event) => {
      event.preventDefault();
      let { name, value } = event.target;
      let errors = formValues.errors;
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
    setSubmitForm(true)
    event.preventDefault();
    if (failedValidation()) return
    setLoading(true);
    const { name, email, phoneNumbers } = formValues;
    const response = await crudService.addAgency({ name, email, phoneNumbers })
    const { status } = response
    if (status === 'failed') {
      toastr.error('Cannot Create Agency');
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success('Agency Creation was  Successful');
      setTimeout(() => setLoading(false), 1000)
      props.onHide({addAgency: true})
    }
  };

  console.log('formErrorMessage------->>>> ', formErrorMessage('name'))

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={() => props.onHide({addAgency: true})}
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
          <div className="text-center">
            <h4 className="mt-10 mb-5 text-brand-1">Add Agency</h4>
          </div>
          <form className="login-register text-start mt-20" action="#">
            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Name of Agency 
              </label>
              <input
                className="form-control"
                id="input-1"
                type="text"
                name="name"
                placeholder="name of department"
                onChange={handleChange}
                value={formValues.name}
              />
              {<span className="form_errors"> { formErrorMessage('name') }</span> }
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Email of Agency
              </label>
              <input
                className="form-control"
                id="input-1"
                type="text"
                name="email"
                placeholder="email of agency"
                onChange={handleChange}
                value={formValues.email}
              />
              {<span className="form_errors"> { formErrorMessage('email') } </span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Phone Number
              </label>
              <input
                className="form-control"
                id="input-1"
                type="text"
                name="phoneNumbers"
                placeholder="phone-numbers of agency seperated by comma"
                onChange={handleChange}
                value={formValues.phoneNumbers}
              />
              { <span className="form_errors"> { formErrorMessage('phoneNumbers') } </span>}
            </div>
            
            <div className="form-group">
              { !loading ? (
                <SubmitButton
                  onClick={handleSubmit}
                  title={"Submit"}
                  className={"btn btn-brand-1 w-100"}
                />
              ) : (
                <LoadingButton />
              )}
            </div>
            
          </form>
      
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
