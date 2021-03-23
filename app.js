const { request, response } = require('express')
const express = require('express')

const controllerOnibus = require('./controllers/controllerOnibus')
const controllerFuncionario = require('./controllers/controllerFuncionario')
const controllerRota = require('./controllers/controllerRota')
const controllerCidade = require('./controllers/controllerCidade')

// Handlebars
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const port = 8081

const app = express()

// Conf Handlebars
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

//conf para receber entender json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROTAS

//onibus
app.get("/onibus", controllerOnibus.exibirOnibus)
app.post("/addOnibus", controllerOnibus.addOnibus)
app.post("/buscarOnibus", controllerOnibus)
app.delete("/delOnibus/:id", controllerOnibus.deletaOnibus)

//funcionario 
app.get("/funcionario", controllerFuncionario.exibirFuncionario)
app.post("/addFuncionario", controllerFuncionario.addFuncionario)
app.put("/atualizarFuncionario/:id", controllerFuncionario.atualizaFuncionario)
app.delete("/delFuncionario/:id", controllerFuncionario.deletaFuncionario)

//rota
app.get("/rota", controllerRota.exibirRotas)
app.post("/addRota", controllerRota.addRota)
app.put("/atualizarRota/:id", controllerRota.atualizaRota)
app.delete("/delRota/:id", controllerRota.deletaRota)

//cidade
app.get("/cidade", controllerCidade.exibirCidade)
app.post("/buscarCidade", controllerCidade.buscar)
app.post("/addCidade", controllerCidade.addCidade)
app.delete("/delCidade/:id", controllerCidade.deletaCidade)

// Pagina inicial
app.get('/', (req, res)=>{
    res.render('home', {
        style: 'home.css',
        script: ['home.js']
    })
})


app.listen(port, ()=>{
    console.log(`Servidor conectado na porta ${port}`)
})