import { useState, useEffect } from 'react'

const API_URL = "http://localhost:8080";

export function useCategorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/categorias`)
        .then(res => res.json())
        .then(data => setCategorias(data))
        .catch(err => console.error('Erro ao buscar categorias:', err))
    }, [])

    return {categorias};
}