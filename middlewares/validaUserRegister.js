const {check, validationResult, body } = require('express-validator')
const UserController = require('../controllers/UserController')
const bcrypt = require('bcrypt')

const userRegister = (req, res, next) =>{
    const erro = validationResult(req)
    if(erro.isEmpty()){
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        next()
    }else{
        // res.send(UserController.pageData)
        res.render('register', {css: UserController.pageData.css, erros: erro.errors})
    }
}

module.exports = userRegister