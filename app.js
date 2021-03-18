const express = require('express')
const connection = require('./database/connection')

const port = 8081

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())


//para imprimir valores da tabela use
app.get("/", (request, response) => {
    const query = 'SELECT * FROM Agencia;';

    connection.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });
            response.send(JSON.stringify(rows))
            //process.exit();
            
        })
        .catch(err => {
            console.log(err);
        });
        
   
})


app.listen(port, ()=>{
    console.log(`Servidor conectado na porta ${port}`)
})