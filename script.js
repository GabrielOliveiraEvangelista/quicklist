const nomeProduto = document.getElementById('nomeProduto');
const quantidadeProduto = document.getElementById('quantidadeProduto');
const divUl = document.getElementById('tamanhoLi');
const form = document.querySelector('form');
const btnExcluir = document.getElementById('btnExcluir');
const btnImprimir = document.getElementById('btnImprimir');
const footer = document.querySelector('footer')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    adicionarItem(nomeProduto.value.toUpperCase(), quantidadeProduto.value);
    btnExcluir.classList.add('btnAtivo');
    btnImprimir.classList.add('btnAtivo');
});

btnExcluir.addEventListener('click', () => {
    const inputCheckboxes = document.querySelectorAll('.inputCheckbox:checked');
    inputCheckboxes.forEach(checkbox => {
        checkbox.closest('li').remove();
        footer.classList.add('btnAtivo');
        setTimeout(() => {
            footer.classList.remove('btnAtivo');
        }, 3000);
    });


    if (divUl.querySelectorAll('li').length === 0) {
        btnExcluir.classList.remove('btnAtivo');
        btnImprimir.classList.remove('btnAtivo');
    }
});
btnImprimir.addEventListener('click', () => {
    const items = Array.from(divUl.querySelectorAll('li')).map(li => {
        const nome = li.querySelector('#alinharLi span').textContent;
        const quantidade = li.querySelector('#qntItem').textContent;
        return { nome, quantidade };
    });

    const itemsParam = encodeURIComponent(JSON.stringify(items));
    const url = `relatorio.html?items=${itemsParam}`;
    const printWindow = window.open(url, '_blank');

    printWindow.onload = function () {
        printWindow.print();
    };
});


function adicionarItem(nome, quantidade) {
    const newLi = document.createElement('li');

    const newDiv = document.createElement("div");
    newDiv.id = "alinharLi";

    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.name = 'itemSelecionado';
    inputCheckbox.className = 'inputCheckbox';

    const spanNome = document.createElement('span');
    spanNome.textContent = nome;

    const spanQuantidade = document.createElement('span');
    spanQuantidade.textContent = quantidade;
    spanQuantidade.id = 'qntItem'

    newLi.appendChild(newDiv);
    newDiv.appendChild(inputCheckbox);
    newDiv.appendChild(spanNome);
    newLi.appendChild(spanQuantidade);

    divUl.appendChild(newLi);
}
