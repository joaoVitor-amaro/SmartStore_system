package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.Compra;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {

    @EntityGraph(attributePaths = {"itens", "itens.produto"})
    List<Compra> findByClienteEmailOrderByDataDesc(String email);
}