const path = require('path')
const fs = require('fs')
const HomeController = require('../controllers/HomeController')
const Sequelize = require('sequelize')
const configDB = require('../config/Database')
const {Newsletter} = require('../models/index')

const validaEmail = async (req, res, next) => {

    const emailNews = req.body.emailNews

    // const email = await Newsletter.findAll({
    //     where: {EMAIL_NEWS: emailNews}
    // })

   next()

    
    // if(fs.existsSync(path.join('db','newsletters.json'))){
    //     let file = path.join('db','newsletters.json')

    //     file = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
    
    //     file = file.filter(news => {
    //         return news.email == req.body.emailNews 
    //     })
    //     if(file.length < 1){
    //         next()
    //     }else{
    //         delete HomeController.pageData.msgNewsErro
    //         delete HomeController.pageData.msgNews
    //         HomeController.pageData.msgNews = 'Email já cadastrado'
    //         res.render('index', HomeController.pageData)
    //     }
    // }else{
    //     next()    
    // }
}

module.exports = validaEmail