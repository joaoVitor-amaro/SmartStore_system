package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.ItemCompra;
import com.smartstore.smartstore.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemCompraRepository extends JpaRepository<ItemCompra, Long> {
    @Query("""
        SELECT 
            COUNT(DISTINCT p.id),
            SUM(ic.quantidade),
            SUM(ic.quantidade * ic.preco),
            AVG(ic.preco)
        FROM ItemCompra ic
        JOIN ic.produto p
        WHERE p.vendedor.id = :vendedorId
        AND ic.compra.status = 'APROVADO'
    """)
    Object[] buscarResumoVendedor(@Param("vendedorId") Long vendedorId);


    List<ItemCompra> findByProdutoAndCompra_Status(Produto produto, String status);
    void deleteByProdutoId(Long id);
}
