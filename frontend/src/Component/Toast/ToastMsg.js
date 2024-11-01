import "./ToastMsg.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { useState } from "react";

function ToastMsg({ variant, title, msg }) {
  const [showToast, setShowToast] = useState(true);
  return (
      <ToastContainer
        className="p-3 toast-container"
        style={{zIndex: 1}}
      >
        <Toast
          bg={variant}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={13200}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
  );
};

export default ToastMsg;
