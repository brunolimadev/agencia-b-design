const express = require('express')
const router = express.Router()
const {check, validationResult, body} = require('express-validator')
const validaLogin = require('../middlewares/validaLogin')

const UserController = require('../controllers/UserController')

router.get('/', UserController.viewAdmin)

router.get('/logout', UserController.logout)



module.exports = router