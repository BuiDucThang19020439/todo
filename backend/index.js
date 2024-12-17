const express = require("express");
const mongoose = require("mongoose");
const taskRoute = require("./routes/task.route.js");
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
const uri =
  "mongodb+srv://19020434:qwertyuiop@cluster.kgugm.mongodb.net?retryWrites=true&w=majority&appName=Cluster";
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
