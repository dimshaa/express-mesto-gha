const { celebrate, Joi } = require('celebrate');

const checkSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const checkAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

const checkUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const checkCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
});

const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  checkSignIn,
  checkSignUp,
  checkUserUpdate,
  checkAvatarUpdate,
  checkUserId,
  checkCardData,
  checkCardId,
};
