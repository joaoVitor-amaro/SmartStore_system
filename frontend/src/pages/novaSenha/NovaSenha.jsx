import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:8080";

export default function NovaSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [erroNova, setErroNova] = useState("");
  const [erroConfirmar, setErroConfirmar] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setErroNova("");
    setErroConfirmar("");
    setSucesso("");

    let temErro = false;

    if (!novaSenha.trim()) {
      setErroNova("Informe a nova senha");
      temErro = true;
    }

    if (!confirmarSenha.trim()) {
      setErroConfirmar("Confirme a nova senha");
      temErro = true;
    } else if (novaSenha !== confirmarSenha) {
      setErroConfirmar("As senhas não coincidem");
      temErro = true;
    }

    if (temErro) return;

    setCarregando(true);
    try {
      const response = await fetch(`${API_URL}/auth/nova-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, senha: novaSenha }),
      });

      if (!response.ok) {
        setErroNova("Link inválido ou expirado. Solicite um novo.");
        return;
      }

      setSucesso("Senha alterada com sucesso!");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      console.log("error: " + err);
      setErroNova("Erro ao conectar com o servidor");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", background: "#f0f2f5" }}
    >
      <div className="card border-0 shadow-sm p-4" style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}>
        <h1 className="text-center fw-500 mb-1" style={{ fontSize: "1.5rem" }}>
          Nova senha
        </h1>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.875rem" }}>
          Digite e confirme sua nova senha abaixo
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="novaSenha" className="form-label fw-medium">
              Nova senha
            </label>
            <div className={`input-group ${erroNova ? "is-invalid" : ""}`}>
              <input
                id="novaSenha"
                type={mostrarNova ? "text" : "password"}
                className={`form-control ${erroNova ? "is-invalid" : ""}`}
                placeholder="Digite sua nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setMostrarNova(!mostrarNova)}
              >
                {mostrarNova ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {erroNova && <div className="invalid-feedback d-block">{erroNova}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmarSenha" className="form-label fw-medium">
              Confirmar nova senha
            </label>
            <div className="input-group">
              <input
                id="confirmarSenha"
                type={mostrarConfirmar ? "text" : "password"}
                className={`form-control ${erroConfirmar ? "is-invalid" : ""}`}
                placeholder="Confirme sua nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
              >
                {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
              </button>
              {erroConfirmar && (
                <div className="invalid-feedback">{erroConfirmar}</div>
              )}
            </div>
          </div>

          {sucesso && (
            <div className="alert alert-success py-2 text-center" style={{ fontSize: "0.875rem" }}>
              {sucesso}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={carregando}
          >
            {carregando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Salvando...
              </>
            ) : (
              "Salvar nova senha"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}