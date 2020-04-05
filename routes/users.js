const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator')


const UserController = require('../controllers/UserController')
const validaUserRegister = require('../middlewares/validaUserRegister')

/* GET users listing. */

router.get('/', UserController.viewRegister);
router.post('/user-register/', [
  check('name').isLength({min:3, max:30}).withMessage('Nome Inválido'),
  check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({min:6}).withMessage('A senha deve conter no mínimo 6 caracteres')
], validaUserRegister, UserController.register);

module.exports = router;
