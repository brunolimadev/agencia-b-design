const path = require('path')
const fs = require('fs')
const HomeController = require('../controllers/HomeController')

const validaEmail = (req, res, next) => {

    
    if(fs.existsSync(path.join('db','newsletters.json'))){
        let file = path.join('db','newsletters.json')

        file = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
    
        file = file.filter(news => {
            return news.email == req.body.emailNews 
        })
        if(file.length < 1){
            next()
        }else{
            delete HomeController.pageData.msgNewsErro
            delete HomeController.pageData.msgNews
            HomeController.pageData.msgNews = 'Email já cadastrado'
            res.render('index', HomeController.pageData)
        }
    }else{
        next()    
    }
}

module.exports = validaEmail