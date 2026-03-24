import { useEffect, useState } from "react";
import "./Home.css";

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

            <h5>{p.nome}</h5>
            <p>R$ {Number(p.preco).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}