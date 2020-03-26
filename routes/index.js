var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'B-DESIGN',
    t1Carousel: 'Vamos construir um site?', 
    p1Carousel: 'Crie um site para alavancar suas vendas e expadir sua marca!',
    t2Carousel: 'Desenvolvemos seu projeto completo',
    p2Carousel: 'Nossos especialistas em UX e UI estão esperando você!!!',
    t3Carousel: 'Criamos a identidade visual da sua marca.',
    p3Carousel: 'Composição de cores, logo, banner e muito mais!',
    about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos nobis illum, a deserunt beatae quae quia expedita? Voluptatibus harum neque ratione dolore ullam ut fugiat nihil alias repudiandae magni temporibus necessitatibus quod deserunt itaque dolorum beatae, molestias nisi reprehenderit placeat cupiditate. Iure rem quidem numquam tempore, quibusdam animi fuga quo.'
  });
});

module.exports = router;
