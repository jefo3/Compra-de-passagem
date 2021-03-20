const connection = require('../database/connection')

const nomeTabela = 'Cidade'

module.exports = {

    async exibirCidade(request, response){
        const query = `SELECT * FROM ${nomeTabela};`
    
        await connection.query(query)
            .then(res => {
                const rows = res.rows;
    
                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });
                response.send(JSON.stringify(rows))
                
            })
            .catch(err => {
                console.log(err);
            });
            
       
    },

    async addCidade(request, response){
        const {nome, estado} = request.body

        const query = `INSERT INTO Cidade(nome, estado) VALUES('${nome}', '${estado}');`

        connection.query(query).then(res =>{
            response.send("cidade adicionada")
        }).catch(err=>{
            console.log(err)
        })
    }
}