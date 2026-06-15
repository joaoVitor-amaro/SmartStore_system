import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const fmt = (v) =>
  Number(v ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const API_URL = "http://localhost:8080";

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [subtotalOriginal, setSubtotalOriginal] = useState(0);
  const [totalDesconto, setTotalDesconto] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const [resumoDesconto, setResumoDesconto] = useState("");

  const navigate = useNavigate();

  const carregarCarrinho = () => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/carrinho/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const carrinho = data.data;

        setItens(carrinho?.itens || []);
        setSubtotalOriginal(carrinho?.subtotalOriginal || 0);
        setTotalDesconto(carrinho?.totalDesconto || 0);
        setTotalFinal(carrinho?.totalFinal || 0);
        setResumoDesconto(carrinho?.resumoDesconto || "");
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar carrinho:", err);
        setCarregando(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    carregarCarrinho();
  }, [navigate]);

  const alterar = (idProduto, delta) => {
    const token = localStorage.getItem("token");
    const item = itens.find((i) => i.idProduto === idProduto);

    if (!item) return;

    const novaQuantidade = (item.quantidade ?? 0) + delta;

    if (novaQuantidade > (item.estoque ?? Infinity)) return;
    if (novaQuantidade < 0) return;

    fetch(
      `${API_URL}/carrinho/item/${idProduto}?quantidade=${novaQuantidade}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => carregarCarrinho())
      .catch((err) => console.error("Erro ao atualizar quantidade:", err));
  };

  const remover = (idProduto) => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/carrinho/item/${idProduto}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => carregarCarrinho())
      .catch((err) => console.error("Erro ao remover item:", err));
  };

  if (carregando) {
    return <p className="text-center mt-5">Carregando carrinho...</p>;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />

      <div className="bg-light min-vh-100 py-4">
        <div className="container">
          <h4 className="fw-bold mb-4">
            Seu Carrinho de Compras{" "}
            <span className="text-primary">
              ({itens.length} {itens.length === 1 ? "item" : "itens"})
            </span>
          </h4>

          <div className="row g-4">
            <div className="col-12 col-lg-8">
              {itens.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-3">
                  <div className="card-body text-center text-muted py-5">
                    Seu carrinho está vazio.
                  </div>
                </div>
              ) : (
                <>
                  <div className="d-none d-md-block card shadow-sm border-0 rounded-3">
                    <div className="card-body p-0">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="ps-4 py-3">Produto</th>
                            <th>Preço Unitário</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itens.map((item) => (
                            <tr key={item.idProduto}>
                              <td className="ps-4">
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={item.imagemUrl}
                                    alt={item.nomeProduto}
                                    className="rounded-3 flex-shrink-0"
                                    style={{ width: 52, height: 52, objectFit: "cover" }}
                                  />
                                  <div>
                                    <div className="fw-semibold small">
                                      {item.nomeProduto}
                                    </div>
                                    <div
                                      className="text-muted"
                                      style={{ fontSize: "0.78rem" }}
                                    >
                                      {fmt(item.preco)}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="small">{fmt(item.preco)}</td>

                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                    className="btn btn-outline-secondary btn-sm rounded-circle"
                                    style={{ width: 28, height: 28, padding: 0, lineHeight: 1 }}
                                    onClick={() => alterar(item.idProduto, -1)}
                                  >
                                    −
                                  </button>

                                  <span
                                    className="fw-semibold"
                                    style={{ minWidth: 20, textAlign: "center" }}
                                  >
                                    {item.quantidade}
                                  </span>

                                  <button
                                    className="btn btn-outline-secondary btn-sm rounded-circle"
                                    style={{ width: 28, height: 28, padding: 0, lineHeight: 1 }}
                                    onClick={() => alterar(item.idProduto, +1)}
                                    disabled={item.quantidade >= item.estoque}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              <td className="fw-semibold small">
                                <div>
                                  {fmt(
                                    item.subtotalFinal ??
                                      ((item.preco ?? 0) * (item.quantidade ?? 0) -
                                        (item.valorDesconto ?? 0))
                                  )}
                                </div>

                                {(item.valorDesconto ?? 0) > 0 && (
                                  <>
                                    <div
                                      className="text-decoration-line-through text-muted"
                                      style={{ fontSize: "0.78rem" }}
                                    >
                                      {fmt(
                                        item.subtotalOriginal ??
                                          (item.preco ?? 0) * (item.quantidade ?? 0)
                                      )}
                                    </div>

                                    <div
                                      className="text-success"
                                      style={{ fontSize: "0.78rem" }}
                                    >
                                      - {fmt(item.valorDesconto ?? 0)} (
                                      {item.percentualDesconto ?? 0}%)
                                    </div>

                                  </>
                                )}
                              </td>

                              <td>
                                <button
                                  className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                                  onClick={() => remover(item.idProduto)}
                                >
                                  Remover
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="d-md-none d-flex flex-column gap-3">
                    {itens.map((item) => (
                      <div
                        key={item.idProduto}
                        className="card border-0 shadow-sm rounded-3"
                      >
                        <div className="card-body">
                          <div className="d-flex align-items-start gap-3 mb-3">
                            <img
                              src={item.imagemUrl}
                              alt={item.nomeProduto}
                              className="rounded-3 flex-shrink-0"
                              style={{ width: 52, height: 52, objectFit: "cover" }}
                            />

                            <div className="flex-grow-1">
                              <div className="fw-semibold">{item.nomeProduto}</div>
                              <div className="text-muted small">{fmt(item.preco)}</div>
                            </div>

                            <button
                              className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                              onClick={() => remover(item.idProduto)}
                            >
                              Remover
                            </button>
                          </div>

                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-outline-secondary btn-sm rounded-circle"
                                style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
                                onClick={() => alterar(item.idProduto, -1)}
                              >
                                −
                              </button>

                              <span className="fw-semibold px-1">{item.quantidade}</span>

                              <button
                                className="btn btn-outline-secondary btn-sm rounded-circle"
                                style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
                                onClick={() => alterar(item.idProduto, +1)}
                                disabled={item.quantidade >= item.estoque}
                              >
                                +
                              </button>
                            </div>

                            <div className="text-end fw-bold text-dark">
                              <div>
                                {fmt(
                                  item.subtotalFinal ??
                                    ((item.preco ?? 0) * (item.quantidade ?? 0) -
                                      (item.valorDesconto ?? 0))
                                )}
                              </div>

                              {(item.valorDesconto ?? 0) > 0 && (
                                <>
                                  <div className="small text-muted text-decoration-line-through">
                                    {fmt(
                                      item.subtotalOriginal ??
                                        (item.preco ?? 0) * (item.quantidade ?? 0)
                                    )}
                                  </div>

                                  <div className="small text-success">
                                    - {fmt(item.valorDesconto ?? 0)} (
                                    {item.percentualDesconto ?? 0}%)
                                  </div>

                                  <div className="small text-muted">
                                    {item.motivoResumo ?? ""}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="col-12 col-lg-4">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3 pb-3 border-bottom">Resumo do Pedido</h6>

                  <div className="d-flex justify-content-between small mb-2">
                    <span className="text-muted">Total de Produtos</span>
                    <span>{itens.length}</span>
                  </div>

                  <div className="d-flex justify-content-between small mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>{fmt(subtotalOriginal)}</span>
                  </div>

                  <div className="d-flex justify-content-between small mb-2">
                    <span className="text-muted">Desconto</span>
                    <span className="text-success">- {fmt(totalDesconto)}</span>
                  </div>

                  <div className="d-flex justify-content-between fw-bold pt-3 mt-2 border-top">
                    <span>Total do Pedido:</span>
                    <span>{fmt(totalFinal)}</span>
                  </div>

                  <Link to="/confirmarPedido">
                    <button className="btn btn-primary w-100 mt-3 fw-semibold">
                      Finalizar Compra
                    </button>
                  </Link>

                  <button
                    className="btn btn-outline-primary w-100 mt-2 fw-semibold"
                    onClick={() => navigate("/")}
                  >
                    Continuar Comprando
                  </button>

                  {totalDesconto > 0 && (
                    <div
                      className="small text-success mt-3 text-center"
                      style={{ lineHeight: "1.4" }}
                    >
                      {resumoDesconto}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}