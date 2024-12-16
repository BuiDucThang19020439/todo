const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task.model.js");
const taskRoute = require("./routes/task.route.js");
const app = express();
const port = 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/tasks", taskRoute);

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
