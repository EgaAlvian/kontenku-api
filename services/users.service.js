const crypto = require('crypto')
const { User } = require("../models")
const { sendForgotPasswordMail } = require("../middlewares/mailer")

const addUser = (userInfo) => {
    return User.create(userInfo)
}

const findOneUserByEmail = (email) => {
    return User.findOne({
        where: {
            email: email
        }
    })
}

const findOneUserById = (id) => {
    return User.findOne({
        where: {
            id: id
        }
    })
}

const loginUser = async (email, password) => {
    const userLogin = await findOneUserByEmail(email)

    if (!userLogin) {
        throw new Error('invalid email / password')
    }

    const isPasswordCorrect = User.comparePassword(password, userLogin.password)

    if (!isPasswordCorrect) {
        throw new Error('invalid email / password')
    }

    return userLogin
}

const forgotPassword = async (email) => {
    const token = crypto.randomBytes(16).toString('hex')

    const user = await findOneUserByEmail(email)

    if (!user) return

    user.set({ token })

    await user.save()

    await sendForgotPasswordMail(email, token)
    return
}

module.exports = {
    addUser,
    findOneUserByEmail,
    findOneUserById,
    loginUser,
    forgotPassword
}