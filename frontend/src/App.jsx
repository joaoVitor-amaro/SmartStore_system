import "./App.css";
import TelaLogin from "./pages/tela_login/TelaLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./pages/CadastroUsuario";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import CategoriaPage from "./pages/home/CategoriaPage";
import { useCategorias } from "./hooks/useCategorias";
import MyProducts from "./pages/myProducts/MyProducts";
import CadastrarProduto from "./pages/cadastrarProduto/CadastrarProduto";
import DetalheProduto from "./pages/detalheProdutos/DetalheProduto";
import Carrinho from "./pages/carrinho/Carrinho";
import ConfirmOrder from "./pages/checkout/ConfirmOrder";
import "bootstrap-icons/font/bootstrap-icons.css";
import ConfirmarPagamento from "./pages/confirmarPagamento/ConfirmarPagamento";
import MinhasCompras from "./pages/minhasCompras/MinhasCompras";

function App() {
  const { categorias } = useCategorias();

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header categorias={categorias} />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos/:id" element={<DetalheProduto />} />
            <Route path="/categoria/:nomeCategoria" element={<CategoriaPage />} />
            <Route path="/login" element={<TelaLogin />} />
            <Route path="/usuario/cadastro" element={<CadastroUsuario />} />
            <Route path="/meusProdutos" element={<MyProducts />} />
            <Route path="/cadastrarProduto" element={<CadastrarProduto categorias={categorias} />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/confirmarPedido" element={<ConfirmOrder />} />
            <Route path="/pagamento" element={<ConfirmarPagamento />} />
            <Route path="/minhas-compras" element={<MinhasCompras />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;