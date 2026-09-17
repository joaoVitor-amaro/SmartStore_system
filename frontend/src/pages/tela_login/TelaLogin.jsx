import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./TelaLogin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function TelaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  // Estados do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [erroEmailRecuperacao, setErroEmailRecuperacao] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErroEmail("");
    setErroSenha("");
    let temErro = false;

    if (!email.trim()) {
      setErroEmail("Informe o email");
      temErro = true;
    }
    if (!senha.trim()) {
      setErroSenha("Informe a senha");
      temErro = true;
    }
    if (temErro) return;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        setErroSenha("Email ou senha inválidos");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      navigate("/");
    } catch (err) {
      setErroEmail("Erro ao conectar com o servidor");
    }
  }

  function abrirModal(e) {
    e.preventDefault();
    setEmailRecuperacao("");
    setErroEmailRecuperacao("");
    setMensagemSucesso("");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEmailRecuperacao("");
    setErroEmailRecuperacao("");
    setMensagemSucesso("");
  }

  async function handleRecuperarSenha(e) {
    e.preventDefault();
    setErroEmailRecuperacao("");
    setMensagemSucesso("");

    if (!emailRecuperacao.trim()) {
      setErroEmailRecuperacao("Informe o email");
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch(`${API_URL}/auth/recuperar-senha`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: emailRecuperacao})
      });
      if(!response.ok) {
        setErroEmailRecuperacao("Email não encontrado. Verifique e tente novamente.");
        return;
      }
      setMensagemSucesso("Link enviado! Verifique sua caixa de entrada.");
    } catch (err) {
      console.error("Erro recuperar senha:", err);
      setErroEmailRecuperacao("Erro ao conectar com o servidor");
    } finally {
      setCarregando(false); 
    }
  }

  return (
    <>
      <div
        className="login-page d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh", background: "#f0f2f5" }}
      >
        <main className="main-content">
          <section className="login-card">
            <h1>Fazer login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="input-icon">
                  <FaEnvelope />
                </span>
              </div>
              {erroEmail && <p className="erro-texto">{erroEmail}</p>}

              <label htmlFor="senha">Senha</label>
              <div className="input-wrapper">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {erroSenha && <p className="erro-texto">{erroSenha}</p>}

              <button type="submit" className="login-button">
                Entrar
              </button>

              <button
                type="button"
                className="forgot-password"
                onClick={abrirModal}
              >
                Esqueceu a senha?
              </button>
            </form>
          </section>
        </main>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-fechar" onClick={fecharModal}>
              <FaTimes />
            </button>
            <h2>Recuperar senha</h2>
            <p>Digite seu email e enviaremos um link para redefinir sua senha.</p>

            <form onSubmit={handleRecuperarSenha}>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={emailRecuperacao}
                  onChange={(e) => setEmailRecuperacao(e.target.value)}
                />
                <span className="input-icon">
                  <FaEnvelope />
                </span>
              </div>
              {erroEmailRecuperacao && (
                <p className="erro-texto">{erroEmailRecuperacao}</p>
              )}
              {mensagemSucesso && (
                <p className="sucesso-texto">{mensagemSucesso}</p>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={carregando}
              >
                {carregando ? "Enviando..." : "Enviar link"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}