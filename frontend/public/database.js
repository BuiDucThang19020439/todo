localStorage.setItem("user", JSON.stringify([
    {
        userId: 1,
        username: 'root',
        password: 'admin',
    }, 
    {
        userId: 2,
        username: 'van hai',
        password: 'vh01',
    }, 
    {
        userId: 3,
        username: 'ngoc hoa',
        password: 'nh02',
    }
]));

// let user = JSON.parse(localStorage.getItem("user"));
// console.log(user);

localStorage.setItem("task_list", JSON.stringify([
    {
        id: 1,
        userId: 1,
        title: "Việc nhà",
        content: "Giặt đồ",
        deadline: "2024-12-30",
        important: "Không quan trọng",
    },
    {
        id: 2,
        userId: 1,
        title: "Việc nhà",
        content: "Phơi đồ",
        deadline: "2024-12-30",
        important: "Không quan trọng",
    },
    {
        id: 3,
        userId: 2,
        title: "Công việc",
        content: "Viết API",
        deadline: "2024-12-30",
        important: "Rất quan trọng",
    },
    {
        id: 4,
        userId: 3,
        title: "Công việc",
        content: "Validate form",
        deadline: "2024-12-30",
        important: "Quan trọng",
    }
]));

// let taskList = JSON.parse(localStorage.getItem("task_list"));
// console.log(taskList);

// localStorage.clear();