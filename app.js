const express = require('express');
const methodOverride = require('method-override')
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { v4: uuid } = require('uuid');
uuid();

// mongoose接続
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('接続OK')
    } catch (e) {
        console.log('接続エラー:', e);
    }
}
main();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//サンプル
let task = [
    {
        task: "math",
        id: uuid()
    },
    {
        task: "English",
        id: uuid()
    },
    {
        task: "P.E",
        id: uuid()
    }
]


app.get('/home', (req, res) => {
    res.send('ホーム');
})

//todoがlist.ejsにわたる
app.get('/todo', (req, res) => {
    res.render('list', { task })
})

//postリクエスト受付↓
//req.bodyはapp.use(express.urlencoded({ extended: true }));で変換しないと見れない
app.post('/todo', (req, res) => {
    const { task: tName } = req.body;
    task.push({ task: tName, id: uuid() })
    console.log(task)
    res.redirect('/todo');
});

app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const selectedTask = task.find(t => t.id === id)
    res.render('show', { selectedTask });
});

app.get('/todo/:id/edit', (req, res) => {
    const { id } = req.params;
    const selectedTask = task.find(t => t.id === id)
    res.render('edit', { selectedTask })
})

app.patch('/todo/:id', (req, res) => {
    const { id } = req.params;
    const newTask = req.body.task;
    const foundDoit = task.find(t => t.id === id);
    foundDoit.task = newTask;
    res.redirect('/todo');
});

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    task = task.filter(t => t.id !== id)
    res.redirect('/todo');
});

app.get('/new', (req, res) => {
    res.render('new');
})

app.post('/new', (req, res) => {

});

app.listen(3000, () => {
    console.log('/////起動成功/////')
})