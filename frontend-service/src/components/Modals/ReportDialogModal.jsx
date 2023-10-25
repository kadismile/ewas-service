"use client";
import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";
import { useAppDispatch } from "@/redux/store.js";
import { setReport } from "@/redux/user-slice.js";

import styles from "./report.module.css";
export default function ReportDialogModal(props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const report = (type) => {
    dispatch(setReport(type));
    router.push("/report");
  };
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Report An Incident </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.container}>
          <button
            className={styles.left_button}
            onClick={() => report("anonymously")}
          >
            Anonymously
          </button>
          <button className={styles.right_button}>Volunteer</button>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
