const userService = require('../services/user.service');
const { User } = require('../models');

const registerUser = async (req, res, next) => {
    const userInfo = req.body;

    try {
        await userService.addUser(userInfo);

        res.status(201).json({ message: 'Success' });
    } catch (error) {
        return next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userLogin = await userService.loginUser(email, password);

        res.status(201).json({
            user: userLogin,
            token: User.createJwtToken(userLogin),
        });
    } catch (error) {
        return next(error);
    }
};

const verifyEmail = async (req, res, next) => {
    const { token } = req.body;

    try {
        await userService.verifyEmail(token);
        res.status(200).json({
            message: 'Success',
        });
    } catch (error) {
        return next(error);
    }
};

const requestEmailVerification = async (req, res, next) => {
    const { email } = req.user;

    try {
        await userService.requestEmailVerification(email);
        res.status(200).json({
            message: 'Success',
        });
    } catch (error) {
        return next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        await userService.forgotPassword(email);
        res.status(200).json({
            message: 'Success',
        });
    } catch (error) {
        return next(error);
    }
};

const resetPassword = async (req, res, next) => {
    const { password, token } = req.body;

    try {
        await userService.resetPassword(token, password);
        res.status(200).json({
            message: 'Success',
        });
    } catch (error) {
        return next(error);
    }
};

const currentUser = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        user,
    });
};

const updateUser = async (req, res, next) => {
    const userInfo = req.body;
    const { id } = req.user;

    if (req.file) {
        const { filename } = req.file;

        userInfo.profilePicture = filename;
    }

    try {
        await userService.updateUser(userInfo, id);
        res.status(200).json({
            message: 'Success',
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    requestEmailVerification,
    forgotPassword,
    resetPassword,
    currentUser,
    updateUser,
};
