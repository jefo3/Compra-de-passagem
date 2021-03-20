const connection = require('../database/connection')

const nomeTabela = 'Funcionario'

module.exports = {

    async exibirFuncionario(request, response){
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

    async addFuncionario(request, response){
        const {cpf, nome, email, dataNasc, login, senha} = request.body

        
        const query = `INSERT INTO Funcionario(cpf, nome, email, dataNasc, login, senha)
                        VALUES('${cpf}', '${nome}','${email}', '${dataNasc}', '${login}', '${senha}');`

        await connection.query(query).then(res =>{
            response.send("funcionario adicionada")
        }).catch(err=>{
            console.log(err)
        })
    },

    async atualizaFuncionario(request, response){

    },

    async deletaFuncionario(request, response){
        
    }


}