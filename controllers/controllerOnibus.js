const connection = require('../database/connection')

const nomeTabela = 'Onibus'

module.exports = {

    async addOnibus(request, response){

        const {capacidade, tipo} = await request.body;
    
        const query = `INSERT INTO ${nomeTabela}(capacidade, tipo) values(${capacidade}, '${tipo}');`
    
        await connection.query(query)
            .then(res => {
                console.log("Onibus cadastrado")   
            })
            .catch(err => {
                console.log(err)
            });
            
        //chamar querry q vai criar as poltronas vai chamar a function
        //do banco que recebe o id do onibus e a capacidade
        const queryCriaPoltrona = `SELECT cria_poltrona(idOnibus, vazia, capacidade) FROM ${nomeTabela} WHERE idOnibus = (SELECT MAX(idOnibus) FROM ${nomeTabela});`
    
        await connection.query(queryCriaPoltrona)
            .then(res => {
                
                console.log("Poltronas cadastradas")
                
            })
            .catch(err => {
                console.log(err);
            });
            
            //response.send("onibus criado")
            response.render('onibus', {
                style: 'crud.css',
                script: ['onibus.js', 'script.js']
            })
    
    },

    async exibirOnibus(request, response){
        const query = `SELECT * FROM ${nomeTabela};`
    
        await connection.query(query)
            .then(res => {
                const rows = res.rows;
    
                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });
                
                //response.send(JSON.stringify(rows))
                response.render('onibus', {
                    style: 'crud.css',
                    script: ['onibus.js', 'script.js'],
                    rows
                })
                
            })
            .catch(err => {
                console.log(err);
            });
            
    },

    async deletaOnibus(request, response){
        //para deletar o onibus vamos deletar todas as poltronas associadas a esse onibus
        const {id} = request.params
        const nomeTabelaPoltrona = 'poltrona'

        const queryPoltrona  = `DELETE FROM ${nomeTabelaPoltrona} WHERE idOnibus = ${id}`
        const query  = `DELETE FROM ${nomeTabela} WHERE idOnibus = ${id}`

        await connection.query(queryPoltrona).then(
            response.send(" POLTRONA REMOVIDO COM SUCESSO")
        ).catch(err => {
            console.log(err)
        })

        await connection.query(query).then(
            response.send("ONIBUS REMOVIDO COM SUCESSO")
        ).catch(err => {
            console.log(err)
        })
        
    }

}