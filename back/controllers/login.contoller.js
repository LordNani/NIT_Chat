const { getUser} = require('../repository/users.repository')

const fail = {
    success: false,
    message: 'Ooops, some error'
}

const loginController = async (req, res) => {
    const { login, password } = req.body;
    try {
        const result = await getUser(login)
        const { isAdmin, id } = result;
        if (result) {
            const token = await jwt.sign({ isAdmin, id, login }, 'secret')
            res.status(200).json({
                success: true,
                token
            })
        } else {
            res.status(400).json({error: 'User not found'})
        }
    } catch (error) {
        res.json(fail)
    }
}

module.exports = loginController