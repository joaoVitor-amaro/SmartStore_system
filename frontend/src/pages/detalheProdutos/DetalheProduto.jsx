import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./DetalheProduto.css";

const API_URL = "http://localhost:8080";

export default function DetalheProduto() {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState("");

  const [novaNota, setNovaNota] = useState(5);
  const [novoComentario, setNovoComentario] = useState("");
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  function showToast(mensagem, tipo = "sucesso") {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3000);
  }


  async function adicionarAoCarrinho() {
    if (!token) {
      showToast("Você precisa está logado", "erro");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/carrinho/adicionar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idProduto: produto.id,
          quantidade: quantidade,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const mensagemErro = data.errors?.[0] 
          || data.message 
          || "Erro ao adicionar ao carrinho.";
        showToast(mensagemErro, "erro");
        return;
      }

      showToast("Produto adicionado ao carrinho!", "sucesso");
      setTimeout(() => navigate("/carrinho"), 1500);
    } catch (error) {
      console.error(error);
      showToast("Erro ao conectar com o servidor.", "erro");
    }
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [resProduto, resAvaliacoes] = await Promise.all([
          fetch(`${API_URL}/produtos/${id}`),
          fetch(`${API_URL}/produtos/${id}/avaliacoes`)
        ]);

        if (!resProduto.ok) {
          throw new Error("Produto não encontrado.");
        }

        if (!resAvaliacoes.ok) {
          throw new Error("Erro ao buscar avaliações.");
        }

        const produtoData = await resProduto.json();
        const avaliacoesData = await resAvaliacoes.json();

        setProduto(produtoData);
        setImagemSelecionada(produtoData.imagemUrl);
        setAvaliacoes(avaliacoesData);
      } catch (err) {
        setErro(err.message || "Erro ao carregar produto.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id]);

  function aumentarQuantidade() {
    if(produto.estoque == quantidade) {
      return;
    }
    setQuantidade((q) => q + 1);
  }

  function diminuirQuantidade() {
    if (quantidade > 1) {
      setQuantidade((q) => q - 1);
    }
  }

  function renderEstrelas(nota) {
    const notaArredondada = Math.round(Number(nota) || 0);
    const cheias = "★".repeat(notaArredondada);
    const vazias = "☆".repeat(5 - notaArredondada);
    return cheias + vazias;
  }

  function larguraBarra(valor, total) {
    if (!total || total === 0) return "0%";
    return `${(valor / total) * 100}%`;
  }

  async function recarregarAvaliacoes() {
    const resposta = await fetch(`${API_URL}/produtos/${id}/avaliacoes`);

    if (!resposta.ok) {
      throw new Error("Erro ao atualizar avaliações.");
    }

    const data = await resposta.json();
    setAvaliacoes(data);
  }

  async function enviarAvaliacao() {
    const comentarioLimpo = novoComentario.trim();

    if (!comentarioLimpo) {
      showToast("Escreva um comentário antes de enviar.", "erro");
      return;
    }

    if (!token) {
      showToast("Faça login para avaliar", "erro");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    try {

      setEnviandoAvaliacao(true);

      const resposta = await fetch(`${API_URL}/produtos/${id}/avaliacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nota: novaNota,
          comentario: comentarioLimpo
        })
      });

      if (!resposta.ok) {
        throw new Error("Erro ao enviar avaliação.");
      }

      setNovoComentario("");
      setNovaNota(5);

      await recarregarAvaliacoes();

      showToast("Avaliação enviada!", "sucesso");

    } catch (error) {
      console.error(error);
      showToast("Não foi possível enviar a avaliação.", "erro");
    } finally {
      setEnviandoAvaliacao(false);
    }
  }

  if (carregando) {
    return <p className="mensagem">Carregando produto...</p>;
  }

  if (erro) {
    return (
      <div className="produto-page">
        <p className="mensagem erro">{erro}</p>
        <Link to="/" className="btn-voltar">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="produto-page">
      {toast && (
        <div
          className={`toast-flutuante ${toast.tipo === "erro" ? "toast-erro" : "toast-sucesso"}`}
        >
          {toast.mensagem}
        </div>
      )}
      <Breadcrumb
        items={[
            { label: "Home", path: "/" },
            {
            label: produto.categoriaNome,
            path: `/categoria/${produto.categoriaNome}`
            },
            {
            label: produto.nome,
            path: ""
            }
        ]}
        />

      <div className="produto-detalhe-container">
        <div className="produto-galeria-card">
          <div className="produto-imagem-principal">
            <img src={imagemSelecionada} alt={produto.nome} />
          </div>

          <div className="miniaturas">
            {[1, 2, 3, 4].map((item) => (
              <button
                key={item}
                className={`miniatura ${imagemSelecionada === produto.imagemUrl && item === 1 ? "ativa" : ""}`}
                onClick={() => setImagemSelecionada(produto.imagemUrl)}
                type="button"
              >
                <img src={produto.imagemUrl} alt={produto.nome} />
              </button>
            ))}
          </div>
        </div>

        <div className="produto-info-card">
          <div className="topo-info">
            <h1>{produto.nome}</h1>

            <div className="avaliacao-linha">
              <span className="estrelas">
                {renderEstrelas(avaliacoes?.mediaNotas || 0)}
              </span>

              <span className="nota">
                {avaliacoes ? Number(avaliacoes.mediaNotas).toFixed(1) : "0.0"}
              </span>

              <span className="qtd-avaliacoes">
                ({avaliacoes ? avaliacoes.totalAvaliacoes : 0} avaliações)
              </span>
            </div>

            <p className="preco">
              R$ {Number(produto.preco).toFixed(2)}
            </p>

            <p className="categoria-texto">{produto.categoriaNome}</p>
          </div>

          <div className="info-secundaria">
            <p><strong>Marca:</strong> {produto.marcaNome}</p>
            <p><strong>Fabricado em:</strong> {produto.localFabricado}</p>
            <p><strong>Estoque:</strong> {produto.estoque}</p>
          </div>

          <div className="quantidade-box">
            <label>Quantidade</label>
            <div className="controle-quantidade">
              <button type="button" onClick={diminuirQuantidade}>−</button>
              <span>{quantidade}</span>
              <button type="button" onClick={aumentarQuantidade}>+</button>
            </div>
          </div>

          <div className="acoes-produto">
            <button type="button" className="btn-carrinho" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
          </div>

          <div className="descricao-box">
            <h3>Descrição</h3>
            <p>{produto.descricao}</p>
          </div>

          <div className="beneficios-box">
            <div className="beneficio-item">Frete para todo o Brasil</div>
            <div className="beneficio-item">Pagamento seguro</div>
            <div className="beneficio-item">Garantia do vendedor</div>
          </div>

          <Link to="/" className="btn-voltar">
            Voltar para produtos
          </Link>
        </div>
      </div>

      <div className="secao-avaliacoes">
        <h2>Avaliações dos clientes</h2>

        <div className="resumo-avaliacoes">
          <div className="nota-geral">
            <span className="nota-grande">
              {avaliacoes ? Number(avaliacoes.mediaNotas).toFixed(1) : "0.0"}
            </span>

            <span className="estrelas-grandes">
              {renderEstrelas(avaliacoes?.mediaNotas || 0)}
            </span>

            <span>
              Baseado em {avaliacoes ? avaliacoes.totalAvaliacoes : 0} avaliações
            </span>
          </div>

          <div className="barras-avaliacao">
            {[5,4,3,2,1].map((estrela, i) => (
              <div className="barra-linha" key={estrela}>
                <span>{estrela} estrelas</span>
                <div className="barra">
                  <div
                    className="preenchimento"
                    style={{
                      width: larguraBarra(
                        avaliacoes?.distribuicao?.[i] || 0,
                        avaliacoes?.totalAvaliacoes || 0
                      )
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-avaliacao">
          <h3>Deixe sua avaliação</h3>

          <label htmlFor="nota">Nota</label>
          <select
            id="nota"
            value={novaNota}
            onChange={(e) => setNovaNota(Number(e.target.value))}
          >
            {[5,4,3,2,1].map(n => (
              <option key={n} value={n}>{n} estrelas</option>
            ))}
          </select>

          <label htmlFor="comentario">Comentário</label>
          <textarea
            id="comentario"
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Escreva sua opinião sobre o produto"
          />

          <button
            type="button"
            className="btn-enviar-avaliacao"
            onClick={enviarAvaliacao}
            disabled={enviandoAvaliacao}
          >
            {enviandoAvaliacao ? "Enviando..." : "Enviar avaliação"}
          </button>
        </div>

        <div className="lista-comentarios">
          {avaliacoes?.comentarios?.length > 0 ? (
            avaliacoes.comentarios.map((comentario) => (
              <div className="comentario-card" key={comentario.id}>
                <h4>{comentario.nomeCliente}</h4>
                <span className="estrelas">{renderEstrelas(comentario.nota)}</span>
                <p>{comentario.comentario}</p>
              </div>
            ))
          ) : (
            <p>Ainda não há avaliações para este produto.</p>
          )}
        </div>
      </div>
    </div>
  );
}