const router = require('express').Router();

const { checkUserUpdate, checkAvatarUpdate, checkUserId } = require('../middlewares/validation');
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:id', checkUserId, getUserById);
router.patch('/users/me', checkUserUpdate, updateUserInfo);
router.patch('/users/me/avatar', checkAvatarUpdate, updateUserAvatar);

module.exports = router;
