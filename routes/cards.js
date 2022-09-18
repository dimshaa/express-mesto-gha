const router = require('express').Router();

const { checkCardData, checkCardId } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', checkCardData, createCard);
router.delete('/cards/:cardId', checkCardId, deleteCard);
router.put('/cards/:cardId/likes', checkCardId, likeCard);
router.delete('/cards/:cardId/likes', checkCardId, dislikeCard);

module.exports = router;
