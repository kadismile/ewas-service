import { store } from '../redux/store';
import { Modal } from 'react-bootstrap';
import { SubmitButton } from '../components/elements/Buttons';
import { reportService } from '../services/reportsService';
import toastr from 'toastr';

export const AssignmentModal = (props) => {

  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }
  const handleSubmit = async () => {
    const data = {
      reportId: props.data,
      userId: user._id
    }
    const response = await reportService.acceptReport(data)
    const { message } = response
    toastr.success(message, { timeOut: 6000 });
    props.onHide({closeAssModal: true })
  }
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={() => props.onHide({closeAssModal: true })}
      size="md"
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
            <h5 className="mt-10 mb-5 text-brand-1">Work on this Report  </h5>
          </div>
        <div className="d-flex justify-content-center">
          <div className="form-group">
            <SubmitButton
              onClick={handleSubmit}
              title={"Accept"}
              className={"btn btn-success w-10"}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SubmitButton
              onClick={() => props.onHide({closeAssModal: true})}
              title={"Decline"}
              className={"btn btn-danger w-10"}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}