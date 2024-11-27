import "./TodoList.css";
import "../css/icon.css";
import TableRow from "./TableRow";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";
import { getTaskList} from "../api/api";
import { useState, useEffect } from "react";

function TodoList({ toggleAddItemForm }) {
  // Lấy thông tin người đăng nhập hiện tại
  const user = useSelector((state) => state.handleLogin.loggedUserInfo);
  
  let order = 0; // order là số thứ tự hàng hiện trên bảng

  // taskList là danh sách các hàng lấy từ database
  const [taskList, setTaskList] = useState([]); 
  const handleTaskList = (tasks) => {
    setTaskList(tasks);
  }

  const [currentPage,setCurrentPage] = useState(1); // Trang hiện tại
  const [numberItemAPage, setNumberItemAPage] = useState(5); // Số item 1 trang
  const indexOfLastItem = currentPage*numberItemAPage; // index vị trí cuối cùng của trang hiện tại 
  const indexOfFirstItem = indexOfLastItem - numberItemAPage; // index vị trí đầu tiên của trang hiện tại
  const numberOfPages = Math.ceil(taskList.length / numberItemAPage); // Tổng số trang
  const pages = []; // mảng các trang (1, 2, 3,... )
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i);
    };
  
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  }
  const handleNumberItemAPage = (num) => {
    setNumberItemAPage(num);
  }

  /**
   * Hàm getTodoItem lấy dữ liệu từ db về và lọc ra những kết quả phù hợp với người đăng nhập
   * Thêm nextItemId lưu vào để khi thêm item mới không phải gọi lại api để kiểm tra id item cuối cùng
   * dấu cộng đặt trước string để chuyển đổi thành dạng số, nếu không 15 + 1 = 151
   */
  const getTodoItem = async () => {
    try {
      const response = await getTaskList();
      let newArr = response.filter((task) => task.userId === user.id);
      handleTaskList(newArr);
      localStorage.setItem("nextItemId", +response[response.length-1].id  + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodoItem();
    if (numberOfPages && numberOfPages < currentPage) handleCurrentPage(numberOfPages);
  }, [taskList]);

  // lấy các task theo trang được phân
  const paginatedList = taskList.slice(indexOfFirstItem, indexOfLastItem);
  // rowList: chuyển dữ liệu tasklist thành html để hiện ra giao diện
  const rowList =
    paginatedList.map((task) => {
      return (
        <TableRow key={task.id} task={task} order={++order}></TableRow>
      );
    }) || [];

    const pagesListRender = pages.map((page) => {
      return(
        <Pagination.Item key={page} active={currentPage === page} onClick={()=>handleCurrentPage(page)}>{page}</Pagination.Item>
      )}) 
    
  return (
    <>
      {user.loginStatus === true && (
        <div className="todo-list">
          <Button className="button-add-todo-item" onClick={toggleAddItemForm}>
            Thêm
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="table-checkbox">
                  <input type="checkbox"></input>
                </th>
                <th className="table-order">#</th>
                <th className="table-title">Tiêu đề</th>
                <th className="table-content">Nội dung</th>
                <th className="table-deadline">Hạn</th>
                <th className="table-importance">Quan trọng</th>
                <th className="table-modify">Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>{rowList}</tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <Pagination>
                    <Pagination.First onClick={() => {if(currentPage!==1) handleCurrentPage(1)}}/>
                    <Pagination.Prev onClick={() => {if(currentPage>1) handleCurrentPage(currentPage-1)}}/>
                    {pagesListRender}
                    <Pagination.Next onClick={() => {if(currentPage<numberOfPages) handleCurrentPage(currentPage+1)}}/>
                    <Pagination.Last onClick={() => {if(currentPage!==numberOfPages) handleCurrentPage(numberOfPages)}}/>
                    <Form >
                      <Form.Select onChange={(e) => {handleNumberItemAPage(e.target.value)}}>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                      </Form.Select>
                    </Form>
                  </Pagination>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      )}
    </>
  );
}

export default TodoList;