import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./TelaLogin.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function TelaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
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
        headers: {"Content-Type": "application/json"},
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
    } catch (err){
      setErroEmail("Erro ao conectar com o servidor");
    }
  }

  return (
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

            <Link to="/recuperar-senha" className="forgot-password">
              Esqueceu a senha?
            </Link>
          </form>
        </section>
      </main>

    </div>
  );
}