import { useMemo, useState } from "react";
import Layout from "../../components/layout/layout.jsx";
import "./catalogo.css";
import produtosFake from "./data/produtos-fake.js";
import BarraPesquisa from "../../components/barra-pesquisa/barra-pesquisa.jsx";
import Filtros from "../../components/filtros/filtros.jsx";
import Alternador from "../../components/alternador/alternador.jsx";
import ProdutoCard from "../../components/produto-card/produto-card.jsx";
import ProdutoItem from "../../components/produto-item/produto-item.jsx";
import ModalProduto from "../../components/modal-produtos/modal-produtos.jsx";
import Paginacao from "../../components/paginacao/paginacao.jsx";

export default function Catalogo() {
  const [valorBusca, setValorBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [modoVisualizacao, setModoVisualizacao] = useState("grade");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const PRODUTOS_POR_PAGINA = 8;
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  function abrirModal(produto) {
    setProdutoSelecionado(produto);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setProdutoSelecionado(null);
  }

  const handleBuscar = () => {
    setPaginaAtual(1);
  };
  const produtosFiltrados = useMemo(() => {
    let produtos = [...produtosFake];
    produtos.sort((a, b) => b.id_produto - a.id_produto);

    if (valorBusca.trim()) {
      produtos = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(valorBusca.toLowerCase()),
      );
    }

    if (categoriaSelecionada !== "Todas") {
      produtos = produtos.filter(
        (produto) => produto.categoria === categoriaSelecionada,
      );
    }

    switch (ordenacao) {
      case "az":
        produtos.sort((a, b) => a.nome.localeCompare(b.nome));
        break;

      case "za":
        produtos.sort((a, b) => b.nome.localeCompare(a.nome));
        break;

      case "preco-menor":
        produtos.sort((a, b) => a.preco_unitario - b.preco_unitario);
        break;

      case "preco-maior":
        produtos.sort((a, b) => b.preco_unitario - a.preco_unitario);
        break;

      default:
        produtos.sort((a, b) => b.id_produto - a.id_produto);
    }

    return produtos;
  }, [valorBusca, categoriaSelecionada, ordenacao]);
  const totalPaginas = Math.max(
    1,
    Math.ceil(produtosFiltrados.length / PRODUTOS_POR_PAGINA),
  );
  const indiceInicial = (paginaAtual - 1) * PRODUTOS_POR_PAGINA;
  const indiceFinal = indiceInicial + PRODUTOS_POR_PAGINA;
  const produtosPaginaAtual = produtosFiltrados.slice(
    indiceInicial,
    indiceFinal,
  );

  return (
    <Layout showSidebar={false}>
      <div className="catalogo-container">
        <div className="catalogo-topo">
          <div className="catalogo-titulos">
            <h1>Catálogo de Produtos</h1>
            <p>Encontre os produtos disponíveis no RU da sua faculdade.</p>
          </div>

          <div className="catalogo-busca">
            <BarraPesquisa
              valorBusca={valorBusca}
              setValorBusca={setValorBusca}
              onBuscar={handleBuscar}
            />
          </div>
        </div>

        <div className="catalogo-filtros">
          <Filtros
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
            setPaginaAtual={setPaginaAtual}
          />

          <Alternador
            modoVisualizacao={modoVisualizacao}
            onModoChange={setModoVisualizacao}
          />
        </div>

        <div className="catalogo-info">
          <span>Mostrando {produtosFiltrados.length} produtos</span>
        </div>

        {modoVisualizacao === "grade" ? (
          <div className="catalogo-grade">
            {produtosPaginaAtual.map((produto) => (
              <ProdutoCard
                key={produto.id_produto}
                produto={produto}
                onClick={() => abrirModal(produto)}
              />
            ))}
          </div>
        ) : (
          <div className="catalogo-lista">
            {produtosPaginaAtual.map((produto) => (
              <ProdutoItem
                key={produto.id_produto}
                produto={produto}
                onClick={() => abrirModal(produto)}
              />
            ))}
          </div>
        )}

        {totalPaginas > 1 && (
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPaginaChange={setPaginaAtual}
          />
        )}

        <ModalProduto
          key={produtoSelecionado?.id_produto}
          produto={produtoSelecionado}
          aberto={modalAberto}
          onClose={fecharModal}
        />
      </div>
    </Layout>
  );
}
