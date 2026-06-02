import "./style.css"; // Seu CSS continua exatamente o mesmo!

export default function CadastroProduto() {
  // Função que lida com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o refresh da página

    alert("Produto salvo com sucesso!");

    event.currentTarget.reset(); // Limpa todos os campos nativamente
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="topo">
          <legend className="titulo">Dados Basicos</legend>
          <p>Preencha as informações para cadastrar ou editar o produto.</p>
        </div>

        <div className="coluna_pai">
          <div className="coluna_filha">
            <h2>Identificação</h2>

            <div className="campo">
              <label htmlFor="id_produto">Código/Id:</label>
              <input
                type="text"
                id="id_produto"
                name="id"
                pattern="[0-9]{13}"
                placeholder="789 123456 789 0"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Nome do produto"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="venda">Preço de Venda:</label>
              <input
                type="text"
                id="venda"
                name="venda"
                inputMode="decimal"
                placeholder="R$0,00"
                pattern="[0-9]+,[0-9]{2}"
                required
              />
              <small>Formato: 0,00</small>
            </div>
          </div>

          <div className="coluna_filha">
            <h2>Detalhes</h2>

            <div className="campo">
              <label htmlFor="categoria">Categoria</label>
              <select id="categoria" name="categoria" required>
                <option value="">Selecione uma opção</option>
                <option value="bebida">Bebida</option>
                <option value="comida">Comida</option>
                <option value="doces">Doces</option>
                <option value="ficha">Ficha</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="estoque">Quantidade</label>
              <input
                type="number"
                id="estoque"
                name="estoque"
                min="0"
                placeholder="Quantidade no estoque"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="Escreva aqui"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="botoes">
          <button type="reset" id="cancelar">
            Cancelar
          </button>
          <button type="submit" id="salvar" name="salvar" value="salvo">
            Salvar
          </button>
        </div>
      </fieldset>
    </form>
  );
}
