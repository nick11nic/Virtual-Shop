document.addEventListener('DOMContentLoaded', () => {
  const contadorCarrinho = document.querySelector('.header .cart p');
  const listaCarrinho = document.querySelector('.item-carrinho-lista');
  const totalGeral = document.getElementById('total-geral');
  const containerProdutos = document.querySelector('.linha-produto');
  let itens = JSON.parse(localStorage.getItem('carrinhoItens') || '[]');

  //carrinho
  function atualizarContador() {
    contadorCarrinho.textContent = itens.length;
  }

  function calcularTotal() {
    return itens.reduce((soma, item) => soma + Number(item.preco), 0);
  }

  function renderizarCarrinho() {
    listaCarrinho.innerHTML = '';

    //se vazio
    if (itens.length === 0) {
      const vazio = document.createElement('div');
      vazio.className = 'item-carrinho-vazio';
      vazio.textContent = 'Seu carrinho está vazio!';
      listaCarrinho.appendChild(vazio);
      totalGeral.textContent = 'R$0.00';
      return;
    }

    //lista itens
    itens.forEach((item, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'item-carrinho';
      wrapper.innerHTML = `
        <div class="linha-da-imagem">
          <img src="${item.imagem}" class="img-carrinho" alt="">
        </div>
        <p>${item.nome}</p>
        <h2 class="total">$${Number(item.preco).toFixed(2)}</h2>
        <button class="remover-btn" data-index="${index}" style="border:none; background:none; cursor:pointer;">
          <i class="fa fa-trash-o"></i>
        </button>
      `;
      listaCarrinho.appendChild(wrapper);
    });

    totalGeral.textContent = `$${calcularTotal().toFixed(2)}`;

    //remover item
    listaCarrinho.querySelectorAll('.remover-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-index'));
        itens.splice(i, 1);
        salvarEAtualizar();
      });
    });
  }

  //salvar e atualizar
  function salvarEAtualizar() {
    localStorage.setItem('carrinhoItens', JSON.stringify(itens));
    atualizarContador();
    renderizarCarrinho();
  }

  const produtosSalvos = JSON.parse(localStorage.getItem('produtos') || '[]');

  //listar produtos
  produtosSalvos.forEach(prod => {
    const produtoDiv = document.createElement('div');
    produtoDiv.className = 'corpoProduto';
    produtoDiv.innerHTML = `
      <div class="imgProduto">
        <img src="${prod.imagem}" alt="${prod.nome}" class="produtoMiniatura">
      </div>
      <div class="titulo">
        <p>${prod.nome}</p>
        <h2>R$${Number(prod.valor).toFixed(2)}</h2>
        <button class="button addcarrinho">Adicionar</button>
      </div>
    `;

    //adicionar ao carrinho
    produtoDiv.querySelector('.addcarrinho').addEventListener('click', () => {
      itens.push({
        id: prod.id,
        nome: prod.nome,
        preco: prod.valor,
        imagem: prod.imagem
      });
      salvarEAtualizar();
    });

    containerProdutos.appendChild(produtoDiv);
  });

  //inicializa
  salvarEAtualizar();
});
