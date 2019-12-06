// 'use strict'

// require('dotenv').config()
// const express = require('express');
// const path = require('path');
// const http = require('http');
// const bodyParser = require('body-parser');

// const sequelize = require('./config/sequelize.config')

// const loginController = require('./controllers/login.contoller')

// const app = express();
// const httpServer = http.createServer(app);

// sequelize.sync().then(result => {
//   console.log('Table created and updated')
// })
// .catch(err => console.log(err))

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json())
// app.use(express.static(__dirname));


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//       'Access-Control-Allow-Methods',
//       'POST, PUT, GET, DELETE'
//     );
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization, CurrentId'
//     );
//     res.header(
//       'Access-Control-Allow-Credentials', 'true'
//     );
//     next();
//   });

// app.get('/mainpage', (req, res) => {
//     res.sendFile('your html file!')
// })

// app.get('/anotherpage', (req, res) => {
//   res.sendFile('another html file!')
// })

// app.post('/api/login', loginController)

// httpServer.listen(2000, () => console.log('yaboiii!'));


const http = require('http');
const ws = require('ws');

const wss = new ws.Server({noServer: true});

function accept(req, res) {
  // все входящие запросы должны использовать websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  // может быть заголовок Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
    let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Гость";
    ws.send(`BRAWAL STARS VPERED, ${name}!`);

    setTimeout(() => ws.close(1000, "Пока!"), 5000);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}