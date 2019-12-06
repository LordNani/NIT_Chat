'use strict'

//will be used to access the database
const { insertMessage, selectMessages, deleteMessage } = require('../repository/messages.repository')

//functio-handler that is used when web-socket connection happens

const onConnection = ws => {
    console.log('Connected!')
    //handles messages from client
    ws.on('message', (msg) => {
        console.log(`Recieved message: ${msg}`)
        console.log('Sending response')
        ws.send(`From server: ${new Date()}`)
    })
}

module.exports = {
    onConnection
}