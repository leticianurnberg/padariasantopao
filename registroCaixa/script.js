// Modal
function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrar');
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'btn-cancelar') {
        modal.classList.remove('mostrar');
      }
    });
  }
  
  const adicionar = document.getElementById('btn-adicionar');
  adicionar.addEventListener('click', () => iniciaModal('modal-add'));
  
  function limpaModal() {
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputTelefone = document.getElementById('telefone');
    const inputMensagem = document.getElementById('mensagem');
    inputNome.value = '';
    inputEmail.value = '';
    inputTelefone.value = '';
    inputMensagem.value = '';
  }
  
  // Cards
  let cards = [
  ];
  
  function remove(id) {
    cards.splice(id, 1);
    app.reload();
  }
  
  function addCard() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
  
    if (nome !== '' && email !== '' && telefone !== '' && mensagem !== '') {
      cards.push({
        nome,
        email,
        telefone,
        mensagem,
        id: cards.length,
      });
  
      document.getElementById('modal-add').classList.remove('mostrar');
      app.reload();
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
  };
  
  const DOM = {
    cardContainer: document.querySelector('.cards-container #cards'),
  
    addCard(card, index) {
      const article = document.createElement('article');
      article.innerHTML = DOM.innerHTMLCard(card);
  
      DOM.cardContainer.appendChild(article);
    },
  
    innerHTMLCard(card) {
      const html = `
      <article class="cards">
          <div class="card-individual">
              <h4>${card.nome}</h4>
              <div class="valores-individual">
                  <p>Email: <span>${card.email}</span></p>
                  <p>Telefone: <span>${card.telefone}</span></p>
                  <p>Descrição: <span>${card.mensagem}</span></p>
              </div>
          </div>
          <button id="btn-remover" onclick="remove(${card.id})"><img src="../images/lixeira-btn.svg" alt="remover" /></button>
      </article>
      `;
  
      return html;
    },
  
    clearCards() {
      DOM.cardContainer.innerHTML = '';
    },
  };
  
  const app = {
    init() {
      cards.forEach((card) => {
        DOM.addCard(card);
      });
    },
  
    reload() {
      DOM.clearCards();
      app.init();
    },
  };
  
  app.init();
  