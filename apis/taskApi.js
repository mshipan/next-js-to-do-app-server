const express = require("express");
const { ObjectId } = require("mongodb");

const tasksApi = (tasksColloection) => {
  const taskRouter = express.Router();

  // get api
  taskRouter.get("/", async (req, res) => {
    const result = await tasksColloection.find().toArray();
    res.send(result);
  });

  // post api
  taskRouter.post("/", async (req, res) => {
    const newTask = req.body;
    newTask.status = "incomplete";
    const result = await tasksColloection.insertOne(newTask);
    res.send(result);
  });

  return taskRouter;
};

module.exports = tasksApi;
