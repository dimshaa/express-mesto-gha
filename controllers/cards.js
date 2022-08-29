const Card = require('../models/card');
const {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
} = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner', 'name about')
    .populate('likes', 'name')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: `It's ${res.statusCode} - such card not found` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: `It's ${res.statusCode} - such card not found` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `It's ${res.statusCode} - ${err}` });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: `It's ${res.statusCode} - such card not found` });
        return;
      }
      res.send({ data: card });
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
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
