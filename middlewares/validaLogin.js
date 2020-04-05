const {check, validationResult, body} = require('express-validator')

const validaLogin = (req, res, next) => {
    const erro = validationResult(req)
    if(erro.isEmpty()){
        next()
    }else{
        res.redirect('./')    
    }
}

module.exports = validaLogin