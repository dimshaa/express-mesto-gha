const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      res.status(500).send({ message: `oh! it's ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: `oh! it's ${err}` });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: `oh! it's ${err}` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
