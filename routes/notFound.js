const router = require('express').Router();
const NotFoundError = require('../utils/errors/NotFoundError');

router.all('*', (req, res, next) => {
  next(new NotFoundError('Such directory doesn\'t exist'));
});

module.exports = router;
