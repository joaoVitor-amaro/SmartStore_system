import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import FiltrosSidebar from "../../components/FiltrosSidebar.jsx";
import "./Home.css";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const filtrosAtuais = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return {
      nome: params.get("nome") || "",
      categoria: params.get("categoria") || "",
      marca: params.get("marca") || "",
      precoMin: params.get("precoMin") || "",
      precoMax: params.get("precoMax") || "",
      disponivel: params.get("disponivel") || "",
      estoqueBaixo: params.get("estoqueBaixo") || "",
      ordenar: params.get("ordenar") || ""
    };
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.toString();

    const urlFinal = query
      ? `http://localhost:8080/produtos/buscar?${query}`
      : "http://localhost:8080/produtos/home";

    fetch(urlFinal)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, [location.search]);

  function aplicarFiltros(filtros) {
    const paramsAtuais = new URLSearchParams(location.search);
    const nomeAtual = paramsAtuais.get("nome") || "";

    const novos = new URLSearchParams();

    if (nomeAtual.trim()) novos.set("nome", nomeAtual.trim());
    if (filtros.categoria) novos.set("categoria", filtros.categoria);
    if (filtros.marca) novos.set("marca", filtros.marca);
    if (filtros.precoMin) novos.set("precoMin", filtros.precoMin);
    if (filtros.precoMax) novos.set("precoMax", filtros.precoMax);
    if (filtros.disponivel) novos.set("disponivel", "true");
    if (filtros.ordenar) novos.set("ordenar", filtros.ordenar);

    navigate(`/${novos.toString() ? `?${novos.toString()}` : ""}`);
  }

  return (
    <div className="home-page">
      <Breadcrumb items={[{ label: "Home", path: "/" }]} />

      <div className="home-layout">
        <FiltrosSidebar
          filtrosAtuais={filtrosAtuais}
          onAplicar={aplicarFiltros}
        />

        <div className="home-content">
          <h2>Produtos</h2>

          <div className="product-grid">
            {produtos.length > 0 ? (
              produtos.map((p) => (
                <div className="product-card" key={p.id}>
                  <Link to={`/produtos/${p.id}`} className="card-link">
                    <img src={p.imagemUrl} alt={p.nome} />

                    <div className="product-info">
                      <h5>{p.nome}</h5>

                      <p className="product-price">
                        R$ {Number(p.preco).toFixed(2)}
                      </p>

                      <p className="product-category">{p.categoriaNome}</p>

                      {p.marcaNome && (
                        <p className="product-brand">Marca: {p.marcaNome}</p>
                      )}

                      <p className={`product-stock ${p.estoque > 0 ? "ok" : "off"}`}>
                        {p.estoque > 0 ? `Em estoque: ${p.estoque}` : "Indisponível"}
                      </p>
                    </div>
                  </Link>

                  <Link to={`/produtos/${p.id}`} className="details-button">
                    Ver detalhes
                  </Link>
                </div>
              ))
            ) : (
              <p className="empty-products">
                Nenhum produto encontrado com esses filtros.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}