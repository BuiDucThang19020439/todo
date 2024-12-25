import "./TodoList.css";
import "css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import TableRow from "./TableRow";
import Pagination from "react-bootstrap/Pagination";
import { filterPaginationList } from "api/api";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { showToastMessage } from "reducer/toastSlice";
import debounce from 'lodash.debounce';

function TodoList({ toggleAddItemForm }) {
  // Lấy thông tin người đăng nhập hiện tại
  const token = Cookies.get("id");
  let order = 0; // order là số thứ tự hàng hiện trên bảng
  const dispatch = useDispatch();

  const [chosenPage, setChosenPage] = useState(1);
  const handleChosenPage = (page) => {
    setChosenPage(page);
  };
  // Các biến sử dụng cho việc phân trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [numberItemAPage, setNumberItemAPage] = useState(5); // Số item 1 trang
  const [numberOfPages, setNumberOfPage] = useState(1);
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  // Mỗi khi thay đổi số task hiển thị trên một page, quay về page 1
  const handleNumberItemAPage = (num) => {
    handleCurrentPage(1);
    setNumberItemAPage(num);
  };

  // filterWord là từ dùng cho việc tìm kiếm
  const [filterWord, setFilterWord] = useState("");
  const handleFilter = (data) => {
    setFilterWord(data);
  };
  // filterOption cho phép lựa chọn lọc theo cái gì (title, content, ...)
  const [filterOption, setFilterOption] = useState("");
  const handleFilterOption = (data) => {
    handleCurrentPage(1);
    handleFilter("");
    setFilterOption(data);
  };

  // taskList là danh sách nhiệm vụ ban đầu, sẽ không thay đổi
  const [taskList, setTaskList] = useState([]);
  const handleTaskList = (list) => {
    setTaskList(list);
  };

  /**
   * Hàm getTodoItem lấy dữ liệu từ db về và lọc ra những kết quả phù hợp với người đăng nhập
   * Thêm nextItemId lưu vào để khi thêm item mới không phải gọi lại api để kiểm tra id item cuối cùng
   * dấu cộng đặt trước string để chuyển đổi thành dạng số, nếu không 15 + 1 = 151
   */
  const getTodoItem = async () => {
    try {
      let response = await filterPaginationList(token, currentPage, numberItemAPage, filterOption, filterWord);
      handleTaskList(response.taskList);
      setNumberOfPage(response.totalPage);
    } catch (error) {
      console.log(error);
  }};

  // Get dữ liệu 1 lần từ db với useEffect
  useEffect(() => {
    getTodoItem();
  }, [currentPage, numberItemAPage, filterOption, filterWord]);

  const handleChosenPageOnClick = () => {
    if (chosenPage > numberOfPages || chosenPage < 1) {
      dispatch(
        showToastMessage({
          show: true,
          title: "Vượt quá số trang",
          message: `Hãy nhập số trang từ 1 đến ${numberOfPages}`,
          variant: "warning",
        })
      );
    } else handleCurrentPage(chosenPage);
  };
  const handleChosenPageEnterPress = (key) => {
    if (key === "Enter" && chosenPage <= currentPage && chosenPage > 0) {
      console.log(key);
      handleCurrentPage(chosenPage);
    }
  };

  const paginationRow = () => {
    return (
      <Pagination>
        <Pagination.First
          onClick={() => {
            if (currentPage !== 1) handleCurrentPage(1);
        }}/>
        <Pagination.Prev
          onClick={() => {
            if (currentPage > 1) handleCurrentPage(currentPage - 1);
        }}/>
        {numberOfPages <= 5 ? (
          Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              key={page}
              onClick={() => handleCurrentPage(page)}
              active={currentPage === page}
            >{page}</Pagination.Item>
          ))
        ) : (
          <>
            <Pagination.Item
              onClick={() => handleCurrentPage(1)}
              active={currentPage === 1}
            >1</Pagination.Item>
            <Pagination.Item
              onClick={() => handleCurrentPage(2)}
              active={currentPage === 2}
            >2</Pagination.Item>
            {currentPage === 3 && (
              <Pagination.Item active>3</Pagination.Item>
            )}
            <Pagination.Ellipsis />
            {currentPage > 3 && currentPage < numberOfPages - 1 && (
              <>
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Ellipsis />
              </>
            )}
            {currentPage === (numberOfPages - 1) && (
              <Pagination.Item active> {numberOfPages - 1} </Pagination.Item>
            )}
            <Pagination.Item
              onClick={() => handleCurrentPage(numberOfPages)}
              active={currentPage === numberOfPages}
            >{numberOfPages}</Pagination.Item>
            <InputGroup>
              <Form.Control
                className="pagination-choose-page"
                type="number"
                value={chosenPage}
                onChange={(event) => handleChosenPage(event.target.value)}
                onKeyDown={(event) => handleChosenPageEnterPress(event.key)}
              />
              <Button onClick={() => handleChosenPageOnClick()}>Đi</Button>
            </InputGroup>
          </>
        )}
        <Pagination.Next
          onClick={() => {
            if (currentPage < numberOfPages) handleCurrentPage(currentPage + 1);
        }}/>
        <Pagination.Last
          onClick={() => {
            if (currentPage !== numberOfPages) handleCurrentPage(numberOfPages);
        }}/>
        <Form>
          <Form.Select
            onChange={(e) => {handleNumberItemAPage(e.target.value)}}>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
          </Form.Select>
        </Form>
      </Pagination>
    );
  };
  return (
    <>
      {token > 0 && (
        <div className="todo-list">
          <Button className="button-add-todo-item" onClick={toggleAddItemForm}>Thêm</Button>
          <InputGroup className="mb-3 filter-input">
            <Form.Control
              aria-label="Text input with dropdown button"
              type="text"
              disabled={(filterOption !== "content" && filterOption !== "title")}
              value={filterWord}
              onChange={(event) => handleFilter(event.target.value)}
            />
            <Form.Select
              variant="outline-secondary"
              value={filterOption}
              onChange={(event) => handleFilterOption(event.target.value)}
              className="set-filter-option"
            >
              <option value="">--Lọc--</option>
              <option value="title">Tiêu đề</option>
              <option value="content">Nội dung</option>
              <option value="completed">Hoàn thành</option>
              <option value="not-completed">Chưa hoàn thành</option>
              <option value="important">Độ quan trọng</option>
            </Form.Select>
          </InputGroup>
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
            <tbody>
              {taskList.map((task) => {
                return (
                  <TableRow
                    key={task._id}
                    task={task}
                    order={++order}
                    getTodoItem={getTodoItem}
                    setCurrentPage={setCurrentPage}
                  ></TableRow>
                );
              })}
            </tbody>
            <tfoot><tr><td colSpan={7}>{paginationRow()}</td></tr></tfoot>
          </Table>
        </div>
      )}
    </>
  );
}
export default TodoList;