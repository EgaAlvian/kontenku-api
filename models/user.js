'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static comparePassword(password, hashedPassword) {
      return bcrypt.compareSync(password, hashedPassword);
    }

    static createJwtToken(user) {
      return jwt.sign({
        id: user.id,
        email: user.email
      },
        process.env.JWT_KEY
      )
    }

    static verifyJwtToken(token) {
      return jwt.verify(token, process.env.JWT_KEY);
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Post)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(255),
    },
    biodata: {
      type: DataTypes.STRING(500),
    },
    profilePicture: {
      type: DataTypes.STRING(100),
      unique: true
    },
    token: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        if (!instance.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
          throw new Error('Password must be at least 8 characters, has both uppercase and lowercase, number, and symbol')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    }
  });
  return User;
};