const express = require("express");
const mongoose = require("mongoose");
const taskRoute = require("./routes/task.route.js");
const userRoute = require("./routes/user.route.js");
const dotenv = require('dotenv');
const _ = require("lodash");
const { errorHandler } = require("./middlewares/errorMiddlewares.js");
// const { faker } = require("@faker-js/faker");
// const MongoClient = require("mongodb").MongoClient;
dotenv.config();

const app = express();
const port = process.env.EXPRESS_APP_PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

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
app.use("/api/user", userRoute);


// kết nối đến mongodb
const uri = process.env.EXPRESS_APP_MONGODB_URI;
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
//     const contentList = ["Mua quả", "Trồng cây", "Tặng quả"];
//     const priortyList = ["Khẩn cấp", "Quan trọng", "Không quan trọng"];
//     let newList = [];
//     for (let i = 0; i < 50; i++) {
//       const newTask = {
//         userId: faker.number.int({ min: 1, max: 3 }),
//         title: "Hoa quả",
//         content: _.sample(contentList) + " " + faker.food.fruit(),
//         deadline: faker.date.between({
//           from: "2025-01-01T00:00:00.000Z",
//           to: "2030-01-01T00:00:00.000Z",
//         }),
//         important: _.sample(priortyList),
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
