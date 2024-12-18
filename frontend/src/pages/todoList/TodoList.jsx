import "./TodoList.css";
import "css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import TableRow from "./TableRow";
import Pagination from "react-bootstrap/Pagination";
import { getTaskList } from "api/api";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function TodoList({ toggleAddItemForm }) {
  // Lấy thông tin người đăng nhập hiện tại
  const token = Cookies.get("id");
  let order = 0; // order là số thứ tự hàng hiện trên bảng

  /**
   * filterWord là từ dùng cho việc tìm kiếm
   */
  const [filterWord, setFilterWord] = useState("");
  const handleFilter = (data) => {
    setFilterWord(data);
  };
  /**
   * filterOption cho phép lựa chọn lọc theo cái gì (title, content, ...)
   */
  const [filterOption, setFilterOption] = useState("");
  const handleFilterOption = (data) => {
    handleCurrentPage(1);
    handleFilter("");
    setFilterOption(data);
  };
  /**
   * taskList là danh sách nhiệm vụ ban đầu, sẽ không thay đổi
   */
  const [taskList, setTaskList] = useState([]);
  const handleTaskList = (list) => {
    setTaskList(list);
  };
  /**
   * filterList là danh sách sau khi lọc, sẽ thay đổi, phân trang dựa vào danh sách này
   */
  const [filterList, setFilterList] = useState([]);

  /**
   * Hàm so sánh dựa theo độ quan trọng
   */
  const compareDataByImportant = (a, b) => {
    const importantOrder = {
      "Không quan trọng": 1,
      "Ít quan trọng": 2,
      "Quan trọng": 3,
      "Khẩn cấp": 4,
    };
    return importantOrder[b.important] - importantOrder[a.important];
  };

  /**
   * Hàm getTodoItem lấy dữ liệu từ db về và lọc ra những kết quả phù hợp với người đăng nhập
   * Thêm nextItemId lưu vào để khi thêm item mới không phải gọi lại api để kiểm tra id item cuối cùng
   * dấu cộng đặt trước string để chuyển đổi thành dạng số, nếu không 15 + 1 = 151
   */
  const getTodoItem = async () => {
    try {
      let response = await getTaskList();
      handleTaskList(
        response.filter((task) => +task.userId === +(token || -1))
      );
      setFilterList(response.filter((task) => +task.userId === +(token || -1)));
    } catch (error) {
      console.log(error);
    }
  };

  // Get dữ liệu 1 lần từ db với useEffect
  useEffect(() => {
    getTodoItem();
  }, []);

  // lọc danh sách hiện tại theo filterOption
  const handleFilterList = () => {
    let Term = () => {
      switch (filterOption) {
        case "":
          return taskList;
        case "important":
          return taskList.sort(compareDataByImportant);
        case "completed":
          return taskList.filter((item) => item.completed === true);
        case "not-completed":
          return taskList.filter((item) => item.completed === false);
        default:
          return taskList.filter((item) =>
            item[filterOption].toLowerCase().includes(filterWord.toLowerCase())
          );
      }
    };
    setFilterList(Term());
  };
  // thay đổi filterList để hiển thị danh sách đã lọc dựa theo filterOption và filterWord
  // phân ra 2 useEffect để tránh render vô hạn
  useEffect(() => {
    handleFilterList();
  }, [filterOption, filterWord]);

  // Các biến sử dụng cho việc phân trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [numberItemAPage, setNumberItemAPage] = useState(5); // Số item 1 trang
  const indexOfLastItem = currentPage * numberItemAPage; // index vị trí cuối cùng của trang hiện tại
  const indexOfFirstItem = indexOfLastItem - numberItemAPage; // index vị trí đầu tiên của trang hiện tại
  const numberOfPages = Math.ceil(filterList.length / numberItemAPage) || 1; // Tổng số trang
  const pages = []; // mảng các trang (1, 2, 3,... )
  for (let i = 1; i <= numberOfPages; i++) pages.push(i);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  // Mỗi khi thay đổi số task hiển thị trên một page, quay về page 1
  const handleNumberItemAPage = (num) => {
    handleCurrentPage(1);
    setNumberItemAPage(num);
  };

  /**
   * render thanh phân trang(1, 2, 3...)
   */
  const pagesListRender = pages.map((page) => {
    return (
      <Pagination.Item
        key={page}
        active={currentPage === page}
        onClick={() => handleCurrentPage(page)}
      >
        {page}
      </Pagination.Item>
    );
  });

  return (
    <>
      {token > 0 && (
        <div className="todo-list">
          <Button className="button-add-todo-item" onClick={toggleAddItemForm}>
            Thêm
          </Button>
          <InputGroup className="mb-3 filter-input">
            <Form.Control
              aria-label="Text input with dropdown button"
              type="text"
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
              {filterList
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((task) => {
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
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <Pagination>
                    <Pagination.First
                      onClick={() => {
                        if (currentPage !== 1) handleCurrentPage(1);
                      }}
                    />
                    <Pagination.Prev
                      onClick={() => {
                        if (currentPage > 1) handleCurrentPage(currentPage - 1);
                      }}
                    />
                    {pagesListRender}
                    <Pagination.Next
                      onClick={() => {
                        if (currentPage < numberOfPages)
                          handleCurrentPage(currentPage + 1);
                      }}
                    />
                    <Pagination.Last
                      onClick={() => {
                        if (currentPage !== numberOfPages)
                          handleCurrentPage(numberOfPages);
                      }}
                    />
                    <Form>
                      <Form.Select
                        onChange={(e) => {
                          handleNumberItemAPage(e.target.value);
                        }}
                      >
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
