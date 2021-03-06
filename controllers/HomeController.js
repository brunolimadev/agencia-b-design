const path = require('path')
const fs = require('fs')
let {check, validationResult, body} = require('express-validator')
const Sequelize = require('sequelize')
const configDb = require('../config/Database')

const pageData = {
    css: 'index.css',
    title: 'B-DESIGN',
    t1Carousel: 'Vamos construir um site?', 
    p1Carousel: 'Crie um site para alavancar suas vendas e expadir sua marca!',
    t2Carousel: 'Desenvolvemos seu projeto completo',
    p2Carousel: 'Nossos especialistas em UX e UI estão esperando você!!!',
    t3Carousel: 'Criamos a identidade visual da sua marca.',
    p3Carousel: 'Composição de cores, logo, banner e muito mais!',
    about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos nobis illum, a deserunt beatae quae quia expedita? Voluptatibus harum neque ratione dolore ullam ut fugiat nihil alias repudiandae magni temporibus necessitatibus quod deserunt itaque dolorum beatae, molestias nisi reprehenderit placeat cupiditate. Iure rem quidem numquam tempore, quibusdam animi fuga quo.'
}

const HomeController = {
    pageData,
    viewIndex: (req, res) => {
        delete pageData.msg
        delete pageData.msgErro
        delete pageData.msgNews
        delete pageData.msgErroNews
        res.render('index', {pageData: pageData, user: req.session.user})
    },
    processaContato: async (req, res) => {

        let erros = validationResult(req)

        const db = new Sequelize(configDb)

        if(erros.isEmpty()){
            let {name, email, message} = req.body
            let data = new Date()
            data = `${data.getFullYear()}-${data.getUTCMonth()}-${data.getUTCDay()} ${data.getHours()}:${data.getMinutes()}`
            let contact = {name, email, message, data}

            await db.query('INSERT INTO contatos(NOME_CONTATO, EMAIL_CONTATO, MENSAGEM, DATA_SYS) values(:NOME, :EMAIL, :MENSAGEM, :DATA_SYS)', {
                replacements : {
                    NOME: name,
                    EMAIL: email,
                    MENSAGEM: message,
                    DATA_SYS: data
                },
                type: Sequelize.QueryTypes.INSERT
            })

            // MÉTODO ANTIGO EM JSON
            // const fileContacts = path.join('db','contacts.json')
            // let contactList = []

            // if(fs.existsSync(fileContacts)){
            //     contactList = JSON.parse(fs.readFileSync(fileContacts, {encoding: 'utf-8'}))
            // }else{
            //     if(!fs.existsSync(path.join('db'))){
            //         fs.mkdirSync(path.join('db'))
            //     }
            // }

            // contactList.push(contact)
            // contactList = JSON.stringify(contactList)
        
            // fs.writeFileSync(fileContacts,contactList)

            pageData.msg = 'Contato Enviado com Sucesso!',
            delete pageData.msgErro

            res.render('index', {pageData})    
        }else{
            pageData.msgErro = erros.errors
            res.render('index', {pageData})
            // res.send(erros)
        } 
    },
    processaNewsletter: async (req, res) => {

        let erros = validationResult(req)
        
        if(erros.isEmpty()){
            let {emailNews} = req.body
            let data = new Date()
            data = `${data.getFullYear()}-${data.getUTCMonth()}-${data.getUTCDay()} ${data.getHours()}:${data.getMinutes()}`
            let newsletter = {email: emailNews, dataCadastro: data}
            let fileNewsletter = path.join('db','newsletters.json')

            const db = new Sequelize(configDb)

            await db.query('INSERT INTO newsletters(EMAIL_NEWS,DATA_SYS) values(:EMAIL, :DATA_SYS)', {
                replacements : {
                    EMAIL: emailNews,
                    DATA_SYS: data
                },
                type: Sequelize.QueryTypes.INSERT
            })

            // let newsList = []
            // if(fs.existsSync(fileNewsletter)){
            //     newsList = JSON.parse(fs.readFileSync(fileNewsletter,{encoding: 'utf-8'}))
            // }else{
            //     if(!fs.existsSync(path.join('db'))){
            //         fs.mkdirSync(path.join('db'))
            //     }
            // }

            // newsList.push(newsletter)
            // newsList = JSON.stringify(newsList)

            // fs.writeFileSync(fileNewsletter, newsList)

            pageData.msgNews = 'Email cadastrado com sucesso!',
            delete pageData.msgErroNews

            // res.send(pageData.msgNews)
            res.render('index', {pageData})
            // this.viewIndex()
        }else{
            delete pageData.msgNews
            pageData.msgErroNews = erros.errors
            // res.send(pageData.msgErroNews)
            res.render('index', {pageData})
        }
    }
}

module.exports = HomeController