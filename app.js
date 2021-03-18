  
const express = require('express')

const port = 8081

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//para imprimir valores da tabela use
app.get("/", (req, res) => {
    res.send("olaa")
})


app.listen(port, ()=>{
    console.log(`Servidor conectado na porta ${port}`)
})