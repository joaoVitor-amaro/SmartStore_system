package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.Carrinho;
import com.smartstore.smartstore.model.ItemCarrinho;
import com.smartstore.smartstore.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, Long> {
    Optional<ItemCarrinho> findByCarrinhoAndProduto(Carrinho carrinho, Produto produto);
}
