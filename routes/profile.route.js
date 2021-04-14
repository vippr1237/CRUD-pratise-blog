const express = require('express');

const router = express.Router();

const user = require('../controllers/user.controller');
const authentication = require('../common/authentication')

router.route('/:id')
.get(user.getProfile)
.delete(authentication, user.deleteUser)
.patch(authentication, user.updateProfile)

router.route('/:id/edit')
.get(user.viewEditProfile)
module.exports = router;