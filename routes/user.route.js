const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { authentication } = require('../middlewares/authentication');
const userValidation = require('../middlewares/user.validation');
const uploader = require('../middlewares/uploader');

router.post(
    '/register',
    userValidation.register(),
    userController.registerUser
);

router.post('/login', userValidation.login(), userController.loginUser);

router.post(
    '/verify-email',
    userValidation.verifyEmail(),
    userController.verifyEmail
);

router.get(
    '/verify-email',
    authentication,
    userController.requestEmailVerification
);

router.post(
    '/forgot-password',
    userValidation.forgotPassword(),
    userController.forgotPassword
);

router.post(
    '/reset-password',
    userValidation.resetPassword(),
    userController.resetPassword
);

router.get('/current', authentication, userController.currentUser);

router.put(
    '/',
    authentication,
    uploader.single('file'),
    userValidation.updateUser(),
    userController.updateUser
);

module.exports = router;
