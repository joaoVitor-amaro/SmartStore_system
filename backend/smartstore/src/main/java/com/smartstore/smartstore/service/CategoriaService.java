package com.smartstore.smartstore.service;

import com.smartstore.smartstore.model.Categoria;
import com.smartstore.smartstore.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class CategoriaService {
    private CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listAll() {
        return categoriaRepository.findAll();
    }
}
