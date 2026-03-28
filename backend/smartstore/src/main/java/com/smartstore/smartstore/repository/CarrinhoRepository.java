package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.Carrinho;
import com.smartstore.smartstore.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    Optional<Carrinho> findByCliente(Cliente cliente);
}
