'use strict'

//will be used to access the database
const { insertMessage, getMessages, deleteMessage } = require('../repository/messages.repository')

const clients = new Set();


const onMessage = async message => {
    const data = JSON.parse(message);
    console.log("message received");
    if (data.action === 'delete' && +data.admin === true) {
        const result = await deleteMessage(data.id)
        const newMessages = await getMessages()
        for (let client of clients) {
            client.send(newMessages)
        }
    } else {
        await insertMessage(data)
        for (let client of clients) {
            client.send(message)
        }
    }
}

const onConnection = async ws => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
    console.log('Connected!')
    clients.add(ws)
    const messages = await getMessages();
    const data = JSON.stringify(messages);
    ws.send(data)   ;
    ws.on('message', onMessage)
}


module.exports = {
    onConnection,
    onMessage
}