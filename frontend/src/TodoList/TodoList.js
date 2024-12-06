import "./TodoList.css";
import "../css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import TableRow from "./TableRow";
import Pagination from "react-bootstrap/Pagination";
import { getTaskList } from "../api/api";
import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

function TodoList({ toggleAddItemForm }) {
  // Lấy thông tin người đăng nhập hiện tại
  const token = Cookies.get("id");
  let order = 0; // order là số thứ tự hàng hiện trên bảng

  const [filterWord, setFilterWord] = useState("");
  const handleFilter = (data) => {
    setFilterWord(data);
  };
  const [filterOption, setFilterOption] = useState("");
  const handleFilterOption = (data) => {
    handleCurrentPage(1);
    handleFilter("");
    setFilterOption(data);
  };
  const [taskList, setTaskList] = useState([]);
  const handleTaskList = (list) => {
    setTaskList(list);
  };
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
      localStorage.setItem("nextItemId", +response[response.length - 1].id + 1);
      handleTaskList(
        response.filter((task) => +task.userId === +(token || -1))
      );
      setFilterList(response.filter((task) => +task.userId === +(token || -1)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodoItem();
  }, []);

  // lọc danh sách hiện tại
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
  useEffect(() => {
    handleFilterList();
  }, [filterOption, filterWord]);

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
  const handleNumberItemAPage = (num) => {
    handleCurrentPage(1);
    setNumberItemAPage(num);
  };

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
              <option value="">---Lọc---</option>
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
                      key={task.id}
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
