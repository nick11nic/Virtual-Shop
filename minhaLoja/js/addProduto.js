document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formProduto');
  const popup = document.getElementById('popupMensagem');
  const popupTexto = document.getElementById('popupTexto');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const valor = parseFloat(form.valor.value.trim());
    const arquivo = form.capa.files[0];

    if (!arquivo) {
      mostrarPopup('Por favor, selecione uma imagem!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imagemBase64 = reader.result;

      const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');

      const novoProduto = {
        id: Date.now(),
        nome,
        valor,
        imagem: imagemBase64
      };

      produtos.push(novoProduto);
      localStorage.setItem('produtos', JSON.stringify(produtos));

      mostrarPopup('Produto adicionado com sucesso!');
      form.reset();
    };

    reader.readAsDataURL(arquivo);
  });

  function mostrarPopup(mensagem) {
    popupTexto.textContent = mensagem;
    popup.style.display = 'flex';
    popup.style.opacity = '1';
    
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 200);
    }, 1800);
  }
});
