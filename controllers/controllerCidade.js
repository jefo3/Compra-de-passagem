const connection = require('../database/connection')

const nomeTabela = 'Cidade'

module.exports = {

    async buscar(request, response){

        const {valorBusca} = request.body
        
        const query = `SELECT * FROM ${nomeTabela} WHERE nome = '${valorBusca}' OR estado = '${valorBusca}';`
    
        await connection.query(query)
            .then(res => {
                const rows = res.rows;
    
                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });
                //response.send(JSON.stringify(rows))
                response.render('telaResultadoBusca', {
                    style: 'crud.css',
                    script: ['cidade.js', 'script.js'],
                    rows
                })
                
            })
            .catch(err => {
                console.log(err);
            });
    },

    async exibirCidade(request, response){
        const query = `SELECT * FROM ${nomeTabela};`
    
        await connection.query(query)
            .then(res => {
                const rows = res.rows;
    
                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });
                //response.send(JSON.stringify(rows))
                response.render('cidade', {
                    style: 'crud.css',
                    script: ['cidade.js', 'script.js'],
                    rows
                })
                
            })
            .catch(err => {
                console.log(err);
            });
            
       
    },

    async addCidade(request, response){
        const {nome, estado} = request.body

        const query = `INSERT INTO Cidade(nome, estado) VALUES('${nome}', '${estado}');`

        await connection.query(query).then(res =>{
            //response.send("cidade adicionada")
            response.redirect('/cidade')
        }).catch(err=>{
            console.log(err)
            response.send(err)
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
            response.send(err)
        })
    },

}