document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('listaProdutos');

  function carregarProdutos() {
    lista.innerHTML = '';
    const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');

    if (produtos.length === 0) {
      lista.innerHTML = '<p>Nenhum produto cadastrado.</p>';
      return;
    }

    produtos.forEach((prod, index) => {
      const div = document.createElement('div');
      div.className = 'produto-item';
      div.innerHTML = `
        <img src="${prod.imagem}" alt="${prod.nome}">
        <h3>${prod.nome}</h3>
        <p>R$${Number(prod.valor).toFixed(2)}</p>
        <button class="excluir">Excluir</button>
      `;

      const botaoExcluir = div.querySelector('.excluir');
      botaoExcluir.addEventListener('click', () => {
        mostrarConfirmacao(`Tem certeza que deseja excluir "${prod.nome}"?`, () => {
          produtos.splice(index, 1);
          localStorage.setItem('produtos', JSON.stringify(produtos));
          carregarProdutos();
        });
      });

      lista.appendChild(div);
    });
  }

  function mostrarConfirmacao(mensagem, onConfirmar) {
    const existente = document.querySelector('.confirm-overlay');
    if (existente) existente.remove();

    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-box">
        <h3>${mensagem}</h3>
        <div class="confirm-buttons">
          <button class="btn-sim">Sim</button>
          <button class="btn-nao">Não</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('.btn-sim').addEventListener('click', () => {
      onConfirmar();
      overlay.remove();
    });

    overlay.querySelector('.btn-nao').addEventListener('click', () => {
      overlay.remove();
    });
  }

  carregarProdutos();
});
