import "./style.css";
import { Package } from "lucide-react";

export default function InformacoesProduto() {
  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Produto salvo com sucesso!");

    event.currentTarget.reset();
  };

  return (
    <section className="product-card">
      <div className="product-header">
        <div className="product-icon">
          <Package size={28} />
        </div>

        <div>
          <h2>Informações do produto</h2>
          <p>Informe os dados do produto que será cadastrado.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="field flex-2">
            <label>Nome do produto *</label>
            <input type="text" placeholder="Ex.: Suco de Laranja Natural" />
          </div>

          <div className="field">
            <label>ID do produto *</label>
            <input type="text" placeholder="Ex.: SUC001" />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Preço *</label>
            <input type="text" placeholder="R$ 0,00" />
          </div>

          <div className="field">
            <label>Categoria *</label>
            <select>
              <option>Selecione a categoria</option> <option>Bebidas</option>
              <option>Lanches</option>
              <option>Doces</option>
              <option>Refeições</option>
            </select>
          </div>

          <div className="field">
            <label>Quantidade *</label>
            <input type="number" placeholder="Ex.: 50" />
          </div>
        </div>

        <div className="field">
          <label>Descrição *</label>
          <textarea placeholder="Descreva o produto, ingredientes, características e demais informações." />
        </div>

        <div className="actions">
          <button type="reset" className="btn-cancel">
            Cancelar
          </button>

          <button type="submit" className="btn-save">
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
}
