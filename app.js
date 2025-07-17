const express = require('express');
const methodOverride = require('method-override')
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Task = require('./models/tasks');
const { console } = require('inspector');
const { getPriority } = require('os');


// ---mongoose接続---
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taskStorage');
        console.log('mongoDBOK')
    } catch (e) {
        console.log('mongoDBError:', e);
    }
}
main();


// -----------------------------
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// ---------

const priorities = ["今日中", "今週中", "今月中"]


app.get('/home', (req, res) => {
    res.send('ホーム');
})

app.get('/todo', async (req, res) => {
    const tasks = await Task.find({})
    res.render('list', { tasks })
})

//postリクエスト受付↓
//req.bodyはapp.use(express.urlencoded({ extended: true }));で変換しないと見れない
app.post('/todo', async (req, res) => {
    const newTask = new Task(req.body);
    //↑new Task(req.body)今回は項目が少ないからいいけど、もし多数のデータ項目の中からいくつかのデータを持ってくる
    // 場合は分割代入new Task ({name, priority})のほうがいい
    await newTask.save();
    res.redirect(`/todo/${newTask._id}`)
});

app.get('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id)
    res.render('show', { task });
});

app.get('/todo/:id/edit', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id)
    res.render('edit', { task, priorities })
})

app.patch('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    //{ runValidators: true, new: true }
    res.redirect(`/todo/${task._id}`);
});

app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id)
    res.redirect('/todo');
});

app.get('/new', (req, res) => {
    res.render('new', { priorities });
})


app.listen(3000, () => {
    console.log('/////起動成功/////')
})