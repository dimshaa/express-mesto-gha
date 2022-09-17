const { NOT_FOUND_ERROR } = require('../errorcodes');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
};
