import { useState, useEffect } from "react";
import "./informacoes-produto.css";
import { ImagePlus, Package, Save, Upload, X } from "lucide-react";

export default function InformacoesProduto({
  onProdutoSalvo,
  produtoEmEdicao,
  setProdutoEmEdicao,
}) {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");

  const [imagemArquivo, setImagemArquivo] = useState(null);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (produtoEmEdicao) {
      setNome(produtoEmEdicao.nome || "");
      setCodigo(produtoEmEdicao.codigo || "");
      setPreco(produtoEmEdicao.preco || "");
      setCategoria(produtoEmEdicao.categoria || "");
      setQuantidade(produtoEmEdicao.quantidade || "");
      setDescricao(produtoEmEdicao.descricao || "");

      if (produtoEmEdicao.imagem) {
        setProductImage(
          `http://localhost:5000/uploads/${produtoEmEdicao.imagem}`,
        );
      } else {
        setProductImage(null);
      }
    } else {
      limparCampos();
    }
  }, [produtoEmEdicao]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (productImage && !produtoEmEdicao?.imagem) {
      URL.revokeObjectURL(productImage);
    }

    setImagemArquivo(file);
    setProductImage(URL.createObjectURL(file));
  }

  function limparCampos() {
    setNome("");
    setCodigo("");
    setPreco("");
    setCategoria("");
    setQuantidade("");
    setDescricao("");
    setImagemArquivo(null);
    setProductImage(null);
  }

  function handleReset() {
    limparCampos();
    if (setProdutoEmEdicao) {
      setProdutoEmEdicao(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("codigo", codigo);
    formData.append("preco", preco);
    formData.append("categoria", categoria);
    formData.append("quantidade", quantidade);
    formData.append("descricao", descricao);

    if (imagemArquivo) {
      formData.append("imagem", imagemArquivo);
    }

    try {
      const url = produtoEmEdicao
        ? `http://localhost:5000/api/produtos/${produtoEmEdicao.id}`
        : "http://localhost:5000/api/produtos";

      const metodo = produtoEmEdicao ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          produtoEmEdicao
            ? "Produto atualizado com sucesso!"
            : "Produto cadastrado com sucesso!",
        );
        handleReset();

        if (onProdutoSalvo) {
          onProdutoSalvo();
        }
      } else {
        alert("Erro: " + (data.erro || "Verifique os dados."));
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <section id="cadastrar-produto" className="product-card">
      <div className="product-header">
        <div className="product-icon">
          <Package size={24} />
        </div>
        <div>
          <h2>Informações do produto</h2>
          <p>
            Informe os dados do produto que será{" "}
            {produtoEmEdicao ? "atualizado" : "cadastrado"}.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="product-content">
          <div className="product-main">
            <div className="row">
              <div className="field flex-2">
                <label>Nome do produto *</label>
                <input
                  type="text"
                  placeholder="Ex.: Suco de Laranja Natural"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>ID do produto *</label>
                <input
                  type="text"
                  placeholder="Ex.: SUC001"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Preço *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Ex.: 15.50"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Categoria *</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="">Selecione a categoria</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Lanches">Lanches</option>
                  <option value="Doces">Doces</option>
                  <option value="Refeições">Refeições</option>
                </select>
              </div>

              <div className="field">
                <label>Quantidade *</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Ex.: 50"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Descrição *</label>
              <div className="textarea-wrapper">
                <textarea
                  maxLength={500}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o produto, ingredientes e características."
                  required
                />
                <span className="char-counter">{descricao.length}/500</span>
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
              {productImage ? (
                <>
                  <img
                    src={productImage}
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
          <button type="button" className="btn-cancel" onClick={handleReset}>
            <X size={18} />
            Cancelar
          </button>
          <button type="submit" className="btn-save">
            <Save size={18} />
            {produtoEmEdicao ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </section>
  );
}
