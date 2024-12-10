import "./ToastMsg.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { hideToastMessage } from "reducer/toastSlice";

function ToastMsg() {
  const toastAttr = useSelector((state) => {
    return state.handleToastMessage;
  });

  const dispatch = useDispatch();
  return (
    <ToastContainer className="p-3 toast-container" style={{ zIndex: 3 }}>
      <Toast
        bg={toastAttr.variant}
        onClose={() => dispatch(hideToastMessage())}
        show={toastAttr.show}
        delay={3200}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{toastAttr.title}</strong>
        </Toast.Header>
        <Toast.Body>{toastAttr.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMsg;
