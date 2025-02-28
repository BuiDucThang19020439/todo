import "./TodoForm.css";
import "css/icon.css";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "reducer/toastSlice";
import Button from "react-bootstrap/Button";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { addTask } from "api/taskApi";
import { useNavigate } from "react-router-dom";

function TodoForm({ toggleAddItemForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Lấy thông tin của người dùng đăng nhập
  const user = useSelector((state) => state.handleLogin.loggedUserInfo);

  return (
    <div className="background">
      <Formik
        initialValues={{
          userId: 0,
          title: "",
          content: "",
          deadline: "",
          important: "Không quan trọng",
          completed: false,
          loginStatus: false,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Tiêu đề không được để trống"),
          content: Yup.string().required("Nội dung không được để trống"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          addTask({
            userId: user.id,
            title: values.title,
            content: values.content,
            deadline: values.deadline,
            important: values.important,
            completed: false,
            loginStatus: false,
          });
          toggleAddItemForm();
          dispatch(
            showToastMessage({
              show: true,
              title: "Thành Công",
              message: "Thêm thành công nhiệm vụ",
              variant: "success",
            })
          );
          setSubmitting(false);
          navigate(0);
        }}
      >
        <Form className="form-add-item">
          <h3>Thêm việc</h3>
          <Button
            type="button"
            className="button-icon button-icon-close-form"
            id="close-add-form"
            onClick={toggleAddItemForm}
          >
            <ion-icon name="close-sharp" size="large"></ion-icon>
          </Button>
          <MyTextInput
            label="Tiêu đề"
            type="text"
            placeholder="Nhập tiêu đề"
            name="title"
          />
          <MyTextInput
            label="Nội dung"
            type="text"
            placeholder="Nhập nội dung công việc"
            name="content"
          />
          <MyTextInput label="Hạn hoàn thành" type="date" name="deadline" />
          <MySelect
            label="Độ quan trọng"
            name="important"
            className="select-item-importance"
          >
            <option value="Không quan trọng">Không quan trọng</option>
            <option value="Ít quan trọng">Ít quan trọng</option>
            <option value="Quan trọng">Quan trọng</option>
            <option value="Khẩn cấp">Khẩn cấp</option>
          </MySelect>
          <Button className="button-submit-todo-item" type="submit">
            Gửi
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

function MySelect({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}></select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

export default TodoForm;
