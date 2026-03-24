import "./Home.css";
import ProductCard from "../../components/ProductCard";

export default function Home() {
  const produtos = [
    {
      id: 1,
      nome: "Smartphone Galaxy A33",
      preco: "1.999",
      categoria: "Eletrônicos",
      imagem: "https://via.placeholder.com/200x150",
    },
    {
      id: 2,
      nome: "Smartphone Galaxy A53",
      preco: "2.299",
      categoria: "Eletrônicos",
      imagem: "https://via.placeholder.com/200x150",
    },
    {
      id: 3,
      nome: "Smartphone Galaxy A73",
      preco: "2.999",
      categoria: "Eletrônicos",
      imagem: "https://via.placeholder.com/200x150",
    },
  ];

  return (
    <div className="home-container">
      <h2>Produtos em destaque</h2>

      <div className="product-grid">
        {produtos.map((p) => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>
    </div>
  );
}