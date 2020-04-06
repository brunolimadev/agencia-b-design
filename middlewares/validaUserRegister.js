const {
    check,
    validationResult,
    body
} = require('express-validator')
const UserController = require('../controllers/UserController')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

const userRegister = (req, res, next) => {
    const erro = validationResult(req)
    if (erro.isEmpty()) {

        if (!fs.existsSync(path.join('db', 'users.json'))) {
            fs.writeFileSync(path.join('db', 'users.json'), JSON.stringify([]))
        }
        let fileUsers = JSON.parse(fs.readFileSync(path.join('db', 'users.json'), {
            encoding: 'utf-8'
        }))
        let email = req.body.email

        if (fileUsers.filter(user => {
                return user.email == email
            }).length > 0) {
            res.render('register', {
                css: UserController.pageData.css,
                erros: [{
                    msg: 'O usuário já possui cadastro!'
                }]
            })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            next()
        }
    } else {
        // res.send(UserController.pageData)
        res.render('register', {
            css: UserController.pageData.css,
            erros: erro.errors
        })
    }
}

module.exports = userRegister