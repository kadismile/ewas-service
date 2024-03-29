
import { Modal } from 'react-bootstrap';
import { store } from '../../redux/store';
import { useNavigate } from 'react-router-dom';


import styles from './report.module.css'
export default function ReportDialogModal(props) {
  const navigate = useNavigate();
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }

  const handleClick = (response) => {
    if (response) {
      props.onHide()
      return navigate('/report');
    } else {
      if (!user) {
        const state = { from: 'reportDialog' };
        props.onHide()
        return navigate('/login', { state: { state } });
      } else {
        props.onHide()
        return navigate('/volunteer-report');
      }
    }
  }
  
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered 
      show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title> <h6 style={{textAlign: 'center'}}>Do You Want To Report Anonymously ? </h6></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={styles.container}>
        <button className={styles.right_button} onClick={() => handleClick(true)}>Yes</button>
        <button className={styles.left_button} onClick={() => handleClick(false)}>No</button>
    </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};
