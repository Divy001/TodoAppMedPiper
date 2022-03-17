const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const boardSchema = new mongoose.Schema({
    
    userId: {
        type: ObjectId,
        required: true
    },

    toDoList: [
        {
            taskTitle: {
                type: String,
                required: true,
            },

            status: {
                type: String,
                required: true,
                enum: ["ToDo","Doing", "Done",],
                default: "ToDo"
            },
        }
    ]

},{timestamps:true});

module.exports = mongoose.model('Board', boardSchema);