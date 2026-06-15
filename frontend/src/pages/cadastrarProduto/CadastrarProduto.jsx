import { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const initialForm = {
  nome: "",
  descricao: "",
  categoria: "",
  marca: "",
  fabricado: "",
  preco: "",
  quantidade: "",
  imagem: null,
  imagemPreview: null,
};

const API_URL = "http://localhost:8080";

export default function CadastrarProduto({categorias = []}) {
  const [form, setForm] = useState(initialForm);
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const inputImagemRef = useRef(null);

  const buscarMarcas = async (categoriaId) => {
    if (!categoriaId) {
      setMarcas([]);
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/marcas/categoria/${categoriaId}`
      );
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      console.error("Erro ao buscar marcas", error);

    }

  };


  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (erros[id]) setErros((prev) => ({ ...prev, [id]: null }));
  };

  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((prev) => ({ ...prev, imagem: file, imagemPreview: ev.target.result }));
    reader.readAsDataURL(file);
    if (erros.imagem) setErros((prev) => ({ ...prev, imagem: null }));
  };

  const validar = () => {
    const novosErros = {};
    if (!form.nome.trim())       novosErros.nome      = "Informe o nome do produto.";
    if (!form.descricao.trim())  novosErros.descricao = "Informe a descrição.";
    if (!form.categoria)         novosErros.categoria = "Selecione uma categoria.";
    if (!form.marca)             novosErros.marca     = "Selecione uma marca.";
    if (!form.fabricado.trim())  novosErros.fabricado = "Informe o local de fabricação.";
    if (!form.preco)             novosErros.preco     = "Informe o preço.";
    if (!form.quantidade)        novosErros.quantidade = "Informe a quantidade.";
    if (!form.imagem)            novosErros.imagem    = "Adicione uma imagem.";
    return novosErros;
  };

  const handleSubmit = async () => {
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", form.nome);
      formData.append("descricao", form.descricao);
      formData.append("preco", parseFloat(form.preco));
      formData.append("estoque", parseInt(form.quantidade));
      formData.append("fabricadoEm", form.fabricado);
      formData.append("imagem", form.imagem);
      formData.append("marcaId", parseInt(form.marca));
      formData.append("categoriaId", parseInt(form.categoria));

      const token = localStorage.getItem("token"); 

      const res = await fetch(`${API_URL}/produtos/cadastro`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}` // adiciona o token
        }
      });

      if (!res.ok) throw new Error("Falha ao cadastrar produto");

      const data = await res.json();
      console.log("Resposta da API:", data);

      setSucesso(true);
      setForm(initialForm);
      setErros({});
      setTimeout(() => setSucesso(false), 3500);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>

      {sucesso && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-success d-flex align-items-center gap-2 shadow"
          style={{ zIndex: 9999, minWidth: 280 }}
        >
          <i className="bi bi-check-circle-fill" />
          Produto cadastrado com sucesso!
          <button className="btn-close ms-auto" onClick={() => setSucesso(false)} />
        </div>
      )}

      <main className="container py-4" style={{ maxWidth: 900 }}>
        <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h5 className="fw-bold mb-4">Cadastrar Novo Produto</h5>

          {/* Linha 1: Nome | DescriÃ§Ã£o | Imagem */}
          <div className="row g-3">

            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small" htmlFor="nome">Nome do Produto <span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control ${erros.nome ? "is-invalid" : ""}`}
                id="nome"
                placeholder="Ex: Camiseta Azul"
                value={form.nome}
                onChange={handleChange}
              />
              {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold small" htmlFor="descricao">DescriÃ§Ã£o <span className="text-danger">*</span></label>
              <textarea
                className={`form-control ${erros.descricao ? "is-invalid" : ""}`}
                id="descricao"
                rows={4}
                placeholder="Descreva o produto..."
                value={form.descricao}
                onChange={handleChange}
              />
              {erros.descricao && <div className="invalid-feedback">{erros.descricao}</div>}
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small">Imagem do Produto <span className="text-danger">*</span></label>
              <div
                onClick={() => inputImagemRef.current.click()}
                style={{
                  border: `2px dashed ${erros.imagem ? "#dc3545" : form.imagemPreview ? "#1a73e8" : "#c8d3e0"}`,
                  borderRadius: 10,
                  backgroundColor: form.imagemPreview ? "transparent" : erros.imagem ? "#fff5f5" : "#f8f9fb",
                  height: 105,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "border-color 0.2s, background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!form.imagemPreview) {
                    e.currentTarget.style.borderColor = "#1a73e8";
                    e.currentTarget.style.backgroundColor = "#eef3fc";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!form.imagemPreview) {
                    e.currentTarget.style.borderColor = erros.imagem ? "#dc3545" : "#c8d3e0";
                    e.currentTarget.style.backgroundColor = erros.imagem ? "#fff5f5" : "#f8f9fb";
                  }
                }}
              >
                {form.imagemPreview ? (
                  <img src={form.imagemPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <i className="bi bi-image" style={{ fontSize: "1.8rem", color: erros.imagem ? "#dc3545" : "#aaa" }} />
                    <span style={{ fontSize: "0.82rem", color: erros.imagem ? "#dc3545" : "#aaa" }}>Adicionar imagem</span>
                  </>
                )}
              </div>
              {erros.imagem && <div className="text-danger mt-1" style={{ fontSize: "0.875em" }}>{erros.imagem}</div>}
              <input
                type="file"
                accept="image/*"
                className="d-none"
                ref={inputImagemRef}
                onChange={handleImagem}
              />
            </div>
          </div>

          <div className="row g-3 mt-1">

            <div className="col-12 col-sm-6 col-md">
              <label className="form-label fw-semibold small" htmlFor="categoria">Categoria <span className="text-danger">*</span></label>
              <select
                  className={`form-select ${erros.categoria ? "is-invalid" : ""}`}
                  id="categoria"
                  value={form.categoria}
                  onChange={(e) => {
                    handleChange(e);
                    buscarMarcas(e.target.value);
                    setForm(prev => ({
                      ...prev,
                      marca: ""
                    }));

                  }}
              >
                  <option value="">Selecionar Categoria</option>
                  {categorias.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.nome}
                    </option>
                  ))}

                </select>
              {erros.categoria && <div className="invalid-feedback">{erros.categoria}</div>}
            </div>

            <div className="col-12 col-sm-6 col-md">
              <label className="form-label fw-semibold small" htmlFor="marca">Marca <span className="text-danger">*</span></label>
              <select
                className={`form-select ${erros.marca ? "is-invalid" : ""}`}
                id="marca"
                value={form.marca}
                onChange={handleChange}
              >
                <option value="">Selecionar Marca</option>
                {marcas.map((marca) => (
                  <option
                    key={marca.id}
                    value={marca.id}
                  >
                    {marca.nome}
                  </option>

                ))}
              </select>
              {erros.marca && <div className="invalid-feedback">{erros.marca}</div>}
            </div>

            <div className="col-12 col-sm-6 col-md">
              <label className="form-label fw-semibold small" htmlFor="fabricado">Fabricado em <span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control ${erros.fabricado ? "is-invalid" : ""}`}
                id="fabricado"
                placeholder="Ex: Brasil, China..."
                value={form.fabricado}
                onChange={handleChange}
              />
              {erros.fabricado && <div className="invalid-feedback">{erros.fabricado}</div>}
            </div>

            <div className="col-6 col-md">
              <label className="form-label fw-semibold small" htmlFor="preco">PreÃ§o <span className="text-danger">*</span></label>
              <div className="input-group">
                <span className="input-group-text">R$</span>
                <input
                  type="number"
                  className={`form-control ${erros.preco ? "is-invalid" : ""}`}
                  id="preco"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                  value={form.preco}
                  onChange={handleChange}
                />
                {erros.preco && <div className="invalid-feedback">{erros.preco}</div>}
              </div>
            </div>

            <div className="col-6 col-md">
              <label className="form-label fw-semibold small" htmlFor="quantidade">Estoque <span className="text-danger">*</span></label>
              <input
                type="number"
                className={`form-control ${erros.quantidade ? "is-invalid" : ""}`}
                id="quantidade"
                placeholder="1"
                min="1"
                value={form.quantidade}
                onChange={handleChange}
              />
              {erros.quantidade && <div className="invalid-feedback">{erros.quantidade}</div>}
            </div>

          </div>

          {/* BotÃ£o */}
          <div className="mt-4">
            <button
              className="btn btn-primary w-100 fw-semibold"
              style={{ borderRadius: 8, padding: "0.65rem", fontSize: "0.97rem" }}
              onClick={handleSubmit}
            >
              Cadastrar Produto
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}