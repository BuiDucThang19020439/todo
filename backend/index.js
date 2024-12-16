const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task.model.js");
const app = express();
const port = 3001;

app.use(express.json());

// trang home
app.get("/", (req, res) => {
  res.send("Hello from World");
});

// lấy tất cả danh sách
app.get("/api/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ messeage: error.messeage });
  }
});

// lấy một phần tử theo Id
app.get("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ messeage: error.messeage });
  }
});

// Thêm một phần tử
app.post("/api/task", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ messeage: error.messeage });
  }
});

// update một task
app.put("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, res.body);
    if (!task) {
      res.status(404, "Not found");
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ messeage: error.messeage });
  }
});

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
