const path = require('path')
const fs = require('fs')
const {check, validationResult, body} = require('express-validator')

const fileUsers = path.join('db', 'users.json')

function createUser(name, email, password, avatar) {
    let registerDate = new Date()
    registerDate = `${registerDate.getUTCDay()}-${registerDate.getUTCMonth()}-${registerDate.getFullYear()} ${registerDate.getHours()}:${registerDate.getMinutes()}`
    
    // Cria objeto user
    let user = {
        id: 0,
        name,
        email,
        password,
        avatar,
        registerDate
    }

    let usersList = []

    // Lê o arquivo users.json
    let file = JSON.parse(fs.readFileSync(path.join('db','users.json'),{encoding: 'utf-8'}))

 
    // Verifica se o arquivo está vazio
    if(file.length < 1){
        user.id = 1
        usersList.push(user)
        fs.writeFileSync(fileUsers, JSON.stringify(usersList))
    }else {
        usersList = JSON.parse(fs.readFileSync(fileUsers, {
            encoding: 'utf-8'
        }))

        //Cria o ID do usuário dinamicamente
        let idIncremet = usersList.map(e => {
            return e.id
        }).reduce((soma, atual) => {
            return soma + atual
        })
        
        user.id = idIncremet + 1
        
        usersList.push(user)

        fs.writeFileSync(fileUsers, JSON.stringify(usersList))
    }
}

module.exports = {
    createUser
}