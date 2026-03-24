package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}