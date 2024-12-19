const express = require("express");
const mongoose = require("mongoose");
const taskRoute = require("./routes/task.route.js");
const { faker } = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//loại bỏ lỗi cors
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//routes
app.use("/api/taskList", taskRoute);

// kết nối đến mongodb
const uri = "mongodb+srv://19020434:qwertyuiop@cluster.kgugm.mongodb.net/test";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

// fake dữ liệu
// async function seedDb() {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const collection = client.db("test").collection("task_lists");
//     let newList = [];
//     for (let i = 0; i < 200; i++) {
//       const newTask = {
//         userId: faker.number.int({ min: 1, max: 3 }),
//         title: "Thượng đài",
//         content: "Đấu với " + faker.person.fullName(),
//         deadline: faker.date.between({
//           from: "2025-01-01T00:00:00.000Z",
//           to: "2030-01-01T00:00:00.000Z",
//         }),
//         important: "Không quan trọng",
//         completed: faker.datatype.boolean(),
//       };
//       newList.push(newTask);
//     }
//     await collection.insertMany(newList);
//   } catch (error) {
//     console.log(error);
//   }
// }

// seedDb();
