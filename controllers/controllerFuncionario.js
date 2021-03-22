const connection = require('../database/connection')

const nomeTabela = 'Funcionario'

module.exports = {

    async exibirFuncionario(request, response){
        const query = `SELECT cpf, nome, email, TO_CHAR(dataNasc, 'YYYY-MM-DD') AS dataNasc, login, senha FROM ${nomeTabela};`
    
        await connection.query(query)
            .then(res => {
                const rows = res.rows;
    
                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });
                //response.send(JSON.stringify(rows))
                response.render('funcionario', {
                    style: 'crud.css',
                    script: ['funcionario.js', 'script.js'],
                    rows
                })
                
            })
            .catch(err => {
                console.log(err);
            });
    },

    async addFuncionario(request, response){
        const {cpf, nome, email, dataNasc, login, senha} = request.body

        
        const query = `INSERT INTO Funcionario(cpf, nome, email, dataNasc, login, senha)
                        VALUES('${cpf}', '${nome}','${email}', '${dataNasc}', '${login}', '${senha}');`

        await connection.query(query).then(res =>{
            //response.send("funcionario adicionada")
            response.render('funcionario', {
                style: 'crud.css',
                script: ['funcionario.js', 'script.js'],
                rows
            })
        }).catch(err=>{
            console.log(err)
        })
    },

    async atualizaFuncionario(request, response){
        const {id} = request.params
        const {cpf, nome, email, dataNasc, login, senha} = request.body

        console.log(cpf, nome, email, dataNasc, login, senha)
        const query  = `UPDATE ${nomeTabela} 
                        SET(cpf, nome, email, dataNasc, login, senha) 
                        = ('${cpf}', '${nome}', '${email}', '${dataNasc}', '${login}', '${senha}') 
                        WHERE cpf = '${id}'`

        await connection.query(query).then(
            //response.send("Atualizado COM SUCESSO")
            response.status(200).send()
        ).catch(err => {
            console.log(err)
        })
    },

    async deletaFuncionario(request, response){
        const {id} = request.params

        const query  = `DELETE FROM ${nomeTabela} WHERE cpf = '${id}'`

        await connection.query(query).then(
            response.send("REMOVIDO COM SUCESSO")
        ).catch(err => {
            console.log(err)
        })
    },


}