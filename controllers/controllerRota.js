const connection = require('../database/connection')

const nomeTabela = 'Rota'

module.exports = {
    
    async addRota(request, response){
        
        const { tempoViagem, dataHoraViagem, idOnibus, origem, destino } = request.body

        const query = `INSERT INTO ${nomeTabela}(tempoViagem, dataHoraViagem, idOnibus, origem, destino)
		                VALUES(${tempoViagem}, '${dataHoraViagem}', ${idOnibus}, ${origem}, ${destino});`
    
        await connection.query(query)
            .then(res => {
        
                response.send("Rota cadastrada")
                
            })
            .catch(err => {
                console.log(err);
            });
    },

    async exibirRotas(request, response){
        const query = `SELECT idRota, tempoViagem, TO_CHAR(dataHoraViagem, 'YYYY-MM-DD HH24:MI:SS') AS dataHoraViagem, idOnibus, origem, destino FROM ${nomeTabela};`
    
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

    async atualizaRota(request, response){
        const {id} = request.params
        const {tempoViagem, dataHoraViagem, idOnibus, origem, destino} = request.body

        
        const query  = `UPDATE ${nomeTabela} 
                        SET(tempoViagem, dataHoraViagem, idOnibus, origem, destino) 
                        = ('${tempoViagem}', '${dataHoraViagem}', '${idOnibus}', '${origem}', '${destino}') 
                        WHERE idRota = '${id}'`

        await connection.query(query).then(
            response.send("Atualizado COM SUCESSO")
        ).catch(err => {
            console.log(err)
        })
    },

    async deletaRota(request, response){
        const {id} = request.params

        const query  = `DELETE FROM ${nomeTabela} WHERE idRota = ${id}`

        await connection.query(query).then(
            response.send("REMOVIDO COM SUCESSO")
        ).catch(err => {
            console.log(err)
        })
    },

}