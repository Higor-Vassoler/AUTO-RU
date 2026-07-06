import { useMemo, useState, useEffect, useContext } from "react";
import Layout from "../../components/layout/layout.jsx";
import "./catalogo.css";
import BarraPesquisa from "../../components/barra-pesquisa/barra-pesquisa.jsx";
import Filtros from "../../components/filtros/filtros.jsx";
import Alternador from "../../components/alternador/alternador.jsx";
import ProdutoCard from "../../components/produto-card/produto-card.jsx";
import ProdutoItem from "../../components/produto-item/produto-item.jsx";
import ModalProduto from "../../components/modal-produtos/modal-produtos.jsx";
import Paginacao from "../../components/paginacao/paginacao.jsx";
import { CartContext } from "../../context/cart-context.js";
import {
  adaptarListaProdutos,
  filtrarEOrdenarProdutos,
  paginarProdutos,
} from "../../utils/catalogo/catalogo-produtos.js";

const PRODUTOS_POR_PAGINA = 8;

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [valorBusca, setValorBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [modoVisualizacao, setModoVisualizacao] = useState("grade");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch("http://localhost:5000/api/produtos");
        const data = await response.json();

        if (response.ok) {
          const listaDeProdutos = data.dados || data;

          if (Array.isArray(listaDeProdutos)) {
            setProdutos(adaptarListaProdutos(listaDeProdutos));
          } else {
            console.error(
              "O backend não retornou uma lista válida de produtos.",
            );
          }
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

  function handleBuscar() {
    setPaginaAtual(1);
  }

  const produtosFiltrados = useMemo(
    () =>
      filtrarEOrdenarProdutos(
        produtos,
        valorBusca,
        categoriaSelecionada,
        ordenacao,
      ),
    [produtos, valorBusca, categoriaSelecionada, ordenacao],
  );

  const { totalPaginas, produtosPaginaAtual } = useMemo(
    () => paginarProdutos(produtosFiltrados, paginaAtual, PRODUTOS_POR_PAGINA),
    [produtosFiltrados, paginaAtual],
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
          key={produtoSelecionado?.id_produto ?? "vazio"}
          produto={produtoSelecionado}
          aberto={modalAberto}
          onClose={() => setModalAberto(false)}
          onAddCart={addToCart}
        />
      </div>
    </Layout>
  );
}
