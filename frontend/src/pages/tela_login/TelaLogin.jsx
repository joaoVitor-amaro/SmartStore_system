import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "./TelaLogin.css";

export default function TelaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="login-page">
      <main className="main-content">
        <section className="login-card">
          <h1>Fazer Login</h1>

          <form className="login-form">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input id="email" type="email" placeholder="Email" />
              <span className="input-icon">
                <FaEnvelope />
              </span>
            </div>

            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
              />
              <button
                type="button"
                className="icon-button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="login-button">
              Entrar
            </button>

            <a
              href="/"
              className="forgot-password"
              onClick={(e) => e.preventDefault()}
            >
              Esqueceu a senha?
            </a>
          </form>
        </section>
      </main>

      <footer className="footer">
        <a href="/">Ajuda</a>
        <a href="/">Política de Privacidade</a>
        <a href="/">Fluxos de links e icternas</a>
      </footer>
    </div>
  );
}