const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
const {check, validationResult, body} = require('express-validator')
const Email = require('../config/Email')
// const ModelUser = require('../models/users')
const Sequelize = require('sequelize')
const configDB = require('../config/Database')

const pageData = {
    css: 'register.css',
    title: 'Registrar Usuário'
}

const UserController = {
   
    viewRegister: (req, res) => {
        res.render('register', {pageData})
    },
    register: async (req, res) => {
        let {name, email, password} = req.body
        let avatar = req.files[0].filename
        let registerDate = new Date()
        registerDate = `${registerDate.getFullYear()}-${registerDate.getUTCMonth()}-${registerDate.getUTCDay()} ${registerDate.getHours()}:${registerDate.getMinutes()}`
       
        const db = new Sequelize(configDB)

        await db.query('INSERT INTO usuarios(NOME, EMAIL, PS, AVATAR, DATA_SYS) values(:NOME, :EMAIL, :PS, :AVATAR, :DATA_SYS)', {
            replacements: {
                NOME: name,
                EMAIL: email,
                PS: password,
                AVATAR: avatar,
                DATA_SYS: registerDate,
            },
            type: Sequelize.QueryTypes.INSERT
        })
        
        // ModelUser.createUser(name,email,password, avatar)

        pageData.msg = 'Usuário cadastrado com sucesso!'

        res.render('register', {pageData})
    },
    viewAdmin: async (req, res) => {

        let userSession = req.session.user

        if(typeof userSession !== 'undefined'){

            const db = new Sequelize(configDB)

            const contatos = await db.query('SELECT * FROM contatos', {
                type: Sequelize.QueryTypes.SELECT
            })

            const newsletters = await db.query('SELECT * FROM newsletters', {
                type: Sequelize.QueryTypes.SELECT
            })

            // MÉTODO ANTIGO COM JSON 
            
            // let fileContacts = path.join('db','contacts.json')
            // let fileNewsletters = path.join('db','newsletters.json')

            // if(fs.existsSync(fileContacts)){
            //     fileContacts = JSON.parse(fs.readFileSync(fileContacts))
            // }

            // if(fs.existsSync(fileNewsletters)){
            //     fileNewsletters = JSON.parse(fs.readFileSync(fileNewsletters))
            // }

            pageData.css = 'admin.css'

            res.render('admin', {user:req.session.user, contacts: contatos, newsletters: newsletters, pageData})
        }else{
            res.redirect('./')
        }
        
    },
    login: async (req, res) => {
        let {email, password} = req.body

        const db = new Sequelize(configDB)

        const result = await db.query('SELECT * FROM usuarios WHERE EMAIL = :EMAIL', {
            replacements: {
                EMAIL: email,
            },
            type: Sequelize.QueryTypes.SELECT
        })

        // MÉTODO ANTIGO COM JSON
        // let dbUsers = path.join('db','users.json')
        // let users = JSON.parse(fs.readFileSync(dbUsers,{encoding: 'utf-8'}))
        // let user = users.filter(user => {
        //     return user.email == email
        // })

        if(result.length > 0){
            let check = bcrypt.compareSync(password, result[0].PS)
            if(check){

                req.session.user = {name: result[0].NOME, email: result[0].EMAIL} 

                let emailSend = {
                    from: 'bruno.rafael.dev@gmail.com',
                    to: 'bruno.rafael10@globomail.com',
                    subject: 'Novo Login',
                    text: 'Novo login efetuado no sistema',
                    html: `
                    <h1>Novo login efetuado no sistema</h1>
                    <strong>Usuário: ${email}</strong>
                    `,
                }
                // Envia email 
                // Email.sendMail(emailSend, (error) => {
                //     if(error){
                //         console.log('Deu Ruim')
                //         console.log(error.message)
                //     }else{
                //         console.log('Email disparado com sucesso!');
                        
                //     }
                // })

                res.redirect('./admin')
                // res.send(req.session.user)
            }else{
                res.send('Senha inválida')
            }
        }else{
            res.send('Usuário inválido ou inexistente')
        } 
    },
    logout: (req, res) => {
        delete req.session.user
        res.redirect('/')
    }
}

module.exports = UserController