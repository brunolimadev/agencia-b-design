var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/HomeController')

/* GET home page. */
router.get('/', HomeController.viewIndex);

router.post('/contato', HomeController.processaContato)

module.exports = router;
