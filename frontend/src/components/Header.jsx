import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ categorias = [] }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const location = useLocation();

  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nome = params.get("nome") || "";

    let categoria = params.get("categoria") || "";

    if (!categoria && location.pathname.startsWith("/categoria/")) {
      categoria = decodeURIComponent(location.pathname.replace("/categoria/", ""));
    }

    setTermoBusca(nome);
    setCategoriaSelecionada(categoria);
  }, [location.search, location.pathname]);

  function aplicarFiltros(nome, categoria) {
    const nomeLimpo = nome.trim();
    const categoriaLimpa = categoria.trim();

    const paramsAtuais = new URLSearchParams(location.search);
    const novosParams = new URLSearchParams();

    if (nomeLimpo) novosParams.set("nome", nomeLimpo);

    if (paramsAtuais.get("marca")) novosParams.set("marca", paramsAtuais.get("marca"));
    if (paramsAtuais.get("precoMin")) novosParams.set("precoMin", paramsAtuais.get("precoMin"));
    if (paramsAtuais.get("precoMax")) novosParams.set("precoMax", paramsAtuais.get("precoMax"));
    if (paramsAtuais.get("disponivel")) novosParams.set("disponivel", paramsAtuais.get("disponivel"));
    if (paramsAtuais.get("estoqueBaixo")) novosParams.set("estoqueBaixo", paramsAtuais.get("estoqueBaixo"));
    if (paramsAtuais.get("ordenar")) novosParams.set("ordenar", paramsAtuais.get("ordenar"));

    if (categoriaLimpa) {
      novosParams.set("categoria", categoriaLimpa);
      navigate(`/categoria/${encodeURIComponent(categoriaLimpa)}?${novosParams.toString()}`);
      return;
    }

    navigate(`/${novosParams.toString() ? `?${novosParams.toString()}` : ""}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    aplicarFiltros(termoBusca, categoriaSelecionada);
  }

  function handleCategoriaChange(e) {
    const novaCategoria = e.target.value;
    setCategoriaSelecionada(novaCategoria);
    aplicarFiltros(termoBusca, novaCategoria);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          SmartStore
        </Link>

        <div className="flex-grow-1 d-flex justify-content-center">
          <form className="d-flex" style={{ width: "700px" }} onSubmit={handleSubmit}>
            <select
              className="form-select w-auto border-end-0 rounded-end-0"
              value={categoriaSelecionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Categorias</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nome}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <input
              className="form-control rounded-start-0"
              type="text"
              placeholder="Buscar produtos..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </form>
        </div>

        <div className="d-flex gap-4 align-items-center">
          {token ? (
            <>
              <div className="d-flex flex-column text-end">
                <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>
                  Olá, {localStorage.getItem("nome") || email?.split("@")[0]}
                </span>
                <div className="d-flex flex-column align-items-end">
                  <Link
                    to="/meusProdutos"
                    className="text-muted text-decoration-none"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Meus Produtos
                  </Link>
                  <Link
                    to="/minhas-compras"
                    className="text-muted text-decoration-none"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Minhas Compras
                  </Link>
                </div>
              </div>

              <Link
                to="/carrinho"
                className="btn btn-primary d-flex align-items-center gap-1"
              >
                <span style={{ fontSize: "1rem" }}>🛒</span>
                <span style={{ fontSize: "0.8rem" }}>Carrinho</span>
              </Link>

              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary" : "btn btn-outline-primary"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/usuario/cadastro"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary" : "btn btn-outline-primary"
                }
              >
                Cadastrar
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}