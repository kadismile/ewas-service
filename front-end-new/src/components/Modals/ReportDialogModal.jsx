
import { Modal } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { setReport } from "../../redux/user-slice.js";
import { store } from '../../redux/store';
import { useNavigate } from 'react-router-dom';


import styles from './report.module.css'
export default function ReportDialogModal(props) {
  const navigate = useNavigate();
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }

  const dispatch = useDispatch();

  const report = (type) => {
    dispatch(setReport(type))
    return navigate('/report');
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
        <button className={styles.left_button} onClick={()=> report('anonymously')}>Anonymously</button>
        <button className={styles.right_button} onClick={handleClick}>Openly</button>
    </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};
