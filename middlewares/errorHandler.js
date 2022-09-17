const { INTERNAL_SERVER_ERROR } = require('../utils/errorcodes');

module.exports.errorHandler = (err, req, res, next) => {
  res
    .status(err.statusCode || INTERNAL_SERVER_ERROR)
    .send({ message: err.message || 'Something gone wrong...' });
  next();
};
