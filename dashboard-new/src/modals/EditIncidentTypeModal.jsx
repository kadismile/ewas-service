import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import toastr from 'toastr';
import { DisabledButton, LoadingButton, SubmitButton } from "../components/elements/Buttons"
import { crudService } from '../services/crudService';
import { reportService } from '../services/reportsService';

export const EditIncidentTypeModal = (props) => {
  const {data: { name, _id }} = props
  const formFields = {
    name,
  };

  const [submitForm, setSubmitForm] = useState(false);

  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (name) {
      const initialErrors = {};
      Object.keys(formFields).forEach((key) => {
        initialErrors[key] = '';
      });
      setFormValues({
        ...formFields, 
        errors: initialErrors })
    }
    return () => {
      console.log('dead com')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

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
      case "name":
        errors.name = "";
        if (!value.length) {
          errors.name = "pls add name";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.name;
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
    props.onHide({editDept: true})
    event.preventDefault();
    setLoading(true);
    const { name } = formValues;
    const response = await reportService.editReportTypes({
      _id,
      name
    })
    const { status } = response
    if (status === 'failed') {
      toastr.error('Cannot Update Department');
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success('Login Successfully');
      setTimeout(() => setLoading(false), 1000)
      props.onHide({editDept: true})
    }
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={() => props.onHide({editDept: true})}
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1">Edit Incident Type</h2>
          </div>
          <form className="login-register text-start mt-20" action="#">
            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Name of Incident Type *
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
            </div>
            <div className="form-group">
              {disableForm() ? (
                <DisabledButton
                  title={"Update"}
                  className={"btn btn-brand-1 w-100"}
                />
              ) : !loading ? (
                <SubmitButton
                  onClick={handleSubmit}
                  title={"Update"}
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
