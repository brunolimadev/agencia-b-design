const express = require('express')
const router = express.Router()
const {check, validationResult, body} = require('express-validator')
const validaLogin = require('../middlewares/validaLogin')

const UserController = require('../controllers/UserController')

router.post('/', [
    check('email').isEmail(),
    check('password').isLength({min:6})
], validaLogin, UserController.login)





module.exports = router