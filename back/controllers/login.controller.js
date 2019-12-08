const { getUser} = require('../repository/users.repository')

const fail = {
    success: false,
    message: 'Ooops, some error'
}

const wrongPassword = {
    success: false,
    message: 'Wrong Password!'
}

const loginController = async (req, res) => {
    const { login, passwd } = req.body;
    try {
        const result = await getUser(login);
        const { admin, user_id, password } = result;
        if (passwd === password) {
           // console.log(user_id + " aunuanawiwfn " + admin);
            res.status(200).json({
                user_id,
                admin,
            })
        } else {
            res.status(400).json(wrongPassword)
        }
    } catch (error) {
        res.json(fail)
    }
}

module.exports = loginController