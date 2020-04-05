const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
const {check, validationResult, body} = require('express-validator')

const pageData = {
    css: 'register.css',
    title: 'Registrar Usuário'
}

const UserController = {
    pageData,
    viewRegister: (req, res) => {
        res.render('register', pageData)
    },
    register: (req, res) => {
        let {name, email, password} = req.body
        let data = new Date()
        data = `${data.getUTCDay()}-${data.getUTCMonth()}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`
        let infoUser = {name, email, password, dataRegister: data}
        
        if(!fs.existsSync(path.join('db'))){
            fs.mkdirSync(path.join('db'))
        }

        const file = path.join('db','users.json')
        let users = []

        if(fs.existsSync(file)){
            users = JSON.parse(fs.readFileSync(file,{encoding: 'utf-8'}))
        }

        users.push(infoUser)
        users = JSON.stringify(users)

        fs.writeFileSync(file, users)

        pageData.msg = 'Usuário cadastrado com sucesso!'

        res.render('register', pageData)
    },
    viewAdmin: (req, res) => {
        let userSession = req.session.user
        if(typeof userSession !== 'undefined'){
            let fileContacts = path.join('db','contacts.json')
            let fileNewsletters = path.join('db','newsletters.json')

            if(fs.existsSync(fileContacts)){
                fileContacts = JSON.parse(fs.readFileSync(fileContacts))
            }

            if(fs.existsSync(fileNewsletters)){
                fileNewsletters = JSON.parse(fs.readFileSync(fileNewsletters))
            }


            res.render('admin', {user:req.session.user, css: 'admin.css', contacts: fileContacts, newsletters: fileNewsletters})
        }else{
            res.redirect('./')
        }
    },
    login: (req, res) => {
        let {email, password} = req.body

        let dbUsers = path.join('db','users.json')

        let users = JSON.parse(fs.readFileSync(dbUsers,{encoding: 'utf-8'}))
       
        let user = users.filter(user => {
            return user.email == email
        })

        if(user.length > 0){
            let check = bcrypt.compareSync(password, user[0].password)
            if(check){
                req.session.user = {name: user[0].name, email: user[0].email} 
                res.redirect('./admin')
                // res.send(req.session.user)
            }else{
                res.send('Senha inválida')
            }
        }else{
            res.send('Usuário inválido ou inexistente')
        } 
    }
}

module.exports = UserController