const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_KEY,
    },
});

const sendForgotPasswordMail = (email, token) => {
    return transporter.sendMail({
        from: 'egaalvian17@gmail.com',
        to: email,
        subject: 'Forgot Password',
        text:
            'Please click link below to reset your password:\n' +
            `${process.env.APP_DOMAIN}/forgot-password/${token}`,
    });
};

const sendEmailVerification = (email, token) => {
    return transporter.sendMail({
        from: 'egaalvian17@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text:
            'Verify your email by clicking link below:\n' +
            `${process.env.APP_DOMAIN}/verify/${token}`,
    });
};

module.exports = {
    sendForgotPasswordMail,
    sendEmailVerification,
};
