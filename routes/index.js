let express = require('express');
let router = express.Router();
let {check, validationResult, body} = require('express-validator')

const HomeController = require('../controllers/HomeController')
const validaNews = require('../middlewares/validaNews')

/* GET home page. */
router.get('/', HomeController.viewIndex);

router.post('/contato', [
    check('name').isLength({min:2, max:20}).withMessage('Nome inválido'),
    check('email').isEmail().withMessage('Email inválido'),
    check('message').isLength({min:3}).withMessage('A mensagem não pode ser vazia.')
], HomeController.processaContato)

router.post('/newsletter', [
    check('emailNews').isEmail().withMessage('Email inválido')
],validaNews,HomeController.processaNewsletter)

module.exports = router;
