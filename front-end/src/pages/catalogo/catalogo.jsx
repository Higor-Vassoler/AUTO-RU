import { useMemo, useState, useEffect } from "react";
import Layout from "../../components/layout/layout.jsx";
import "./catalogo.css";
import BarraPesquisa from "../../components/barra-pesquisa/barra-pesquisa.jsx";
import Filtros from "../../components/filtros/filtros.jsx";
import Alternador from "../../components/alternador/alternador.jsx";
import ProdutoCard from "../../components/produto-card/produto-card.jsx";
import ProdutoItem from "../../components/produto-item/produto-item.jsx";
import ModalProduto from "../../components/modal-produtos/modal-produtos.jsx";
import Paginacao from "../../components/paginacao/paginacao.jsx";

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [valorBusca, setValorBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [modoVisualizacao, setModoVisualizacao] = useState("grade");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const PRODUTOS_POR_PAGINA = 8;
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch("http://localhost:5000/api/produtos");
        const data = await response.json();

        if (response.ok) {
          const produtosAdaptados = data.map((produto) => ({
            ...produto,
            id_produto: produto.id,
            preco_unitario: produto.preco ? parseFloat(produto.preco) : 0.0,
            quantidade_estoque:
              produto.quantidade !== undefined ? produto.quantidade : 0,
            imagem: produto.imagem
              ? `http://localhost:5000/uploads/${produto.imagem}`
              : null,
          }));

          setProdutos(produtosAdaptados);
        } else {
          console.error("Erro ao buscar catálogo:", data.erro);
        }
      } catch (error) {
        console.error("Erro na requisição do catálogo:", error);
      }
    }

    fetchProdutos();
  }, []);

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
    let listaFiltrada = [...produtos];

    if (valorBusca.trim()) {
      listaFiltrada = listaFiltrada.filter((produto) =>
        produto.nome.toLowerCase().includes(valorBusca.toLowerCase()),
      );
    }

    if (categoriaSelecionada !== "Todas") {
      listaFiltrada = listaFiltrada.filter(
        (produto) => produto.categoria === categoriaSelecionada,
      );
    }

    switch (ordenacao) {
      case "az":
        listaFiltrada.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "za":
        listaFiltrada.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case "preco-menor":
        listaFiltrada.sort((a, b) => a.preco_unitario - b.preco_unitario);
        break;
      case "preco-maior":
        listaFiltrada.sort((a, b) => b.preco_unitario - a.preco_unitario);
        break;
      default:
        listaFiltrada.sort((a, b) => b.id_produto - a.id_produto);
    }

    return listaFiltrada;
  }, [produtos, valorBusca, categoriaSelecionada, ordenacao]);

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
          {}
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
