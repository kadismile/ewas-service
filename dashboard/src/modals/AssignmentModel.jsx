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
    props.onHide()
  }
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
      size="lg"
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
            <h5 className="mt-10 mb-5 text-brand-1">Work on this Report  </h5>
          </div>
        <div className="form-group">
          <SubmitButton
            onClick={ handleSubmit }
            title={"Accept"}
            className={"btn btn-brand-1 w-100"}
          />
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}