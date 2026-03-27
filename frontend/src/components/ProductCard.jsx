export default function ProductCard({ produto }) {
  return (
    <div className="product-card">
      <img src={produto.imagem} alt={produto.nome} />

      <h5>{produto.nome}</h5>

      <p className="preco">R$ {produto.preco}</p>
      <span className="categoria">{produto.categoria}</span>

      <button className="btn-detalhes">Ver Detalhes</button>
    </div>
  );
}
