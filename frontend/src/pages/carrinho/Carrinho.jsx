import { useState } from "react";

const initialItems = [
  { id: 1, nome: "Smartphone Galaxy S22", preco: 4299.0, quantidade: 1, emoji: "📱" },
  { id: 2, nome: 'Smart TV 50" 4K', preco: 2899.9, quantidade: 1, emoji: "📺" },
  { id: 3, nome: "Fone de Ouvido Bluetooth", preco: 499.99, quantidade: 1, emoji: "🎧" },
];

const FRETE = 45.0;
const DESCONTO = 150.0;

const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Carrinho() {
  const [itens, setItens] = useState(initialItems);

  const alterar = (id, delta) => {
    setItens((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, quantidade: item.quantidade + delta } : item)
        .filter((item) => item.quantidade > 0)
    );
  };

  const remover = (id) => setItens((prev) => prev.filter((i) => i.id !== id));

  const subtotal = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const total = subtotal + FRETE - DESCONTO;

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />

      <div className="bg-light min-vh-100 py-4">
        <div className="container">
          <h4 className="fw-bold mb-4">
            Seu Carrinho de Compras{" "}
            <span className="text-primary">
              ({itens.length} {itens.length === 1 ? "item" : "itens"})
            </span>
          </h4>

          <div className="row g-4">
            {/* ===== COLUNA ITENS ===== */}
            <div className="col-12 col-lg-8">

              {itens.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-3">
                  <div className="card-body text-center text-muted py-5">
                    Seu carrinho está vazio.
                  </div>
                </div>
              ) : (
                <>
                  {/* TABELA — visível apenas em telas md+ */}
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
                            <tr key={item.id}>
                              <td className="ps-4">
                                <div className="d-flex align-items-center gap-3">
                                  <div
                                    className="rounded-3 d-flex align-items-center justify-content-center bg-dark text-white flex-shrink-0"
                                    style={{ width: 52, height: 52, fontSize: 24 }}
                                  >
                                    {item.emoji}
                                  </div>
                                  <div>
                                    <div className="fw-semibold small">{item.nome}</div>
                                    <div className="text-muted" style={{ fontSize: "0.78rem" }}>
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
                                    onClick={() => alterar(item.id, -1)}
                                  >−</button>
                                  <span className="fw-semibold" style={{ minWidth: 20, textAlign: "center" }}>
                                    {item.quantidade}
                                  </span>
                                  <button
                                    className="btn btn-outline-secondary btn-sm rounded-circle"
                                    style={{ width: 28, height: 28, padding: 0, lineHeight: 1 }}
                                    onClick={() => alterar(item.id, +1)}
                                  >+</button>
                                </div>
                              </td>

                              <td className="fw-semibold small">
                                {fmt(item.preco * item.quantidade)}
                              </td>

                              <td>
                                <button
                                  className="btn btn-link btn-sm text-primary p-0 text-decoration-none"
                                  onClick={() => remover(item.id)}
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

                  {/* CARDS — visível apenas em telas pequenas (mobile) */}
                  <div className="d-md-none d-flex flex-column gap-3">
                    {itens.map((item) => (
                      <div key={item.id} className="card border-0 shadow-sm rounded-3">
                        <div className="card-body">
                          {/* Linha superior: emoji + nome + remover */}
                          <div className="d-flex align-items-start gap-3 mb-3">
                            <div
                              className="rounded-3 d-flex align-items-center justify-content-center bg-dark text-white flex-shrink-0"
                              style={{ width: 52, height: 52, fontSize: 24 }}
                            >
                              {item.emoji}
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-semibold">{item.nome}</div>
                              <div className="text-muted small">{fmt(item.preco)}</div>
                            </div>
                            <button
                              className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                              onClick={() => remover(item.id)}
                            >
                              Remover
                            </button>
                          </div>

                          {/* Linha inferior: quantidade + subtotal */}
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-outline-secondary btn-sm rounded-circle"
                                style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
                                onClick={() => alterar(item.id, -1)}
                              >−</button>
                              <span className="fw-semibold px-1">{item.quantidade}</span>
                              <button
                                className="btn btn-outline-secondary btn-sm rounded-circle"
                                style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
                                onClick={() => alterar(item.id, +1)}
                              >+</button>
                            </div>
                            <div className="fw-bold text-dark">
                              {fmt(item.preco * item.quantidade)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ===== RESUMO DO PEDIDO ===== */}
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
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between small mb-2">
                    <span className="text-muted">Frete</span>
                    <span>{fmt(FRETE)}</span>
                  </div>
                  <div className="d-flex justify-content-between small mb-2 text-success">
                    <span>Desconto</span>
                    <span>− {fmt(DESCONTO)}</span>
                  </div>

                  <div className="d-flex justify-content-between fw-bold pt-3 mt-2 border-top">
                    <span>Total do Pedido:</span>
                    <span>{fmt(total)}</span>
                  </div>

                  <button className="btn btn-primary w-100 mt-3 fw-semibold">
                    Finalizar Compra
                  </button>
                  <button className="btn btn-outline-primary w-100 mt-2 fw-semibold">
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}