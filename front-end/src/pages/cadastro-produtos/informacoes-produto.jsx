import "./style.css";
import { Package, Save, X } from "lucide-react";

export default function InformacoesProduto() {
  return (
    <section className="product-card">
      <div className="product-header">
        <div className="product-icon">
          <Package size={24} />
        </div>

        <div>
          <h2>Informações do produto</h2>
          <p>Informe os dados do produto que será cadastrado.</p>
        </div>
      </div>

      <form>
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
              <option>Selecione a categoria</option>
              <option>Bebidas</option>
              <option>Lanches</option>
              <option>Doces</option>
              <option>Refeições</option>
            </select>
          </div>

          <div className="field">
            <label>Quantidade *</label>
            <input type="number" min="1" placeholder="Ex.: 50" />
          </div>
        </div>

        <div className="field">
          <label>Descrição *</label>

          <div className="textarea-wrapper">
            <textarea
              maxLength={500}
              placeholder="Descreva o produto, seus ingredientes, características, etc."
            />

            <span className="char-counter">0/500</span>
          </div>
        </div>

        <div className="actions">
          <button type="reset" className="btn-cancel">
            <X size={18} />
            Cancelar
          </button>

          <button type="submit" className="btn-save">
            <Save size={18} />
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
}
