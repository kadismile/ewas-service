import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toastr from 'toastr';
import { DisabledButton, LoadingButton, SubmitButton } from "../components/elements/Buttons"
import { reportService } from '../services/reportsService';


export const AddReportTypeModal = (props) => {
  const formFields = {
    name: '',
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
    props.onHide({addDept: true})
    event.preventDefault();
    setLoading(true);
    const { name } = formValues;
    const response = await reportService.addReportType({
      name
    })
    const { status } = response
    if (status === 'failed') {
      toastr.error('Cannot Update Department');
      setTimeout(() => setLoading(false), 1000)
    } else {
      toastr.success('Operation Successfully');
      setTimeout(() => setLoading(false), 1000)
      props.onHide({addDept: true})
    }
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={props.show}
      onHide={() => props.onHide({addDept: true})}
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1">Add Report Type</h2>
          </div>
          <form className="login-register text-start mt-20" action="#">
            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Name of Report Type *
              </label>
              <input
                className="form-control"
                id="input-1"
                type="text"
                name="name"
                placeholder="name of report type"
                onChange={handleChange}
                value={formValues.name}
              />
            </div>
            
            <div className="form-group">
              {disableForm() ? (
                <DisabledButton
                  title={"Submit"}
                  className={"btn btn-brand-1 w-100"}
                />
              ) : !loading ? (
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
