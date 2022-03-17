const jwt = require("jsonwebtoken");
const boardModel = require("../models/boardModel");

const createBoard = async (req, res) => {
  try {
    const userIdInfo = req.userId;
    let { todoList } = req.body;
    console.log(todoList)
    let boardGot = await boardModel.findOne({ userId: userIdInfo });
    if (boardGot) {
        console.log("1")
      boardGot.toDoList.push(todoList[0]);
      boardGot.save();
      return res
        .status(200)
        .send({ message: "Existing Board List", data: boardGot });
    } else {
        console.log("2")
      let createBoard = { userId: userIdInfo, toDoList: todoList };
      const boardData = await boardModel.create(createBoard);
      return res
        .status(201)
        .send({
          status: true,
          message: "Task Added successfully",
          data: boardData,
        });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    let paramsId = req.userId;
    let boardData = await boardModel.findOne({ userId: paramsId });
    if (boardData) {
      boardData.isDeleted = true;
    } else
      return status(400).send({
        status: false,
        message: "Enter Valid UserId or No Board Found",
      });

    boardData.save();
    return res
      .status(200)
      .send({ status: true, message: "Board Deleted Successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createBoard = createBoard;
module.exports.deleteBoard = deleteBoard;
