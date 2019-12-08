'use strict'

const Messages = require('../models/messages')

const insertMessage = async msg => {
    try {
      //  console.log(JSON.parse(msg));
        console.log('TRYING TO INSERT');
        const res = await Messages.create({
            ...msg
        })
        return res;
    } catch (erorr) {
        console.log(`Message insertion error: ${erorr}`)
    }
}

const getMessages = async () => {
    try {
        const res = await Messages.findAll({
            raw: true
        })
        console.log(res)
        return res;
    } catch(error) {
        console.log(`Getting messsages error: ${error}`)
    }
}

const deleteMessage = async id => {
    try {
        const res = await Messages.destroy({
            where: {
                id
            }
        })
        return res;
    } catch(error) {
        console.log(`Deleting messages error: ${error}`)
    }
}

module.exports = {
    insertMessage, 
    getMessages, 
    deleteMessage
}