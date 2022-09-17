const { CONFLICT_ERROR } = require('../errorcodes');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR;
  }
};
