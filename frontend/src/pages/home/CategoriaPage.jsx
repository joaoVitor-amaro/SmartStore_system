import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Home.css";

export default function CategoriaPage() {
  const { nomeCategoria } = useParams();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/categoria/${nomeCategoria}`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, [nomeCategoria]);

  return (
    <div className="home-container">
      <h2>Categoria: {nomeCategoria}</h2>

      <div className="product-grid">
        {produtos.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.imagemUrl} alt={p.nome} />
            <h5>{p.nome}</h5>
            <p>R$ {Number(p.preco).toFixed(2)}</p>

            <Link to={`/produtos/${p.id}`} className="details-button">
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}