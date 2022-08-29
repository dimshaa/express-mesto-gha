const router = require('express').Router();
const { NOT_FOUND_ERROR } = require('../utils/errors');

router.all('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: `${res.statusCode} - such directory doesn't exist` });
});

module.exports = router;
