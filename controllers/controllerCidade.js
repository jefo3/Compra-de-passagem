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

        await connection.query(query).then(res =>{
            response.send("cidade adicionada")
        }).catch(err=>{
            console.log(err)
        })
    },

    //remove se a cidade não estiver na rota(nem como cidade de origem nem como destino)
    async deletaCidade(request, response){
        const {id} = request.params

        const query  = `DELETE FROM ${nomeTabela} WHERE idCidade = ${id}`

        await connection.query(query).then(
            response.send("REMOVIDO COM SUCESSO")
        ).catch(err => {
            console.log(err)
        })
    },
}