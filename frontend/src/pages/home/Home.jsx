import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/produtos/home")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h2>Produtos</h2>

      <div className="product-grid">
        {produtos.map((p, index) => (
            <div className="product-card" key={index}>
            <img src={p.imagemUrl} alt={p.nome} />

            <div className="product-info">
            <h5>{p.nome}</h5>

            <p className="product-price">
                R$ {Number(p.preco).toFixed(2)}
            </p>

            <p className="product-category">
                {p.categoriaNome}
            </p>
            </div>

            <Link to={`/produto/${p.id}`} className="details-button">
            Ver detalhes
            </Link>
            </div>
        ))}
        </div>
    </div>
  );
}