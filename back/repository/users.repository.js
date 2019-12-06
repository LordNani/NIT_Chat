const Users = require('../models/users')

const getUser = async login => {
    try {
        //console.log(Users.findAll({raw: true}));
        const res = await Users.findOne({
            where: {
                login
            },
            raw: true
        });
        return res;
    } catch(error) {
        console.log(`Get User Erorr: ${error}`)
    }
}

module.exports = {
    getUser
}