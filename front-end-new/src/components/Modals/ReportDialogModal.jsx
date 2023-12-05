
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

  const handleClick = () => {
    if (!user) {
      return navigate('/login');
    }
    return navigate('/report');
  }

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered 
      show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Report An Incident </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={styles.container}>
        <button className={styles.left_button} onClick={()=> navigate('/report')}>Anonymously</button>
        <button className={styles.right_button} onClick={handleClick}>Openly</button>
    </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};
