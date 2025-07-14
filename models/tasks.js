const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    task: { type: String, required: true },
    until: { type: String, required: true }
})

module.exports = mongoose.model("Task", taskSchema)