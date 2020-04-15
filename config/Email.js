const nodemailer = require('nodemailer')

const Email = nodemailer.createTransport({
    service: 'gmail',  
    auth:{
        user: 'bruno.rafael.dev@gmail.com',
        pass: 'Bruno@Canada2016'
    }
})

module.exports = Email