const User = require('../models/user');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
} = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
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
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
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
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
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
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
