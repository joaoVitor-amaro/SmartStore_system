import Header from "../components/Header"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CadastroUsuario() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        torceFlamengo: false,
        assisteOnePiece: false,
        eDeSousa: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }
    };

    return (
      <>
        <Header />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", background: "#f0f2f5" }}>
            <div className="bg-white rounded shadow p-4" style={{ width: "100%", maxWidth: "600px" }}>
                <h4 className="mb-4 fw-bold">Cadastrar Nova Conta</h4>

                <form onSubmit={handleSubmit}>
                    {/* Nome Completo */}
                    <div className="mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="mb-4">
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="torceFlamengo"
                                id="torceFlamengo"
                                checked={form.torceFlamengo}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="torceFlamengo">
                                Torço para o Flamengo 🔴⚫
                            </label>
                        </div>

                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="assisteOnePiece"
                                id="assisteOnePiece"
                                checked={form.assisteOnePiece}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="assisteOnePiece">
                                Assisto One Piece 🏴‍☠️
                            </label>
                        </div>

                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="eDeSousa"
                                id="eDeSousa"
                                checked={form.eDeSousa}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="eDeSousa">
                                Sou de Sousa - PB 📍
                            </label>
                        </div>
                    </div>

                    {/* Senha e Confirmar Senha */}
                    <div className="row mb-4">
                        <div className="col-12 col-md-6 mb-3 mb-md-0">
                            <label className="form-label">Senha</label>
                            <div className="input-group">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    className="form-control"
                                    name="senha"
                                    value={form.senha}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                >
                                    <i className={`bi ${mostrarSenha ? "bi-eye" : "bi-eye-slash"}`} />
                                </button>
                            </div>  
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">Confirmar Senha</label>
                            <div className="input-group">
                            <input
                                type={mostrarConfirmar ? "text" : "password"}
                                className="form-control"
                                name="confirmarSenha"
                                value={form.confirmarSenha}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                            >
                                <i className={`bi ${mostrarConfirmar ? "bi-eye" : "bi-eye-slash"}`} />
                            </button>
                            </div>
                        </div>
                    </div>
                    {/* Botão */}
                    <button type="submit" className="btn btn-primary w-100 py-2">
                    Cadastrar
                    </button>
                </form>

                <p className="text-center mt-3 text-muted small">
                    Já tem uma conta? <Link to="/login">Fazer login</Link>
                </p>
            </div>
        </div>
      </>
    );
}