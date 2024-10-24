import './TodoList.css';
import '../css/icon.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

function TodoList ({showAddTodoItem}) {
    return (
        <div className='todo-list'>
            <Button className='button-add-todo-item' onClick={showAddTodoItem}>Thêm</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Ngày hoàn thành</th>
                        <th>Quan trọng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Việc nhà</td>
                        <td>Giặt đồ</td>
                        <td>?</td>
                        <td>Không quan trọng</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
};

export default TodoList;