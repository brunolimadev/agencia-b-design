const express = require('express');
const router = express.Router();
const multer = require('multer')
const {check, validationResult, body} = require('express-validator')
const path = require('path')

const UserController = require('../controllers/UserController')
const validaUserRegister = require('../middlewares/validaUserRegister')

router.get('/', UserController.viewRegister);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','upload','avatars'))
  },
  filename: function (req, file, cb) {
  
    cb(null, 'avatar' + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })

router.post('/user-register/', upload.any(),[
  check('name').isLength({min:3, max:30}).withMessage('Nome Inválido'),
  check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({min:6}).withMessage('A senha deve conter no mínimo 6 caracteres')
], validaUserRegister, UserController.register);

// router.post('/user-register/', upload.any(), UserController.register);

module.exports = router;
