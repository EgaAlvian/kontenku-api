const userService = require("../services/users.service")
const { User } = require("../models")

const registerUser = async (req, res, next) => {
    const userInfo = req.body
    userInfo.role = 'user'

    try {
        await userService.addUser(userInfo)

        res.status(201).json({ message: "Success" })
    } catch (error) {
        if (error.name === 'TypeError') throw error;
        const err = error.errors ? error.errors[0]?.message : error.message
        res.status(400).json({
            error: err,
        })
    }
}

const loginUser = async (req, res, next) => {
    const loginInfo = req.body

    try {
        const userLogin = await userService.loginUser(loginInfo.email, loginInfo.password)

        delete userLogin.dataValues.password

        res.status(201).json({
            user: userLogin,
            token: User.createJwtToken(userLogin)
        })
    } catch (error) {
        const err = error.errors ? error.errors[0]?.message : error.message
        res.status(400).json({
            error: err,
        })
    }

}

const forgotPassword = async (req, res, next) => {
    const forgotInfo = req.body

    try {
        await userService.forgotPassword(forgotInfo.email)
        res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        const err = error.errors ? error.errors[0]?.message : error.message
        res.status(400).json({
            error: err
        })
    }
}



module.exports = {
    registerUser,
    loginUser,
    forgotPassword
}