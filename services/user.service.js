const crypto = require('crypto');
const { User } = require('../models');
const {
    sendForgotPasswordMail,
    sendEmailVerification,
} = require('../middlewares/mailer');

const createToken = () => {
    return crypto.randomBytes(16).toString('hex');
};

const addUser = async (userInfo) => {
    const token = createToken();

    userInfo.token = token;

    const user = await User.create(userInfo);

    await sendEmailVerification(user.email, token);

    return user;
};

const findOneUserByEmail = (email) => {
    return User.findOne({
        where: {
            email: email,
        },
    });
};

const findOneUserById = (id) => {
    return User.findOne({
        where: {
            id: id,
        },
    });
};

const loginUser = async (email, password) => {
    const userLogin = await findOneUserByEmail(email);

    if (!userLogin) {
        throw new Error('invalid email / password');
    }

    const isPasswordCorrect = User.comparePassword(password, userLogin.password);

    if (!isPasswordCorrect) {
        throw new Error('invalid email / password');
    }

    delete userLogin.dataValues.password;
    delete userLogin.dataValues.token;

    return userLogin;
};

const verifyEmail = async (token) => {
    const user = await User.findOne({ where: { token } });
    if (!user) return;

    user.set({ verified: true, token: null });
    await user.save();

    return user;
};

const requestEmailVerification = async (email) => {
    const user = await findOneUserByEmail(email);

    const token = createToken();

    user.set({ token });
    await user.save();

    await sendEmailVerification(email, token);

    return;
};

const forgotPassword = async (email) => {
    const token = createToken();

    const user = await findOneUserByEmail(email);

    if (!user) return;

    user.set({ token });
    await user.save();

    await sendForgotPasswordMail(email, token);
    return;
};

const resetPassword = async (token, password) => {
    const user = await User.findOne({ where: { token } });
    if (!user) return;

    user.set({ password, token: null });
    await user.save();

    return user;
};

const updateUser = async (userInfo, userId) => {
    const user = await findOneUserById(userId);

    delete userInfo.email;

    user.set({ ...userInfo });
    await user.save();

    return;
};

module.exports = {
    addUser,
    findOneUserByEmail,
    findOneUserById,
    loginUser,
    verifyEmail,
    requestEmailVerification,
    forgotPassword,
    resetPassword,
    updateUser,
};
