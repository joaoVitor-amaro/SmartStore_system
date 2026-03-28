package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByCategoriaNomeIgnoreCase(String nome);

    List<Produto> findByNomeContainingIgnoreCase(String nome);

    List<Produto> findByVendedorEmail(String email);

    List<Produto> findByNomeContainingIgnoreCaseAndCategoriaNomeIgnoreCase(String nome, String categoria);
}