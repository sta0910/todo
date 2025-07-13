const express = require('express');
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get('/home', (req, res) => {
    res.send('ホーム');
})

app.get('/todo', (req, res) => {
    res.send('成功！')
})

//postリクエスト受付↓
//req.bodyはapp.use(express.urlencoded({ extended: true }));で変換しないと見れない
app.post('/todo', (req, res) => {
    const { todo } = req.body;
    res.send(`${todo}を追加しました`)
});

app.get('/todo/:id', (req, res) => { });

app.put('/todo/:id', (req, res) => { });

app.delete('/todo/:id', (req, res) => { });

app.get('/new', (req, res) => {
    res.render('new');
})

app.post('/new', (req, res) => {
    console.log(req.body); // { todo: 'ユーザーが入力した内容' }
});



app.listen(3000, () => {
    console.log('起動成功')
})