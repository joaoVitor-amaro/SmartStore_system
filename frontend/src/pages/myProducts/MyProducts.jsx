import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";  
import 'bootstrap/dist/css/bootstrap.min.css';

const initialProducts = [
  { id: 1, name: "Smartphone Galaxy A33", price: 1999, category: "Eletrônicos", stock: 2 },
  { id: 2, name: "Notebook Pro X", price: 5499, category: "Eletrônicos", stock: 15 },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function MyProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSave = () => {
    setProducts(prev => prev.map(p => (p.id === editingId ? { ...editForm, id: p.id } : p)));
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container my-4">

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Meus Produtos", path: "#" }
        ]}
      />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
        <h2>Produtos Cadastrados</h2>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-primary">+ Cadastrar Produto</button>
          <button className="btn btn-secondary">Gerar Relatório (PDF)</button>
        </div>
      </div>

      <div className="d-none d-md-block">
        <div className="table-responsive bg-white p-3 rounded shadow-sm">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  {editingId === product.id ? (
                    <>
                      <td>??</td>
                      <td><input className="form-control" name="name" value={editForm.name} onChange={handleChange} /></td>
                      <td><input className="form-control" type="number" name="price" value={editForm.price} onChange={handleChange} /></td>
                      <td><input className="form-control" name="category" value={editForm.category} onChange={handleChange} /></td>
                      <td><input className="form-control" type="number" name="stock" value={editForm.stock} onChange={handleChange} /></td>
                      <td>
                        <button className="btn btn-success btn-sm me-1" onClick={handleSave}>Salvar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setEditingId(null)}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>??</td>
                      <td>{product.name}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(product)}>Atualizar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>??</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      <div className="d-md-none">
        <div className="d-flex flex-column gap-3">
          {products.map(product => (
            <div key={product.id} className="card shadow-sm">
              <div className="card-body">

                {editingId === product.id ? (
                  <>
                    <input className="form-control mb-2" name="name" value={editForm.name} onChange={handleChange} placeholder="Nome" />
                    <input className="form-control mb-2" type="number" name="price" value={editForm.price} onChange={handleChange} placeholder="Pre�o" />
                    <input className="form-control mb-2" name="category" value={editForm.category} onChange={handleChange} placeholder="Categoria" />
                    <input className="form-control mb-2" type="number" name="stock" value={editForm.stock} onChange={handleChange} placeholder="Estoque" />

                    <div className="d-flex gap-2">
                      <button className="btn btn-success btn-sm" onClick={handleSave}>Salvar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setEditingId(null)}>Cancelar</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text mb-1">?? {formatCurrency(product.price)}</p>
                    <p className="card-text mb-1">?? {product.category}</p>
                    <p className="card-text mb-2">?? {product.stock}</p>

                    <div className="d-flex gap-2 flex-wrap">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(product)}>Atualizar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>??</button>
                    </div>
                  </>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}