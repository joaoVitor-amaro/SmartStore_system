import "./App.css";
import TelaLogin from "./pages/tela_login/TelaLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./pages/CadastroUsuario";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import { useCategorias } from "./hooks/useCategorias";

function App() {
  const {categorias} = useCategorias()
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header categorias={categorias} />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<TelaLogin />} />
            <Route path="/usuario/cadastro" element={<CadastroUsuario />} />
            <Route path="/cadastro" element={<div>Cadastro</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;