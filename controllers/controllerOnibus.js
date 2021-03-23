const connection = require('../database/connection')

const nomeTabela = 'Onibus'

module.exports = {

    async buscar(request, response){

        const {valorBusca} = request.body
        
        const query = `SELECT * FROM  ${nomeTabela} WHERE tipo = '${valorBusca}';`
    
        await connection.query(query)
            .then(res => {
                const rows = res.rows;
    
                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });
                //response.send(JSON.stringify(rows))
                response.render('onibusResultadoBusca', {
                    style: 'crud.css',
                    script: ['onibus.js', 'script.js'],
                    rows
                })
                
            })
            .catch(err => {
                console.log(err);
            });
    },

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
        const queryCriaPoltrona = `SELECT cria_poltrona(idOnibus, capacidade) FROM ${nomeTabela} WHERE idOnibus = (SELECT MAX(idOnibus) FROM ${nomeTabela});`
    
        await connection.query(queryCriaPoltrona)
            .then(res => {
                
                console.log("Poltronas cadastradas")
                
            })
            .catch(err => {
                console.log(err);
            });
            
           
           response.redirect('/onibus')
    
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
                console.log(err)   
            });
            
    },

    async deletaOnibus(request, response){
        //para deletar o onibus vamos deletar todas as poltronas associadas a esse onibus
        const {id} = request.params
        const nomeTabelaPoltrona = 'poltrona'

        const queryPoltrona  = `DELETE FROM ${nomeTabelaPoltrona} WHERE idOnibus = ${id}`
        const query  = `DELETE FROM ${nomeTabela} WHERE idOnibus = ${id}`

        let podeDeletar = false
        //primeiro ver se o onibus esta em alguma rota
        await connection.query(`SELECT * FROM Rota WHERE idOnibus = ${id}`)
                .then(res => {
                    const rows = res.rows;
                   
                    if(rows.length != 0){
                        podeDeletar = false
                    }else{
                        podeDeletar = true
                    }
                }).catch(err => {
                    console.log(err)
                })



        if(podeDeletar){

            await connection.query(queryPoltrona).then(res => {
                console.log("POLTRONA REMOVIDO COM SUCESSO")

                //response.status(200).send(" POLTRONA REMOVIDO COM SUCESSO")
            }).catch(err => {
                console.log(err)   
            })
            
            await connection.query(query).then(r => {
                console.log("ONIBUS REMOVIDO COM SUCESSO")
                // response.status(200).send("ONIBUS REMOVIDO COM SUCESSO")
            }).catch(err => {
                console.log(err) 
            })
           
        
        }else{
            console.log("não pode remover porque esse onibus esta cadastrado em alguma rota")
        }
       
               
    }

}