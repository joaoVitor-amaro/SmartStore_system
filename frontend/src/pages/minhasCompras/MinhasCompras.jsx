import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MinhasCompras.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const fmtMoeda = (valor) =>
  Number(valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const fmtData = (data) => {
  if (!data) return "-";
  return new Date(data).toLocaleString("pt-BR");
};

const fmtMetodo = (metodo) => {
  const mapa = {
    PIX: "Pix",
    CARTAO_CREDITO: "Cartão de crédito",
    CARTAO_DEBITO: "Cartão de débito",
  };

  return mapa[metodo] || metodo || "-";
};

export default function MinhasCompras() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    async function carregarCompras() {
      try {
        setLoading(true);
        setErro("");

        const res = await fetch(`${API_URL}/compra/minhas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Não foi possível carregar suas compras.");
        }

        setCompras(data.data || []);
      } catch (err) {
        setErro(err.message || "Erro ao carregar compras.");
      } finally {
        setLoading(false);
      }
    }

    carregarCompras();
  }, [navigate]);

  if (loading) {
    return <div className="container py-5 text-center">Carregando suas compras...</div>;
  }

  return (
    <div className="mc-page">
      <div className="container py-4 py-lg-5">
        <div className="mc-header d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">Minhas compras</h2>
            <p className="text-muted mb-0">
              Aqui ficam todas as compras feitas pela sua conta.
            </p>
          </div>

          <Link to="/" className="btn btn-outline-primary">
            Continuar comprando
          </Link>
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        {!erro && compras.length === 0 && (
          <div className="card border-0 shadow-sm mc-empty">
            <div className="card-body py-5 text-center">
              <div className="mc-empty-icon mb-3">???</div>
              <h5 className="fw-bold">Você ainda não tem compras registradas</h5>
              <p className="text-muted mb-4">
                Assim que finalizar um pedido, ele vai aparecer aqui.
              </p>
              <Link to="/" className="btn btn-primary">
                Ir para a loja
              </Link>
            </div>
          </div>
        )}

        <div className="d-flex flex-column gap-4">
          {compras.map((compra) => (
            <div key={compra.idCompra} className="card border-0 shadow-sm mc-card">
              <div className="card-body p-3 p-lg-4">
                <div className="mc-top d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
                  <div>
                    <div className="mc-badge mb-2">Pedido #{compra.idCompra}</div>
                    <div className="text-muted small">Feito em {fmtData(compra.data)}</div>
                  </div>

                  <div className="mc-summary text-lg-end">
                    <div className="fw-bold fs-5">{fmtMoeda(compra.valorTotal)}</div>
                    <div className="text-muted small">
                      {compra.quantidadeItens || 0} {compra.quantidadeItens === 1 ? "item" : "itens"}
                      {" · "}
                      {fmtMetodo(compra.metodoPagamento)}
                    </div>
                    <div className="mc-status mt-2">{compra.status || "APROVADO"}</div>
                  </div>
                </div>

                <div className="mc-items d-flex flex-column gap-3">
                  {(compra.itens || []).map((item) => (
                    <div key={`${compra.idCompra}-${item.idProduto}-${item.nomeProduto}`} className="mc-item d-flex gap-3 align-items-center">
                      {item.imagemUrl ? (
                        <img
                          src={item.imagemUrl}
                          alt={item.nomeProduto}
                          className="mc-item-img"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="mc-item-img mc-item-placeholder">??</div>
                      )}

                      <div className="flex-grow-1 min-w-0">
                        <div className="fw-semibold">{item.nomeProduto}</div>
                        <div className="text-muted small">
                          Quantidade: {item.quantidade || 0}
                        </div>
                        <div className="text-muted small">
                          Unitário: {fmtMoeda(item.precoUnitario)}
                        </div>
                      </div>

                      <div className="text-end">
                        <div className="fw-semibold">{fmtMoeda(item.subtotal)}</div>
                        {item.idProduto && (
                          <Link
                            to={`/produtos/${item.idProduto}`}
                            className="small text-decoration-none"
                          >
                            Ver produto
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}