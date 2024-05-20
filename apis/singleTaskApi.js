const express = require("express");
const { ObjectId } = require("mongodb");

const singleTasksApi = (tasksColloection) => {
  const singleTaskRouter = express.Router();

  // put / update api
  singleTaskRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateTask = req.body;
    const newTask = {
      $set: {
        taskTitle: updateTask.taskTitle,
        taskDescription: updateTask.taskDescription,
        date: updateTask.date,
        assignTo: updateTask.assignTo,
      },
    };
    const result = await tasksColloection.updateOne(filter, newTask, options);
    res.send(result);
  });

  // delete api
  singleTaskRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await tasksColloection.deleteOne(query);
    res.send(result);
  });

  // patch api
  singleTaskRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateStatus = {
      $set: {
        status: status,
      },
    };
    const result = await tasksColloection.updateOne(filter, updateStatus);
    res.send(result);
  });

  return singleTaskRouter;
};

module.exports = singleTasksApi;
