const { UNAUTHORIZED_ERROR } = require('../errorcodes');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR;
  }
};
