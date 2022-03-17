const jwt = require('jsonwebtoken');
const boardModel = require('../models/boardModel')

const createTask = async (req, res) => {
    try {
        let reqBody = req.body;
        if(reqBody){
            let taskCreated = await boardModel.create(reqBody);
            return res.status(200).send({ status: true, message:"Task Added Successfully", data: taskCreated });

        }else
            return res.status(400).send({status:false, message: "Enter The Task Details to Proceed"});
    } catch (err) {
        return res.status(500).send({status:false, message:err.message});
    }
}



const updateTask = async (req, res) => {
    try {
        const userIdInfo = req.userId
        let { taskId, taskTitle , status} = req.body
       
        let boardFound = await boardModel.findOne({ userId: userIdInfo });
        if (!boardFound) {
            return res.status(400).send({ status: false, message: "Your taskList not found" });;
        }
        let len = boardFound.toDoList.length
        let toDoList = boardFound.toDoList
        //let taskUpdated;
        for (let i = 0; i < len; i++) {
            if (toDoList[i]._id == taskId) {
                toDoList[i].taskTitle = taskTitle
                //taskUpdated = toDoList[i].taskTitle
                toDoList[i].status = status;
                break;
            }
        }
       
        boardFound.save()
        return res.status(200).send({ message: `Your task has been updated ${taskTitle}`, data: boardFound })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


const deleteTask = async (req, res) => {
    try {
        const userIdInfo = req.userId
        const taskId = req.body.taskId
        let boardFound = await boardModel.findOne({ userId: userIdInfo });
        if (!boardFound) {
            return res.status(400).send({ status: false, message: "Your task board not not found" });;
        }
        let len = boardFound.toDoList.length
        let toDoList = boardFound.toDoList
       
        for (let i = 0; i < len; i++) {
            if (toDoList[i]._id == taskId) {
                toDoList.splice(i, 1)
                break;
            }
        }
        boardFound.save()
        return res.status(200).send({ message: "You have deleted the task.", data: boardFound })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = {createTask, getTasks, updateTask , deleteTask}





