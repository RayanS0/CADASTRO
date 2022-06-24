const KEY_BD = '@empregostrabalho'

let listaEmpresas = {
    ultimoCod : 0,
    empresas :[]
}

function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaEmpresas));
}

function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaEmpresas = JSON.parse(data);
    }
    desenhar();
}


function desenhar(){
    debugger;
    const tbody = document.getElementById("listaEmpregos")
    if(tbody){
        tbody.innerHTML = listaEmpresas.empresas
        .sort((a, b) => {
            return a.nomeEmpresa < b.nomeEmpresa ? -1: 1
           
        })
        .map(empresas =>{

            return `<tr>
                        <td>${empresas.id}</td>
                        <td>${empresas.nomeEmpresa}</td>
                        <td>${empresas.nomeVaga}</td>
                        <td>${empresas.telefone}</td>
                        <td>${empresas.email}</td>
                        <td>${empresas.regiao}</td>
                        <td>
                            <button onclick='vizualizar("cadastro", false ,${empresas.id})'>Editar</button>
                            <button class="vermelho" onclick="perguntaExcluir(${empresas.id})">Excluir</button>
                        </td>
                    <tr/>`
        }) .join('')
    }
}
function salvar(nomeEmpresa , nomeVaga, telefone, email, regiao){
    const id = listaEmpresas.ultimoCod + 1;
    listaEmpresas.ultimoCod =  id;
    listaEmpresas.empresas.push({
        id, nomeEmpresa, nomeVaga, telefone, email, regiao
    })
    gravarBD();
    desenhar();
    vizualizar("lista");
}

function deletar(id){
    listaEmpresas.empresas = listaEmpresas.empresas.filter(emprego => {
        return emprego.id != id
    })
    desenhar();
    gravarBD();
}

function editar(id, nomeEmpresa, nomeVaga, telefone, email, regiao){
    let emprego = listaEmpresas.empresas.find(emprego => emprego.id == id)
    emprego.nomeEmpresa = nomeEmpresa
    emprego.nomeVaga = nomeVaga
    emprego.telefone = telefone
    emprego.email = email
    emprego.regiao = regiao
    gravarBD();
    desenhar();
    vizualizar("lista");
}

function perguntaExcluir(id){
    if(confirm('Que deletar esse resgistro?')){
        deletar(id);
        desenhar();
    }

}

function limparEdicao(){
    document.getElementById("nomeEmpresa").value = ''
    document.getElementById("nomeVaga").value= ''
    document.getElementById("telefone").value= ''
    document.getElementById("email").value= ''
    document.getElementById("regiao").value= ''
}

function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page', pagina)
    if (pagina = 'cadastro'){
        if(novo) limparEdicao();
        if(id){
            const emprego =listaEmpresas.empresas.find(emprego => emprego.id == id)
            if(emprego){
                document.getElementById("id").value = emprego.id
                document.getElementById("nomeEmpresa").value = emprego.nomeEmpresa
                document.getElementById("nomeVaga").value= emprego.nomeVaga
                document.getElementById("telefone").value= emprego.telefone
                document.getElementById("email").value= emprego.email
                document.getElementById("regiao").value= emprego.regiao
            }
        }
        document.getElementById("nomeEmpresa").focus();
    }
}

function submeter(e){
    e.preventDefault()
    const data = {
        id:document.getElementById("id").value,
        nomeEmpresa:document.getElementById("nomeEmpresa").value,
        nomeVaga:document.getElementById("nomeVaga").value,
        telefone:document.getElementById("telefone").value,
        email:document.getElementById("email").value,
        regiao:document.getElementById("regiao").value,
    }
    if (data.id){
        editar(data.id, data.nomeEmpresa, data.nomeVaga, data.telefone, data.email, data.regiao)
    }else{
        salvar(data.nomeEmpresa, data.nomeVaga, data.telefone, data.email, data.regiao)
    }
}

window.addEventListener('load', () =>{
    lerBD();
    document.getElementById("cadastroRegistros").addEventListener('submit', submeter)
})
