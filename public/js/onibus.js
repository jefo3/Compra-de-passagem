const registros = document.querySelectorAll('.tables tr')
const deleteBtn = document.querySelectorAll('.delete')
const editBtn = document.querySelectorAll('.edit')
const addBtn = document.querySelectorAll('.add')

// Buscar

const selectBusca = document.querySelector('.selectBusca')
const inputBusca = document.querySelector('.inputBusca')

selectBusca.onclick = function(e){
    if(selectBusca.value == "origem"){
        inputBusca.setAttribute('type', 'text')
    } else if(selectBusca.value == "destino"){
        inputBusca.setAttribute('type', 'text')
    } 
}


// Deletar
deleteBtn.forEach((del)=>{
    del.onclick = function(e){
        e.preventDefault()
        // retorna o id da tag <tr>
        const id = del.parentElement.parentElement.getAttribute('identificador') 
        deletarRegistro(id)

        setTimeout(function(){ location.reload(); }, 1000);
    }
})

function deletarRegistro(id){
    fetch(`/delOnibus/${id}`,{
        method: 'DELETE'});

}