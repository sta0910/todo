const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: { type: String, required: true },
    priority: {
        type: String,
        enum: ["今日中", "今週中", "今月中"]
    }
})

const Task = mongoose.model('Task', taskSchema)


module.exports = mongoose.model("Task", taskSchema)