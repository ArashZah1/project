const express = require('express')
const app = express()
const path = require('path');

app.get('/', function (req,res) {
    res.sendFile( path.join(__dirname, 'public/index.html'))
})

app.get('/index', function (req,res) {
    res.sendFile( path.join(__dirname, 'public/index.css'))
})

app.get('/js', function (req, res) {
    res.sendFile( path.join(__dirname, 'public/index.js'))
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server is running on ${port}`)
})