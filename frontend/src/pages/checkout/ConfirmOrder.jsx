import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ConfirmOrder.css";

const deliveryOptions = [
  { id: "standard", label: "Entrega Padrão",   price: 15, days: "5 dias úteis" },
  { id: "express",  label: "Entrega Expressa", price: 35, days: "2 dias úteis" },
];

const brazilStates = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const BASE_URL = "http://localhost:8080";

export default function ConfirmOrder() {
  const [delivery,   setDelivery]   = useState("standard");
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading,    setLoading]    = useState(true);
  const [erro,       setErro]       = useState(null);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    nome: "", email: "",
    cep: "", rua: "", numero: "",
    complemento: "", bairro: "", cidade: "", estado: "SP",
  });

  useEffect(() => {
    async function fetchDados() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const [resCliente, resCarrinho] = await Promise.all([
          fetch(`${BASE_URL}/cliente/me`,  { headers }),
          fetch(`${BASE_URL}/carrinho/me`, { headers }),
        ]);

        const [jsonCliente, jsonCarrinho] = await Promise.all([
          resCliente.json(),
          resCarrinho.json(),
        ]);

        if (jsonCliente.success) {
            const d = jsonCliente.data;
            setForm((prev) => ({
                ...prev,
                nome:   d.nome   ?? "",
                email:  d.email  ?? "",
                cep:    d.cep    ?? "",
                rua:    d.rua    ?? "",
                numero: d.numero ?? "",
                bairro: d.bairro ?? "",
                cidade: d.cidade ?? "",
                estado: d.estado ?? "SP",
            }));
        }
        if (jsonCarrinho.success) {
          const itens = jsonCarrinho.data.itens.map((item) => ({
            id:    item.idProduto,
            name:  item.nomeProduto,
            qty:   item.quantidade,
            price: item.preco,
            img:   item.imagemUrl, 
          }));
          setProducts(itens);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErro("Não foi possível carregar seus dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchDados();
  }, []);

  async function handleContinuar() {
      try {
          const token = localStorage.getItem("token");
          const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          };

          const res = await fetch(`${BASE_URL}/cliente/atualizar`, {
              method: "PUT",
              headers,
              body: JSON.stringify({
                  nome:   form.nome,
                  email:  form.email,
                  cep:    form.cep,
                  rua:    form.rua,
                  numero: form.numero,
                  bairro: form.bairro,
                  cidade: form.cidade,
                  estado: form.estado,
              }),
          });

          const data = await res.json();
          if (!data.success) throw new Error(data.message ?? "Erro ao atualizar");

          // navegar para pagamento
          // navigate("/pagamento", { state: { total } });
          alert("Dados atualizados! Ir para pagamento...");

      } catch (err) {
          alert("Erro: " + err.message);
      }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const selectedDelivery = deliveryOptions.find((d) => d.id === delivery);
  const subtotal = products.reduce((s, p) => s + p.price * p.qty, 0);
  const frete    = selectedDelivery.price;
  const total    = subtotal + frete;

  function SummaryContent() {
    return (
      <>
        <h3 className="ss-summary-title mb-3">Resumo do Pedido</h3>

        {products.length === 0 ? (
          <p className="text-muted small">Nenhum produto no carrinho.</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="d-flex align-items-center gap-2 mb-3">
              {p.img ? (
                <img
                  src={p.img}
                  alt={p.name}
                  className="ss-thumb"
                  style={{ objectFit: "cover" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <div className="ss-thumb text-muted d-flex align-items-center justify-content-center" style={{ fontSize: 12 }}>
                  📦
                </div>
              )}
              <div className="flex-grow-1">
                <div className="ss-pname">{p.name}</div>
                <div className="ss-pqty">Qtd: {p.qty}</div>
              </div>
              <div className="ss-pprice">{fmt(p.price)}</div>
            </div>
          ))
        )}

        <hr className="my-2" />
        <div className="d-flex justify-content-between mb-1">
          <span className="ss-sum-lbl">Subtotal</span>
          <span className="ss-sum-val">{fmt(subtotal)}</span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span className="ss-sum-lbl">Frete ({selectedDelivery.label})</span>
          <span className="ss-sum-val">{fmt(frete)}</span>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between mb-3">
          <span className="ss-total-lbl">Total do pedido</span>
          <span className="ss-total-val">{fmt(total)}</span>
        </div>

        <button className="btn btn-primary ss-btn-primary w-100 mb-2" onClick={handleContinuar}>
          Continuar para Pagamento →
        </button>
        <Link to="/carrinho">
          <button className="btn ss-btn-secondary w-100">
            Voltar para o Carrinho
          </button>
        </Link>
      </>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p className="text-muted">Carregando seus dados...</p>
        </div>
      </div>
    );
  }


  if (erro) {
    return (
      <div className="container-lg py-5">
        <div className="alert alert-danger d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-triangle-fill fs-5" />
          <span>{erro}</span>
        </div>
        <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className={`ss-overlay${showDrawer ? " open" : ""}`}
        onClick={() => setShowDrawer(false)}
      />

      <div className="container-lg py-4 ss-main-content">
        <div className="row g-4">

          {/* Coluna esquerda: formulário */}
          <div className="col-12 col-lg-8">
            <h1 className="ss-page-title mb-1">Confirmar seus dados</h1>

            {/* Seção 1 – Dados Pessoais */}
            <div className="card ss-card p-4 mb-4">
              <h2 className="ss-section-title mb-4">Seção 1 – Dados Pessoais</h2>
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <label className="form-label">Nome completo</label>
                  <input className="form-control" name="nome" value={form.nome} onChange={handleChange} />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Email</label>
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Seção 2 – Endereço */}
            <div className="card ss-card p-4 mb-4">
              <h2 className="ss-section-title mb-4">Seção 2 – Endereço de Entrega</h2>
              <div className="row g-3">
                <div className="col-6 col-sm-4">
                  <label className="form-label">CEP</label>
                  <input className="form-control" name="cep" value={form.cep} onChange={handleChange} />
                </div>
                <div className="col-12 col-sm-5">
                  <label className="form-label">Rua</label>
                  <input className="form-control" name="rua" value={form.rua} onChange={handleChange} />
                </div>
                <div className="col-4 col-sm-3">
                  <label className="form-label">Número</label>
                  <input className="form-control" name="numero" value={form.numero} onChange={handleChange} />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-label">Bairro</label>
                  <input className="form-control" name="bairro" value={form.bairro} onChange={handleChange} />
                </div>
                <div className="col-8 col-sm-5">
                  <label className="form-label">Cidade</label>
                  <input className="form-control" name="cidade" value={form.cidade} onChange={handleChange} />
                </div>
                <div className="col-4 col-sm-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" name="estado" value={form.estado} onChange={handleChange}>
                    {brazilStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Seção 3 – Entrega */}
            <div className="card ss-card p-4 mb-4">
              <h2 className="ss-section-title mb-4">Seção 3 – Opções de Entrega</h2>
              <div className="row g-3">
                {deliveryOptions.map((opt) => (
                  <div className="col-12 col-sm-4" key={opt.id}>
                    <label className={`ss-delivery-card d-flex align-items-start w-100${delivery === opt.id ? " active" : ""}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value={opt.id}
                        checked={delivery === opt.id}
                        onChange={() => setDelivery(opt.id)}
                        className="me-2 mt-1"
                      />
                      <div>
                        <div className="ss-d-label">{opt.label}</div>
                        <div className="ss-d-price">{fmt(opt.price)}</div>
                        <div className="ss-d-days">Prazo estimado: {opt.days}</div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna direita: resumo (desktop) */}
          <div className="col-lg-4 ss-sidebar-col">
            <div className="card ss-summary-card p-4">
              <SummaryContent />
            </div>
          </div>

        </div>
      </div>

      {/* Barra sticky mobile */}
      <div className="ss-mob-bar" onClick={() => setShowDrawer(!showDrawer)}>
        <div>
          <div className="ss-mob-hint">Ver resumo do pedido</div>
          <div className="ss-mob-total">{fmt(total)}</div>
        </div>
        <div className="ss-mob-toggle">{showDrawer ? "▼ Fechar" : "▲ Ver"}</div>
      </div>

      {/* Drawer mobile */}
      <div className={`ss-drawer${showDrawer ? " open" : ""}`}>
        <div className="ss-drawer-handle" />
        <SummaryContent />
      </div>
    </>
  );
}