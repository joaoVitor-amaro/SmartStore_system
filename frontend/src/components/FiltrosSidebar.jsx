import { useEffect, useMemo, useState } from "react";
import "./FiltrosSidebar.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function FiltrosSidebar({
  mostrarEstoqueBaixo = false,
  filtrosAtuais,
  onAplicar
}) {
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: filtrosAtuais.categoria || "",
    marca: filtrosAtuais.marca || "",
    precoMin: filtrosAtuais.precoMin || "",
    precoMax: filtrosAtuais.precoMax || "",
    disponivel: filtrosAtuais.disponivel === "true",
    estoqueBaixo: filtrosAtuais.estoqueBaixo === "true",
    ordenar: filtrosAtuais.ordenar || ""
  });

  useEffect(() => {
    fetch(`${API_URL}/api/categorias`)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const categoriaObj = categorias.find((cat) => cat.nome === filtros.categoria);

    if (!categoriaObj) {
      fetch(`${API_URL}/marcas`)
        .then((res) => res.json())
        .then((data) => setMarcas(data))
        .catch((err) => console.error(err));
      return;
    }

    fetch(`${API_URL}/marcas/categoria/${categoriaObj.id}`)
      .then((res) => res.json())
      .then((data) => setMarcas(data))
      .catch((err) => console.error(err));
  }, [filtros.categoria, categorias]);

  useEffect(() => {
    setFiltros({
      categoria: filtrosAtuais.categoria || "",
      marca: filtrosAtuais.marca || "",
      precoMin: filtrosAtuais.precoMin || "",
      precoMax: filtrosAtuais.precoMax || "",
      disponivel: filtrosAtuais.disponivel === "true",
      estoqueBaixo: filtrosAtuais.estoqueBaixo === "true",
      ordenar: filtrosAtuais.ordenar || ""
    });
  }, [filtrosAtuais]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFiltros((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "categoria" ? { marca: "" } : {})
    }));
  }

  function limparFiltros() {
    const limpos = {
      categoria: "",
      marca: "",
      precoMin: "",
      precoMax: "",
      disponivel: false,
      estoqueBaixo: false,
      ordenar: ""
    };

    setFiltros(limpos);
    onAplicar(limpos);
  }

  const marcasOrdenadas = useMemo(
    () => [...marcas].sort((a, b) => a.nome.localeCompare(b.nome)),
    [marcas]
  );

  return (
    <aside className="filtros-sidebar">
      <div className="filtros-header">
        <h3>Filtros</h3>
      </div>

      <div className="filtro-group">
        <label>Categoria</label>
        <select name="categoria" value={filtros.categoria} onChange={handleChange}>
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nome}>
              {cat.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro-group">
        <label>Marca</label>
        <select name="marca" value={filtros.marca} onChange={handleChange}>
          <option value="">Todas</option>
          {marcasOrdenadas.map((marca) => (
            <option key={marca.id} value={marca.nome}>
              {marca.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro-group">
        <label>Preço minimo</label>
        <input
          type="number"
          step="0.01"
          name="precoMin"
          value={filtros.precoMin}
          onChange={handleChange}
          placeholder="Ex: 100"
        />
      </div>

      <div className="filtro-group">
        <label>Preço máximo</label>
        <input
          type="number"
          step="0.01"
          name="precoMax"
          value={filtros.precoMax}
          onChange={handleChange}
          placeholder="Ex: 800"
        />
      </div>

      <div className="filtro-check">
        <label>
          <input
            type="checkbox"
            name="disponivel"
            checked={filtros.disponivel}
            onChange={handleChange}
          />
          Somente disponíveis
        </label>
      </div>

      {mostrarEstoqueBaixo && (
        <div className="filtro-check">
          <label>
            <input
              type="checkbox"
              name="estoqueBaixo"
              checked={filtros.estoqueBaixo}
              onChange={handleChange}
            />
            Estoque baixo
          </label>
        </div>
      )}

      <div className="filtro-group">
        <label>Ordenar por</label>
        <select name="ordenar" value={filtros.ordenar} onChange={handleChange}>
          <option value="">Mais recentes</option>
          <option value="precoAsc">Menor preço</option>
          <option value="precoDesc">Maior preço</option>
          <option value="nomeAsc">Nome A-Z</option>
          <option value="nomeDesc">Nome Z-A</option>
          {mostrarEstoqueBaixo && <option value="estoqueAsc">Menor estoque</option>}
          {mostrarEstoqueBaixo && <option value="estoqueDesc">Maior estoque</option>}
        </select>
      </div>

      <div className="filtros-acoes">
        <button className="btn-aplicar" onClick={() => onAplicar(filtros)}>
          Aplicar filtros
        </button>

        <button className="btn-limpar" onClick={limparFiltros}>
          Limpar
        </button>
      </div>
    </aside>
  );
}