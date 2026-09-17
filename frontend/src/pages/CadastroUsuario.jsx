import Header from "../components/Header"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function CadastroUsuario() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [loading, setLoading] = useState(false);   
    const [error, setError] = useState(null);         
    const [sucesso, setSucesso] = useState(null); 
    const navigate = useNavigate();
    const ESTADOS = [
        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
        "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
        "RS","RO","RR","SC","SP","SE","TO"
    ];
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        torceFlamengo: false,
        assisteOnePiece: false,
        DeSousa: false,
        
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.senha !== form.confirmarSenha) {
            setError("As senhas não coincidem!"); 
            setTimeout(() => setError(null), 3000);
            return;
        }
        const {confirmarSenha, ...dadosParaEnviar} = form;
        const payload = {
            nome: dadosParaEnviar.nome,
            email: dadosParaEnviar.email,
            torceFlamengo: form.torceFlamengo  ? "S" : "N",
            assisteOnePiece: form.assisteOnePiece ? "S" : "N",
            deSousa: form.DeSousa        ? "S" : "N",
            senha: dadosParaEnviar.senha,
            cep: dadosParaEnviar.cep,
            rua: dadosParaEnviar.rua,
            numero: dadosParaEnviar.numero,
            bairro: dadosParaEnviar.bairro,
            cidade: dadosParaEnviar.cidade,
            estado: dadosParaEnviar.estado,
        };
        setLoading(true);
        setError(null);
        const URL_API = `${API_URL}/cliente/cadastro`;
        try {
            const response = await fetch(URL_API, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload

                ),
            });
            const data = await response.json();

            if(!data.success) {
                const mensagens = data.erros?.join("\n") ?? data.message ?? "Erro ao cadastrar";
                throw new Error(mensagens);
            }
            setSucesso("Usuário cadastrado com sucesso!");
            setTimeout(() => {
                setSucesso(null);
                navigate("/login");
            }, 3000);
        } catch(err) {
             setError(err.message);
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(false)
        }
    };

    return (
      <>
        {sucesso && (
            <div style={{
                position: "fixed",
                top: "70px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#22c55e",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 9999,
                fontWeight: "500",
                fontSize: "15px",
            }}>
                ✅ {sucesso}
            </div>
        )}

        {error && (
            <div style={{
                position: "fixed",
                top: "70px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#ef4444",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 9999,
                fontWeight: "500",
                fontSize: "15px",
            }}>
                ❌ {error}
            </div>
        )}
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
                        <h6 className="fw-semibold mb-3 text-secondary">Endereço</h6>

                        <div className="row mb-3">
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <label className="form-label">CEP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cep"
                                    value={form.cep}
                                    onChange={handleChange}
                                    placeholder="00000-000"
                                    maxLength={9}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3 mb-md-0">
                                <label className="form-label">Rua</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rua"
                                    value={form.rua}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-2">
                                <label className="form-label">Número</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="numero"
                                    value={form.numero}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <label className="form-label">Bairro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bairro"
                                    value={form.bairro}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <label className="form-label">Cidade</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cidade"
                                    value={form.cidade}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-3">
                                <label className="form-label">Estado</label>
                                <select
                                    className="form-select"
                                    name="estado"
                                    value={form.estado}
                                    onChange={handleChange}
                                >
                                    <option value="">UF</option>
                                    {ESTADOS.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
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
                                name="DeSousa"
                                id="DeSousa"
                                checked={form.DeSousa}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="DeSousa">
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