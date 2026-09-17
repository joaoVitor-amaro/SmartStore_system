import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const QRCode = () => (
  <svg viewBox="0 0 100 100" width="150" height="150" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="30" height="30" fill="none" stroke="#111" strokeWidth="3"/>
    <rect x="12" y="12" width="16" height="16" fill="#111"/>
    <rect x="65" y="5" width="30" height="30" fill="none" stroke="#111" strokeWidth="3"/>
    <rect x="72" y="12" width="16" height="16" fill="#111"/>
    <rect x="5" y="65" width="30" height="30" fill="none" stroke="#111" strokeWidth="3"/>
    <rect x="12" y="72" width="16" height="16" fill="#111"/>
    {[
      [42,5],[49,5],[56,5],[42,12],[56,12],[42,19],[49,19],[42,26],[56,26],
      [5,42],[12,42],[26,42],[42,42],[56,42],[63,42],[70,42],[84,42],[91,42],
      [5,49],[26,49],[49,49],[70,49],[91,49],
      [5,56],[19,56],[26,56],[42,56],[56,56],[70,56],[84,56],
      [42,63],[63,63],[84,63],[91,63],
      [42,70],[49,70],[63,70],[70,70],[91,70],
      [42,77],[56,77],[63,77],[77,77],[84,77],
      [42,84],[49,84],[63,84],[77,84],
      [42,91],[56,91],[70,91],[77,91],[91,91],
    ].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="6" height="6" fill="#111"/>
    ))}
    <line x1="5" y1="50" x2="95" y2="50" stroke="#0d6efd" strokeWidth="2" opacity="0.8" strokeDasharray="4 2"/>
  </svg>
);

const fmt = (n) =>
  Number(n ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ConfirmarPagamento() {
  const { state }  = useLocation();
  const navigate   = useNavigate();

  const subtotal       = state?.subtotal       ?? 0;
  const frete          = state?.frete          ?? 0;
  const desconto       = state?.desconto       ?? 0;
  const resumoDesconto = state?.resumoDesconto ?? "";
  const items          = state?.items          ?? [];

  const subtotalComDesconto = subtotal - desconto;
  const total               = subtotalComDesconto + frete;

  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [cardType, setCardType]           = useState("credito");
  const [loading, setLoading]             = useState(false);
  const [erro, setErro]                   = useState(null);
  const [aprovado, setAprovado]           = useState(false); 

  async function handleFinalizar() {
    setErro(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await fetch(`${API_URL}/compra/finalizar`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          metodoPagamento: paymentMethod === "pix" ? "PIX" : cardType === "credito" ? "CARTAO_CREDITO" : "CARTAO_DEBITO",
          valorTotal: total,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || !data.success) {
        throw new Error(data?.message ?? `Erro ao finalizar compra (HTTP ${res.status})`);
      }

      setAprovado(true);
      setTimeout(() => {
        navigate("/");
      }, 2500);

    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
      />
      <style>{`
        .payment-option {
          border: 2px solid #dee2e6;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: border-color 0.2s, background-color 0.2s;
          background: white;
        }
        .payment-option.selected {
          border-color: #0d6efd;
          background-color: #f0f6ff;
        }
        .payment-option:hover:not(.selected) { border-color: #adb5bd; }
        .product-thumb {
          width: 52px; height: 52px;
          border-radius: 6px; object-fit: cover; flex-shrink: 0;
          background: #f1f5f9;
        }
        .summary-card { position: sticky; top: 24px; }
        .price-original { font-size: 11px; color: #adb5bd; text-decoration: line-through; }
        .price-final { font-size: 13px; font-weight: 600; }
        .price-discount { font-size: 11px; color: #198754; }
      `}</style>

      <div className="container py-4" style={{ maxWidth: 1100 }}>
        <div className="row g-4 align-items-start">

          {/* ── Método de pagamento ── */}
          <div className="col-12 col-lg-8">
            <h5 className="fw-bold mb-3">Método de pagamento</h5>
            <div className="row g-3">

              {/* PIX */}
              <div className="col-12 col-md-6">
                <div
                  className={`payment-option p-3 h-100 ${paymentMethod === "pix" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 fw-semibold">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L6.5 7.5L2 12L6.5 16.5L12 22L17.5 16.5L22 12L17.5 7.5L12 2Z" stroke="#0d6efd" strokeWidth="2"/>
                        <path d="M12 7L9 10L7 12L9 14L12 17L15 14L17 12L15 10L12 7Z" fill="#0d6efd"/>
                      </svg>
                      PIX
                    </div>
                    {paymentMethod === "pix"
                      ? <span className="badge bg-primary">✓ Selecionado</span>
                      : <span className="text-muted" style={{ fontSize: 12 }}>Selecionar</span>}
                  </div>

                  {paymentMethod === "pix" ? (
                    <div className="text-center mt-3">
                      <p className="text-muted small mb-2">Pagamento instantâneo</p>
                      <div className="d-inline-block bg-white rounded shadow-sm p-2 mb-2">
                        <QRCode />
                      </div>
                      <br />
                      <button className="btn btn-outline-primary btn-sm mt-1">
                        Gerar novo QR Code
                      </button>
                    </div>
                  ) : (
                    <p className="text-muted small mb-0 mt-2">Pagamento instantâneo via QR Code</p>
                  )}
                </div>
              </div>

              {/* Cartão */}
              <div className="col-12 col-md-6">
                <div
                  className={`payment-option p-3 h-100 ${paymentMethod === "card" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 fw-semibold">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="5" width="20" height="14" rx="2" stroke="#6c757d" strokeWidth="1.5"/>
                        <path d="M2 10H22" stroke="#6c757d" strokeWidth="1.5"/>
                        <rect x="5" y="13" width="5" height="2" rx="1" fill="#6c757d"/>
                      </svg>
                      Cartão de crédito
                    </div>
                    {paymentMethod === "card"
                      ? <span className="badge bg-primary">✓ Selecionado</span>
                      : <span className="text-muted" style={{ fontSize: 12 }}>Selecionar</span>}
                  </div>

                  {paymentMethod === "card" ? (
                    <div onClick={e => e.stopPropagation()} className="mt-3 d-flex flex-column gap-2">
                      <select
                        className="form-select form-select-sm"
                        value={cardType}
                        onChange={e => setCardType(e.target.value)}
                      >
                        <option value="credito">Cartão de crédito</option>
                        <option value="debito">Cartão de débito</option>
                      </select>
                      <input className="form-control form-control-sm" placeholder="Nome no cartão" />
                      <input className="form-control form-control-sm" placeholder="Número do cartão" />
                      <div className="row g-2">
                        <div className="col-6">
                          <input className="form-control form-control-sm" placeholder="Validade" />
                        </div>
                        <div className="col-6">
                          <input className="form-control form-control-sm" placeholder="CVV" />
                        </div>
                      </div>
                      <select className="form-select form-select-sm">
                        <option>1x sem juros</option>
                        <option>2x sem juros</option>
                        <option>3x sem juros</option>
                        <option>6x sem juros</option>
                        <option>12x sem juros</option>
                      </select>
                    </div>
                  ) : (
                    <p className="text-muted small mb-0 mt-2">Crédito ou débito</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ── Resumo do pedido ── */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm summary-card">
              <div className="card-body">
                <h6 className="fw-bold mb-3">
                  Resumo do pedido
                  {items.length > 0 && (
                    <span className="text-muted fw-normal ms-2" style={{ fontSize: 13 }}>
                      ({items.reduce((s, i) => s + i.qty, 0)} itens)
                    </span>
                  )}
                </h6>

                <div style={{ maxHeight: 280, overflowY: "auto" }}>
                  {items.length === 0 ? (
                    <p className="text-muted small">Nenhum produto.</p>
                  ) : items.map((item, idx) => (
                    <div key={item.id}>
                      <div className="d-flex gap-2 align-items-center py-2">
                        {item.img ? (
                          <img
                            src={item.img}
                            alt={item.name}
                            className="product-thumb"
                            onError={e => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className="product-thumb d-flex align-items-center justify-content-center text-muted" style={{ fontSize: 18 }}>
                            📦
                          </div>
                        )}
                        <div className="flex-grow-1">
                          <div className="fw-semibold lh-sm" style={{ fontSize: 13 }}>{item.name}</div>
                          <div className="text-muted" style={{ fontSize: 12 }}>Qtd: {item.qty}</div>
                        </div>
                        <div className="text-end">
                          {(item.valorDesconto ?? 0) > 0 && (
                            <div className="price-original">{fmt(item.subtotalOriginal)}</div>
                          )}
                          <div className="price-final">{fmt(item.subtotalFinal ?? item.price * item.qty)}</div>
                          {(item.valorDesconto ?? 0) > 0 && (
                            <div className="price-discount">
                              - {fmt(item.valorDesconto)} ({item.percentualDesconto}%)
                            </div>
                          )}
                        </div>
                      </div>
                      {idx < items.length - 1 && <hr className="my-1" />}
                    </div>
                  ))}
                </div>

                <hr />

                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>

                {desconto > 0 && (
                  <>
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="text-muted">Desconto</span>
                      <span className="text-success fw-semibold">- {fmt(desconto)}</span>
                    </div>
                    {resumoDesconto && (
                      <div className="small text-success mb-1">{resumoDesconto}</div>
                    )}
                    <div className="d-flex justify-content-between text-muted small mb-1">
                      <span>Subtotal com desconto</span>
                      <span>{fmt(subtotalComDesconto)}</span>
                    </div>
                  </>
                )}

                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Frete</span>
                  <span>{fmt(frete)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-6 mb-3">
                  <span>Total</span>
                  <span className="text-primary">{fmt(total)}</span>
                </div>

                {/* Erro */}
                {erro && (
                  <div className="alert alert-danger py-2 small mb-2">
                    {erro}
                  </div>
                )}
                {aprovado && (
                  <div className="alert alert-success text-center py-3 mb-2">
                    <div style={{ fontSize: 32 }}>✅</div>
                    <div className="fw-bold fs-6 mt-1">Pagamento aprovado!</div>
                    <div className="small text-muted mt-1">Redirecionando...</div>
                  </div>
                )}

                {/* Erro */}
                {erro && !aprovado && (
                  <div className="alert alert-danger py-2 small mb-2">
                    {erro}
                  </div>
                )}


                {/* Botão finalizar */}
                <button
                  className="btn btn-primary w-100 fw-semibold"
                  onClick={handleFinalizar}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Processando...
                    </>
                  ) : (
                    "Finalizar compra"
                  )}
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
