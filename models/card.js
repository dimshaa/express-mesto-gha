/* eslint-disable func-names, no-useless-escape */
const mongoose = require('mongoose');
const BadRequestError = require('../utils/errors/BadRequestError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: [/^https?:\/\/(www\.)?[\w\d\-]+\.[\w\d\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}#?/, function () { return new BadRequestError('invalid URL'); }],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
