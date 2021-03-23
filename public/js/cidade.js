const registros = document.querySelectorAll('.tables tr')
const deleteBtn = document.querySelectorAll('.delete')
const editBtn = document.querySelectorAll('.edit')
const addBtn = document.querySelectorAll('.add')

// Editar
editBtn.forEach((edit)=>{
    edit.onclick = function(e){
        e.preventDefault()
        const id = edit.parentElement.parentElement.getAttribute('identificador')

        // Trocando a exibição dos botões
        const add = document.querySelector(`[identificador="${id}"] > td .add`)
        edit.style.display = "none";
        add.style.display = 'inline-block'

        // Tornando a linha editável
        const trChilds = document.querySelectorAll(`[identificador="${id}"] > .rowData`)
        trChilds.forEach((tr)=>{
            tr.setAttribute('contenteditable', 'true')
        })
        
        // Atualizando valores
        add.onclick = function(e){
            e.preventDefault()

            // Pegando os valores das linhas
            const obj = {
                idcidade: trChilds[0].innerHTML,
                nome: trChilds[1].innerHTML,
                estado: trChilds[2].innerHTML
            }

            editarRegistro(id, obj)

            // Volta para o conteúdo não editável e icone de edit
            trChilds.forEach((tr)=>{
                tr.setAttribute('contenteditable', 'false')
            })
            edit.style.display = "inline-block";
            add.style.display = 'none'
            
        }

    }
})

// Buscar

const selectBusca = document.querySelector('.selectBusca')
const inputBusca = document.querySelector('.inputBusca')

selectBusca.onclick = function(e){
    if(selectBusca.value == "nome"){
        inputBusca.setAttribute('type', 'text')
    } else if(selectBusca.value == "estado"){
        inputBusca.setAttribute('type', 'number')
    } 
}


// Deletar
deleteBtn.forEach((del)=>{
    del.onclick = function(e){
        e.preventDefault()
        // retorna o id da tag <tr>
        const id = del.parentElement.parentElement.getAttribute('identificador') 
        deletarRegistro(id)
        location.reload()
    }
})

function deletarRegistro(id){
    fetch(`/delCidade/${id}`,{
        method: 'DELETE'});
}