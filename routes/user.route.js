const router = require("express").Router();
const userController = require("../controllers/user.controller")
const userValidation = require("../middlewares/user.validation")

router.post("/register", userValidation.register(), userController.registerUser)

router.post("/login", userValidation.login(), userController.loginUser)

router.post("/forgot-password", userValidation.forgotPassword(), userController.forgotPassword)

module.exports = router