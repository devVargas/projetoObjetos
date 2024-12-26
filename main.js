let listaDeItens = [];
let itemEditar;

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens));
}

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada);
    mostrarItens();
} else {
    listaDeItens = [];
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    salvarItens();
    mostrarItens();
    itensInput.focus();
});

function salvarItens() {
    const comprasItem = itensInput.value;
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());
 
    if (checarDuplicado) {
        alert("Item já existe.");
    } else {
         listaDeItens.push({
            valor: comprasItem,
            checar: false
        });
    }
    itensInput.value = "";
};

function mostrarItens() {
    ulItens.innerHTML = "";
    ulItensComprados.innerHTML = "";

    listaDeItens.forEach((elemento, index) => {
        if(elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
        `;
        } else {
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.valor}"${index !== Number(itemEditar) ? 'disabled' : ''}></input>
                </div>
                <div>
                    ${ index === Number(itemEditar) ? '<button onclick="editarItem()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `;
        };
    });

    const inputCheck = document.querySelectorAll('input[type="checkbox"]');
    inputCheck.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            valorDoElemento = event.target.parentElement.parentElement.getAttribute("data-value");
            listaDeItens[valorDoElemento].checar = event.target.checked;
            mostrarItens();
        });
    });

    const deletar = document.querySelectorAll(".deletar");
    deletar.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            valorDoElemento = event.target.parentElement.parentElement.getAttribute("data-value");
            listaDeItens.splice(valorDoElemento, 1);
            mostrarItens();
        });
    });

    const editarItens = document.querySelectorAll(".editar");
    editarItens.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            itemEditar = event.target.parentElement.parentElement.getAttribute("data-value");
            mostrarItens();
        });
    });
    atualizaLocalStorage();
}

function editarItem() {
    const itemEditado = document.querySelector(`[data-value="${itemEditar}"] input[type="text"]`);
    listaDeItens[itemEditar].valor = itemEditado.value;
    itemEditar = -1;
    mostrarItens();
}