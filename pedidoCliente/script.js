// Modal //
function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrar');
    modal.addEventListener('click', (e) => {
        if (e.target.id == 'btn-cancelar') {
            modal.classList.remove('mostrar');
        }
    });
}

const adicionar = document.getElementById('btn-adicionar');
adicionar.addEventListener('click', () => iniciaModal('modal-add'));

function limpaModal() {
    // quando enviar os dados ou fechar o modal, quero que os inputs voltem a estar vazios
    const inputnome = document.getElementById('nome');
    const inputtipo = document.getElementById('tipo');
    const inputpaes = document.getElementById('quantidade');
    const inputpag = document.getElementById('formaPagamento');
    inputnome.value = '';
    inputtipo.value = '';
    inputpaes.value = '';
    inputpag.value = '';
}

// Cards //
let cards = [];

function remover(id) {
    cards.splice(id, 1);
    DOM.updateTotal();
    app.reload();
}

function addCard() {
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const paes = document.getElementById('quantidade').value;
    const pag = document.getElementById('formaPagamento').value;

    if (nome !== '' && tipo !== '' && (paes !== '' && paes > 0) && pag !== '') {
        cards.push({
            nome,
            tipo,
            paes,
            pag,
            id: cards.length,
            checkboxMarked: false,
        });

        document.getElementById('modal-add').classList.remove('mostrar');
        app.reload();
        DOM.updateTotal();
    } else {
        alert('Campo não preenchido ou preenchido incorretamente');
    }
}

const Total = {
    all: cards,

    add(card) {
        Total.all.push(card);
        app.reload();
    },

    remove(index) {
        Total.all.splice(index, 1);
        app.reload();
    },

    Totalpessoas() {
        let tpessoas = 0;
        Total.all.forEach(() => {
            tpessoas = tpessoas + 1;
        });
        return tpessoas;
    },

    TotalEntregues() {
        let checkedCount = 0;
        Total.all.forEach((card) => {
            if (card.checkboxMarked) {
                checkedCount++;
            }
        });
        return checkedCount;
    },

    TotalRestantes() {
        let uncheckedCount = 0;
        Total.all.forEach((card) => {
            if (!card.checkboxMarked) {
                uncheckedCount++;
            }
        });
        return uncheckedCount;
    },

    Totalpaes() {
        let tpaes = 0;
        Total.all.forEach((value) => {
            tpaes += Number(value.paes);
        });
        return tpaes;
    },

    Totaldinheiro() {
        let tdinheiro = 0;
        Total.all.forEach((value) => {
            tdinheiro += Number(value.paes / 2);
        });
        return util.formatCurrency(tdinheiro);
    },
};

const DOM = {
    cardContainer: document.querySelector('.cards-container #cards'),

    addCard(cards, index) {
        const article = document.createElement('article');
        article.innerHTML = DOM.innerHTMLcard(cards);

        DOM.cardContainer.appendChild(article);
    },

    innerHTMLcard(cards) {
        const valorpaes = util.formatCurrency(cards.paes);
        const isChecked = cards.checkboxMarked ? 'checked' : '';

        const html = `
        <article class="cards">
            <input type="checkbox" id="checkbox-${cards.id}" onclick="marcarCheckbox(${cards.id})" ${isChecked}>
            <div class="card-individual">
                <h4>${cards.nome}</h4>
                <div class="valores-individual">
                    <p>Tipo de Pão: <span>${cards.tipo}</span></p>
                    <p>Quantidade: <span>${cards.paes}</span></p>
                    <p>Total a pagar: R$ <span>${valorpaes / 2}</span></p>
                    <p>Forma de pagamento: <span>${cards.pag}</span></p>
                </div>
            </div>
            <button id="btn-remover" onclick="remover(${cards.id})"><img src="../images/lixeira-btn.svg" alt="remover" /></button>
        </article>
        `;

        return html;
    },

    updateTotal() {
        document.getElementById('total-pessoas').innerHTML = Total.Totalpessoas();
        document.getElementById('total-entregues').innerHTML = Total.TotalEntregues();
        document.getElementById('total-restantes').innerHTML = Total.TotalRestantes();
        document.getElementById('total-paes').innerHTML = Total.Totalpaes();
        document.getElementById('total-entrada').innerHTML = Total.Totaldinheiro();
    },

    clearCards() {
        DOM.cardContainer.innerHTML = '';
    },
};

const util = {
    formatCurrency(value) {
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return value;
    },
};

const app = {
    init() {
        Total.all.forEach((card) => {
            card.id = Total.all.indexOf(card);
            console.log(card.nome + ' ' + card.id + card.pag + ' ');
            DOM.addCard(card);
        });

        DOM.updateTotal();
    },

    reload() {
        DOM.clearCards();
        app.init();
    },
};

function marcarCheckbox(id) {
    const card = cards.find(card => card.id === id);
    card.checkboxMarked = !card.checkboxMarked;
    DOM.updateTotal();
}

app.init();
