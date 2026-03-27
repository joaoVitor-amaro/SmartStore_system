import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalheProduto.css";

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

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
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) {
    return <p className="mensagem">Carregando produto...</p>;
  }

  if (erro) {
    return (
      <div className="produto-detalhe-container">
        <p className="mensagem erro">{erro}</p>
        <Link to="/" className="btn-voltar">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="produto-detalhe-container">
      <div className="produto-detalhe-card">
        <div className="produto-imagem-area">
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            className="produto-imagem"
          />
        </div>

        <div className="produto-info-area">
          <h1>{produto.nome}</h1>
          <p className="preco">R$ {Number(produto.preco).toFixed(2)}</p>

          <p>
            <strong>Categoria:</strong> {produto.categoria}
          </p>

          <p>
            <strong>Estoque:</strong> {produto.estoque}
          </p>

          <p className="descricao">
            <strong>Descrição:</strong> {produto.descricao}
          </p>

          <Link to="/" className="btn-voltar">
            Voltar para produtos
          </Link>
        </div>
      </div>
    </div>
  );
}