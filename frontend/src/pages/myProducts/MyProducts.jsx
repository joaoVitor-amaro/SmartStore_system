import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import FiltrosSidebar from "../../components/FiltrosSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function MyProducts() {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [sucesso, setSucesso] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);


  const [filtros, setFiltros] = useState({
  categoria: "",
  marca: "",
  precoMin: "",
  precoMax: "",
  disponivel: "",
  estoqueBaixo: "",
  ordenar: ""
});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/produtos/meus", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar meus produtos");
        }
        return res.json();
      })
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, []);

  const produtosFiltrados = useMemo(() => {
    let lista = [...produtos];

    if (filtros.categoria) {
      lista = lista.filter(
        (p) => p.categoria?.toLowerCase() === filtros.categoria.toLowerCase()
      );
    }

    if (filtros.marca) {
      lista = lista.filter(
        (p) => p.marca?.toLowerCase() === filtros.marca.toLowerCase()
      );
    }

    if (filtros.precoMin) {
      lista = lista.filter((p) => p.preco >= Number(filtros.precoMin));
    }

    if (filtros.precoMax) {
      lista = lista.filter((p) => p.preco <= Number(filtros.precoMax));
    }

    if (filtros.disponivel) {
      lista = lista.filter((p) => p.estoque > 0);
    }

    if (filtros.estoqueBaixo) {
      lista = lista.filter((p) => p.estoque < 10);
    }

    switch (filtros.ordenar) {
      case "precoAsc":
        lista.sort((a, b) => a.preco - b.preco);
        break;
      case "precoDesc":
        lista.sort((a, b) => b.preco - a.preco);
        break;
      case "nomeAsc":
        lista.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "nomeDesc":
        lista.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case "estoqueAsc":
        lista.sort((a, b) => a.estoque - b.estoque);
        break;
      case "estoqueDesc":
        lista.sort((a, b) => b.estoque - a.estoque);
        break;
      default:
        break;
    }

    return lista;
  }, [produtos, filtros]);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/produtos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: editForm.nome,
          preco: Number(editForm.preco),
          estoque: Number(editForm.estoque)
        })
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      setProdutos((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...editForm, id: p.id } : p))
      );

      setEditingId(null);
      setSucesso("Produto atualizado com sucesso!");
      setTimeout(() => setSucesso(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalExcluir = (product) => {
    setProdutoParaExcluir(product);
    setShowDeleteModal(true);
  };

  const fecharModalExcluir = () => {
    setProdutoParaExcluir(null);
    setShowDeleteModal(false);
  };

  const confirmarExclusao = async () => {
    if (!produtoParaExcluir) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/produtos/${produtoParaExcluir.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir produto");
      }

      setProdutos((prev) => prev.filter((p) => p.id !== produtoParaExcluir.id));
      fecharModalExcluir();
      setSucesso("Produto excluído com sucesso!");
      setTimeout(() => setSucesso(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
  <div className="container my-4">
    {sucesso && (
      <div
        className="position-fixed top-0 end-0 m-3 alert alert-success d-flex align-items-center gap-2 shadow"
        style={{ zIndex: 9999, minWidth: 280 }}
      >
        <i className="bi bi-check-circle-fill" />
        {sucesso}
        <button className="btn-close ms-auto" onClick={() => setSucesso("")} />
      </div>
    )}

    <Breadcrumb
      items={[
        { label: "Home", path: "/" },
        { label: "Meus Produtos", path: "#" }
      ]}
    />

    <div className="d-flex flex-column flex-lg-row gap-4">
      <FiltrosSidebar
        mostrarEstoqueBaixo={true}
        filtrosAtuais={filtros}
        onAplicar={setFiltros}
      />

      <div className="flex-grow-1">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
          <h2>Produtos Cadastrados</h2>
          <div className="d-flex gap-2 flex-wrap">
            <Link to="/cadastrarProduto">
              <button className="btn btn-primary">+ Cadastrar Produto</button>
            </Link>
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
                  <th>Marca</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {produtosFiltrados.map((product) => (
                  <tr key={product.id}>
                    {editingId === product.id ? (
                      <>
                        <td>??</td>
                        <td>
                          <input
                            className="form-control"
                            name="nome"
                            value={editForm.nome}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            type="number"
                            name="preco"
                            value={editForm.preco}
                            onChange={handleChange}
                          />
                        </td>
                        <td>{product.categoria}</td>
                        <td>{product.marca}</td>
                        <td>
                          <input
                            className="form-control"
                            type="number"
                            name="estoque"
                            value={editForm.estoque}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <button className="btn btn-success btn-sm me-1" onClick={handleSave}>
                            Salvar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setEditingId(null)}
                          >
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>??</td>
                        <td>{product.nome}</td>
                        <td>{formatCurrency(product.preco)}</td>
                        <td>{product.categoria}</td>
                        <td>{product.marca}</td>
                        <td>{product.estoque}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-1"
                            onClick={() => handleEdit(product)}
                          >
                            Atualizar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => abrirModalExcluir(product)}
                          >
                            Excluir
                          </button>
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
            {produtosFiltrados.map((product) => (
              <div key={product.id} className="card shadow-sm">
                <div className="card-body">
                  {editingId === product.id ? (
                    <>
<>
  <div className="d-flex align-items-center gap-2 mb-2">
    <img
      src={product.imagemUrl}
      alt={product.nome}
      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
    />
    <strong>{product.nome}</strong>
  </div>

  <input
    className="form-control mb-2"
    name="nome"
    value={editForm.nome}
    onChange={handleChange}
    placeholder="Nome"
  />

  <input
    className="form-control mb-2"
    type="number"
    name="preco"
    value={editForm.preco}
    onChange={handleChange}
    placeholder="Preço"
  />

  <p className="card-text mb-1">Categoria: {product.categoria}</p>
  <p className="card-text mb-1">Marca: {product.marca}</p>

  <input
    className="form-control mb-2"
    type="number"
    name="estoque"
    value={editForm.estoque}
    onChange={handleChange}
    placeholder="Estoque"
  />

  <div className="d-flex gap-2">
    <button className="btn btn-success btn-sm" onClick={handleSave}>
      Salvar
    </button>
    <button
      className="btn btn-danger btn-sm"
      onClick={() => setEditingId(null)}
    >
      Cancelar
    </button>
  </div>
</>
                          Salvar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
<>
  <div className="d-flex align-items-center gap-2 mb-2">
    <img
      src={product.imagemUrl}
      alt={product.nome}
      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
    />
    <h5 className="card-title mb-0">{product.nome}</h5>
  </div>

  <p className="card-text mb-1">{formatCurrency(product.preco)}</p>
  <p className="card-text mb-1">Categoria: {product.categoria}</p>
  <p className="card-text mb-1">Marca: {product.marca}</p>
  <p className="card-text mb-2">Estoque: {product.estoque}</p>

  <div className="d-flex gap-2 flex-wrap">
    <button
      className="btn btn-warning btn-sm"
      onClick={() => handleEdit(product)}
    >
      Atualizar
    </button>
    <button
      className="btn btn-danger btn-sm"
      onClick={() => abrirModalExcluir(product)}
    >
      Excluir
    </button>
  </div>
</>
                          Atualizar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => abrirModalExcluir(product)}
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {showDeleteModal && (
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold text-danger">
                Confirmar exclusão
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={fecharModalExcluir}
              ></button>
            </div>

            <div className="modal-body pt-2">
              <p className="mb-2">
                Tem certeza que deseja excluir este produto?
              </p>

              {produtoParaExcluir && (
                <div className="bg-light rounded-3 p-3 border">
                  <div className="fw-semibold">{produtoParaExcluir.nome}</div>
                  <div className="text-muted small">
                    {formatCurrency(produtoParaExcluir.preco)} • {produtoParaExcluir.categoria}
                  </div>
                </div>
              )}

              <p className="text-muted small mt-3 mb-0">
                Essa ação não poderá ser desfeita.
              </p>
            </div>

            <div className="modal-footer border-0 pt-0">
              <button
                type="button"
                className="btn btn-light"
                onClick={fecharModalExcluir}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmarExclusao}
              >
                Excluir produto
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}