import { Link } from "react-router-dom";

export default function Header({ categorias = [] }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div className="container-fluid px-4">

        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          SmartStore
        </Link>

        {/* Busca com Categorias integrado */}
        <div className="flex-grow-1 d-flex justify-content-center">
            <form className="d-flex" style={{ width: "700px" }} onSubmit={(e) => e.preventDefault()}>
                <select className="form-select w-auto border-end-0 rounded-end-0">
                <option>Categorias</option>
                {categorias.map((cat) => (
                    <option key={cat.id}>{cat.nome}</option>
                ))}
                </select>
                <input
                className="form-control rounded-start-0"
                type="text"
                placeholder="Buscar produtos..."
                />
            </form>
        </div>

        {/* Login e Cadastrar */}
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-primary">Login</Link>
          <Link to="/cadastro" className="btn btn-primary">Cadastrar</Link>
        </div>

      </div>
    </nav>
  );
}