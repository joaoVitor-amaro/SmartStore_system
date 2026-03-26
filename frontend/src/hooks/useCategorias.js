import { useState, useEffect } from 'react'

export function useCategorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/categorias')
        .then(res => res.json())
        .then(data => setCategorias(data))
        .catch(err => console.error('Erro ao buscar categorias:', err))
    }, [])

    return {categorias};
}