const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

// user auth emulation
app.use((req, res, next) => {
  req.user = {
    _id: '630a4b017af1e4c56cff1c2c',
  };

  next();
});

app.use('/', require('./routes/users'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started! Port ${PORT} is listened.`);
});
