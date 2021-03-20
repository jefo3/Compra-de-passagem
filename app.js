const { request, response } = require('express')
const express = require('express')

const controllerOnibus = require('./controllers/controllerOnibus')
const controllerFuncionario = require('./controllers/controllerFuncionario')
const controllerRota = require('./controllers/controllerRota')
const controllerCidade = require('./controllers/controllerCidade')

const port = 8081

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROTAS

//onibus
app.get("/admin/onibus", controllerOnibus.exibiOnibus)
app.post("/admin/onibus", controllerOnibus.addOnibus)
app.put("/admin/onibus/atualizar/:id")
app.delete("/admin/onibus/deletar/:id")

//funcionario 
app.get("/admin/funcionario", controllerFuncionario.exibirFuncionario)
app.post("/admin/funcionairo")
app.put("/admin/funcionairo/atualizar/:id")
app.delete("/admin/funcionairo/deletar/:id")

//rota
app.get("/admin/rota", controllerRota.exibirRotas)
app.post("/admin/rota", controllerRota.addRota)
app.put("/admin/rota/atualizar/:id")
app.delete("/admin/rota/deletar/:id")

//cidade
app.get("/admin/cidade", controllerCidade.exibirCidade)
app.post("/admin/cidade", controllerCidade.addCidade)

app.listen(port, ()=>{
    console.log(`Servidor conectado na porta ${port}`)
})