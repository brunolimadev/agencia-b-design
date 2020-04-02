const path = require('path')
const fs = require('fs')

const pageData = {
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
    viewIndex: (req, res) => {
        res.render('index', pageData)
    },
    processaContato: (req, res) => {

        let {nome, email, mensagem} = req.body
        let data = new Date()
        data = `${data.getDay()}-${data.getMonth()}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`
        let contact = {nome, email, mensagem, data}

        const fileContacts = path.join('db','contacts.json')
        let contactList = []

        if(fs.existsSync(fileContacts)){
            contactList = JSON.parse(fs.readFileSync(fileContacts, {encoding: 'utf-8'}))
        }

        contactList.push(contact)
        contactList = JSON.stringify(contactList)
       
        
        fs.writeFileSync(fileContacts,contactList)

        pageData.msg = 'Contato Enviado com Sucesso!',

    
        res.render('index', pageData)    
    } 

}

module.exports = HomeController