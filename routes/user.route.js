const express = require('express');

const router = express.Router();

const user = require('../controllers/user.controller');
const authentication = require('../common/authentication')

router.route('/')
.post(user.register);

router.route('/login')
.post(user.login)
.get(user.viewSignIn)

router.route('/register')
.get(user.viewRegister);


router.route('/changePass/')
.post(authentication, user.changePass);

module.exports = router;