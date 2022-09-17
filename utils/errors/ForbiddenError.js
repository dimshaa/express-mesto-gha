const { FORBIDDEN_ERROR } = require('../errorcodes');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
};
