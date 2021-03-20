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
app.delete("/admin/onibus/deletar/:id", controllerOnibus.deletaOnibus)

//funcionario 
app.get("/admin/funcionario", controllerFuncionario.exibirFuncionario)
app.post("/admin/funcionario", controllerFuncionario.addFuncionario)
app.put("/admin/funcionario/atualizar/:id", controllerFuncionario.atualizaFuncionario)
app.delete("/admin/funcionario/deletar/:id", controllerFuncionario.deletaFuncionario)

//rota
app.get("/admin/rota", controllerRota.exibirRotas)
app.post("/admin/rota", controllerRota.addRota)
app.put("/admin/rota/atualizar/:id", controllerRota.atualizaRota)
app.delete("/admin/rota/deletar/:id", controllerRota.deletaRota)

//cidade
app.get("/admin/cidade", controllerCidade.exibirCidade)
app.post("/admin/cidade", controllerCidade.addCidade)
app.delete("/admin/cidade/deletar/:id", controllerCidade.deletaCidade)

app.listen(port, ()=>{
    console.log(`Servidor conectado na porta ${port}`)
})