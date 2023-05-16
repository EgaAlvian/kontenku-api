const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const authentication = async (req, res, next) => {
  const accessToken = req.headers['authorization'];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);

    const user = await userService.findOneUserById(decoded.id);

    if (!user) next(new Error('invalid token'));

    delete user.dataValues.password;

    req.user = user;
  } catch (err) {
    next(new Error('invalid token'));
  }

  next();
};

module.exports = {
  authentication,
};
