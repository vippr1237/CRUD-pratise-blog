const express = require('express');

const router = express.Router();

const user = require('../controllers/user.controller');
const authentication = require('../common/authentication');
const clarify = require('../common/clarify');

router.route('/:id')
.get(user.getProfile)
.delete(authentication, clarify, user.deleteUser)
.put(authentication, clarify, user.updateProfile)

router.route('/:id/edit')
.get(user.viewEditProfile)
.post(authentication, user.getEditable);
module.exports = router;