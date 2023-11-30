import {useState, useEffect} from 'react'
import { store } from '../redux/store';
import { Modal } from 'react-bootstrap';
import { DisabledButton, LoadingButton, SubmitButton } from '../components/elements/Buttons';
import { reportService } from '../services/reportsService';
import toastr from 'toastr';
import Select from 'react-select';
import { RespondersDropDown } from '../components/elements/RespondersDropDown';


export const VerifyReportModal = (props) => {
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }
  const formFields = {
    comments: ''
  };

  const verificationOptions = () => {
      return [
      {
        value: 'verified',
        label: 'verified'
      },
      {
        value: 'false-report',
        label: 'false-report'
      },
      {
        value: 'returned',
        label: 'returned'
      }
    ]
  }

  const verificationMethods = () => {
    return [
      {
        value: 'sms',
        label: 'sms'
      },
      {
        value: 'phone calls',
        label: 'phone calls'
      },
      {
        value: 'emails',
        label: 'emails'
      },
    ]
  }

  const customStyles = {
    input: (provided) => ({
      ...provided,
      width: 100,
      height: 38,
      display: 'flex',
      alignItems: 'center',
    }),
    singleValue: (provided) => ({
      ...provided,
      marginTop: 2,
    }),
  };

  const [submitForm, setSubmitForm] = useState(false);
  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  });
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [responder, setResponder] = useState('');

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
      case "comments":
        errors.comments = "";
        if (value.length < 10) {
          errors.comments = "comments must be more than 10 characters";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.comments;
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

  const handleClick = async (data) => {
    const { value } = data
    setSelectedOption(value)
  }

  const handleMethodClick = async (data) => {
    const { value } = data
    setSelectedMethod(value)
  }

  const handleData = (data) => {
    const { value } = data
    setResponder(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { comments } = formValues
    const data = {
      comments,
      verified: selectedOption,
      reportId: props.data,
      userId: user._id,
      verificationMethod: selectedMethod,
      responder,
    }
    const response = await reportService.verifyReport(data)
    const { message } = response
    toastr.success(message, { timeOut: 6000 });
    props.onHide({closeVerifyModal: true })
  }

  const { errors} = formValues

  const closeModal = () => {
    props.onHide({closeVerifyModal: true })
  }

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={closeModal}
      size="md"
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
            <h5 className="mt-10 mb-5 text-brand-1">{props.title} </h5>
          </div>
        <div className="form-group">
        <form className="login-register text-start mt-20" action="#">
          {
            props.depAcronym === 'CAMS' &&
          <>
              <Select
                styles={customStyles}
                defaultValue={{ label: 'Verification Method', value: selectedMethod }}
                onChange={ handleMethodClick }
                options={ verificationMethods() }
                className={'select-react'}
              />
              <br/>

              <Select
                styles={customStyles}
                defaultValue={{ label: 'Verify Report', value: selectedOption }}
                onChange={ handleClick }
                options={ verificationOptions() }
                className={'select-react'}
              />
              <br/>
              <br/>
              </>
            }
            
            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Comments *
              </label>
              <div class="form-group mb-30"> 
                <textarea class="form-control"
                  name="comments" 
                  rows="5"
                  onChange={handleChange}
                  value={formValues.comments}
                >
                </textarea>
                { errors.comments ? <span className="form_error"> {errors.comments}</span> : ""}
              </div>
            </div>

            { props.depAcronym === 'SSS' &&
              <RespondersDropDown dataToComponent={handleData} />
            }

            <br/>
            <br/>
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
          
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}