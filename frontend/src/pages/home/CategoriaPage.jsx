import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import "./Home.css";

export default function CategoriaPage() {
  const { nomeCategoria } = useParams();
  const location = useLocation();
  const [produtos, setProdutos] = useState([]);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const nome = params.get("nome") || "";

  let urlFinal = `http://localhost:8080/produtos/categoria/${encodeURIComponent(nomeCategoria)}`;

  if (nome.trim()) {
    urlFinal = `http://localhost:8080/produtos/buscar?nome=${encodeURIComponent(nome)}&categoria=${encodeURIComponent(nomeCategoria)}`;
  }

  fetch(urlFinal)
    .then((res) => res.json())
    .then((data) => setProdutos(data))
    .catch((err) => console.error(err));
}, [nomeCategoria, location.search]);

  return (
  <div className="home-container">
    <Breadcrumb
      items={[
        { label: "Home", path: "/" },
        { label: nomeCategoria, path: "" }
      ]}
    />

    <h2>Categoria: {nomeCategoria}</h2>

    <div className="product-grid">
      {produtos.map((p) => (
        <div className="product-card" key={p.id}>
          <Link to={`/produtos/${p.id}`} className="card-link">
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
          </Link>

          <Link to={`/produtos/${p.id}`} className="details-button">
            Ver detalhes
          </Link>
        </div>
      ))}
    </div>
  </div>
);
}