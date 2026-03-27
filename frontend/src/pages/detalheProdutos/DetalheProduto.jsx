import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalheProduto.css";

export default function DetalheProduto() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Produto não encontrado.");
        }
        return res.json();
      })
      .then((data) => {
        setProduto(data);
        setImagemSelecionada(data.imagemUrl);
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message);
        setCarregando(false);
      });
  }, [id]);

  function aumentarQuantidade() {
    setQuantidade((q) => q + 1);
  }

  function diminuirQuantidade() {
    if (quantidade > 1) {
      setQuantidade((q) => q - 1);
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
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>{produto.categoriaNome}</span>
        <span>›</span>
        <span>{produto.nome}</span>
      </div>

      <div className="produto-detalhe-container">
        <div className="produto-galeria-card">
          <div className="produto-imagem-principal">
            <img src={imagemSelecionada} alt={produto.nome} />
          </div>

          <div className="miniaturas">
            <button
              className="miniatura ativa"
              onClick={() => setImagemSelecionada(produto.imagemUrl)}
            >
              <img src={produto.imagemUrl} alt={produto.nome} />
            </button>

            <button
              className="miniatura"
              onClick={() => setImagemSelecionada(produto.imagemUrl)}
            >
              <img src={produto.imagemUrl} alt={produto.nome} />
            </button>

            <button
              className="miniatura"
              onClick={() => setImagemSelecionada(produto.imagemUrl)}
            >
              <img src={produto.imagemUrl} alt={produto.nome} />
            </button>

            <button
              className="miniatura"
              onClick={() => setImagemSelecionada(produto.imagemUrl)}
            >
              <img src={produto.imagemUrl} alt={produto.nome} />
            </button>
          </div>
        </div>

        <div className="produto-info-card">
          <div className="topo-info">
            <h1>{produto.nome}</h1>

            <div className="avaliacao-linha">
              <span className="estrelas">★★★★☆</span>
              <span className="nota">4.3</span>
              <span className="qtd-avaliacoes">(128 avaliações)</span>
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
              <button onClick={diminuirQuantidade}>−</button>
              <span>{quantidade}</span>
              <button onClick={aumentarQuantidade}>+</button>
            </div>
          </div>

          <div className="acoes-produto">
            <button className="btn-carrinho">Adicionar ao Carrinho</button>
            <button className="btn-comprar">Comprar Agora</button>
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
            <span className="nota-grande">4.3</span>
            <span className="estrelas-grandes">★★★★☆</span>
            <span>Baseado em 128 avaliações</span>
          </div>

          <div className="barras-avaliacao">
            <div className="barra-linha">
              <span>5 estrelas</span>
              <div className="barra"><div className="preenchimento w80"></div></div>
            </div>
            <div className="barra-linha">
              <span>4 estrelas</span>
              <div className="barra"><div className="preenchimento w60"></div></div>
            </div>
            <div className="barra-linha">
              <span>3 estrelas</span>
              <div className="barra"><div className="preenchimento w35"></div></div>
            </div>
            <div className="barra-linha">
              <span>2 estrelas</span>
              <div className="barra"><div className="preenchimento w20"></div></div>
            </div>
            <div className="barra-linha">
              <span>1 estrela</span>
              <div className="barra"><div className="preenchimento w10"></div></div>
            </div>
          </div>
        </div>

        <div className="lista-comentarios">
          <div className="comentario-card">
            <h4>João Silva</h4>
            <span className="estrelas">★★★★★</span>
            <p>Muito bom, chegou rápido e o produto veio em perfeito estado.</p>
          </div>

          <div className="comentario-card">
            <h4>Maria Souza</h4>
            <span className="estrelas">★★★★☆</span>
            <p>Gostei bastante. Bom custo-benefício e desempenho muito bom.</p>
          </div>

          <div className="comentario-card">
            <h4>Carlos Lima</h4>
            <span className="estrelas">★★★★☆</span>
            <p>Produto bonito e funcional. A bateria poderia durar um pouco mais.</p>
          </div>
        </div>
      </div>
    </div>
  );
}