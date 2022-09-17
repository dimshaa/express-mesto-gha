const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
} = require('../utils/errors');

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, 'some-secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, { maxAge: 604800000, httpOnly: true }).send({ data: user });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: `It's ${res.statusCode} - such user not found` });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: `It's ${res.statusCode} - such user not found` });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
    });
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((passwordHash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: passwordHash,
      })
        .then((user) => {
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
            return;
          }
          res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
        });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: `It's ${res.statusCode} - such user not found` });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: `It's ${res.statusCode} - such user not found` });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err.message}` });
    });
};

module.exports = {
  login,
  getUsers,
  getUserInfo,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
