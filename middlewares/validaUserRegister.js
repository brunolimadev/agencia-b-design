const {
    check,
    validationResult,
    body
} = require('express-validator')
const UserController = require('../controllers/UserController')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const configDB = require('../config/Database')

const userRegister = async (req, res, next) => {
    const erro = validationResult(req)
    const pageData = UserController.pageData
  
    if (erro.isEmpty()) {

        const db = new Sequelize(configDB)

        // MÉTODO ANTIGO COM JSON

        // if (!fs.existsSync(path.join('db', 'users.json'))) {
        //     fs.writeFileSync(path.join('db', 'users.json'), JSON.stringify([]))
        // }
        // let fileUsers = JSON.parse(fs.readFileSync(path.join('db', 'users.json'), {
        //     encoding: 'utf-8'
        // }))

        let email = req.body.email

        const result =  await db.query('SELECT EMAIL FROM USUARIOS WHERE EMAIL = :EMAIL',{
            replacements: {
                EMAIL: email
            },
            type: Sequelize.QueryTypes.SELECT
        })

        if(result.length > 0){
            fs.unlinkSync(path.join('public','images','upload','avatars',req.files[0].filename))

            return res.render('register', {
                pageData: {css: 'register.css'},
                erros: [{
                    msg: 'O usuário já possui cadastro!'
                }]
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            next()
        }

        // MÉTODO ANTIGO COM JSON
        // if (fileUsers.filter(user => {
        //         return user.email == email
        //     }).length > 0) {

        //     fs.unlinkSync(path.join('public','images','upload','avatars',req.files[0].filename))
            
        //     res.render('register', {
        //         pageData: {css: 'register.css'},
        //         erros: [{
        //             msg: 'O usuário já possui cadastro!'
        //         }]
        //     })
        //} else {
        //     req.body.password = bcrypt.hashSync(req.body.password, 10)
        //     next()
        // }
    } else {
        fs.unlinkSync(path.join('public','images','upload','avatars',req.files[0].filename))
        res.render('register', {
            pageData: {css: 'register.css'},
            erros: erro.errors
        })
    }
}

module.exports = userRegister