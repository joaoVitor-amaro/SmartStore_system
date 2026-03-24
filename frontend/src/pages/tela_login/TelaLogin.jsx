import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./TelaLogin.css";

export default function TelaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div
      className="login-page d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", background: "#f0f2f5" }}
    >
      <main className="main-content">
        <section className="login-card">
          <h1>Fazer login</h1>

          <form className="login-form">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                autoComplete="email"
              />
              <span className="input-icon">
                <FaEnvelope />
              </span>
            </div>

            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="current-password"
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

            <Link to="/recuperar-senha" className="forgot-password">
              Esqueceu a senha?
            </Link>
          </form>
        </section>
      </main>

    </div>
  );
}