import "./style.css";
import { useState } from "react";
import { ImagePlus, Package, Save, Upload, X } from "lucide-react";

export default function InformacoesProduto() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
  }

  return (
    <section id="cadastrar-produto" className="product-card">
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
        <div className="product-content">
          <div className="product-main">
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o produto, ingredientes e características."
                />

                <span className="char-counter">{description.length}/500</span>
              </div>
            </div>
          </div>

          <div className="image-upload">
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

              {image ? (
                <>
                  <img
                    src={image}
                    alt="Preview do produto"
                    className="preview-image"
                  />

                  <span className="change-image">Trocar imagem</span>
                </>
              ) : (
                <>
                  <div className="upload-icon">
                    <ImagePlus size={38} />
                  </div>

                  <h3>Adicionar imagem</h3>

                  <p>Clique para selecionar uma imagem</p>

                  <span className="upload-button">
                    <Upload size={16} />
                    Selecionar arquivo
                  </span>
                </>
              )}
            </label>
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
