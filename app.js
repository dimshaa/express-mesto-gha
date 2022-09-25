const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { checkSignIn, checkSignUp } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', checkSignUp, createUser);
app.post('/signin', checkSignIn, login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));
app.use('/', require('./routes/notFound'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started! Port ${PORT} is listened.`);
});
