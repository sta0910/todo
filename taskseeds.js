const mongoose = require("mongoose");
const Task = require('./models/tasks');


async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taskStorage');
        console.log('mongoDBOK')
    } catch (e) {
        console.log('mongoDBError:', e);
    }
}
main();

const td = new Task({
    name: 'JavaScript基礎',
    priority: '今週中'
})
td.save().then(t => console.log(t)
        ).catch(e => console.log(e))