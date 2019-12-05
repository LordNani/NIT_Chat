'use strict'

require('dotenv').config()
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const sequelize = require('./config/sequelize.config')

const loginController = require('./controllers/login.contoller')

const app = express();
const httpServer = http.createServer(app);

sequelize.sync().then(result => {
  console.log('Table created and updated')
})
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'POST, PUT, GET, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, CurrentId'
    );
    res.header(
      'Access-Control-Allow-Credentials', 'true'
    );
    next();
  });

app.get('/mainpage', (req, res) => {
    res.sendFile('your html file!')
})

app.get('/anotherpage', (req, res) => {
  res.sendFile('another html file!')
})

app.post('/api/login', loginController)

httpServer.listen(2000, () => console.log('yaboiii!'));