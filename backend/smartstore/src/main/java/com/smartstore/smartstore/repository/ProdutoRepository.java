package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByVendedor(Cliente vendedor);
    List<Produto> findByVendedorEmail(String email);

    @Query(value = """
        SELECT
            id AS id,
            nome AS nome,
            preco AS preco,
            estoque AS estoque,
            imagem_url AS imagemUrl,
            categoria_nome AS categoriaNome,
            marca_nome AS marcaNome
        FROM vw_produtos_catalogo
        WHERE (:nome IS NULL OR :nome = '' OR LOWER(nome) LIKE LOWER(CONCAT('%', :nome, '%')))
          AND (:categoria IS NULL OR :categoria = '' OR LOWER(categoria_nome) = LOWER(:categoria))
          AND (:marca IS NULL OR :marca = '' OR LOWER(marca_nome) = LOWER(:marca))
          AND (:precoMin IS NULL OR preco >= :precoMin)
          AND (:precoMax IS NULL OR preco <= :precoMax)
          AND (:disponivel IS NULL OR :disponivel = false OR estoque > 0)
          AND (:estoqueBaixo IS NULL OR :estoqueBaixo = false OR estoque < 10)
        ORDER BY
          CASE WHEN :ordenar = 'precoAsc' THEN preco END ASC,
          CASE WHEN :ordenar = 'precoDesc' THEN preco END DESC,
          CASE WHEN :ordenar = 'nomeAsc' THEN nome END ASC,
          CASE WHEN :ordenar = 'nomeDesc' THEN nome END DESC,
          CASE WHEN :ordenar = 'estoqueAsc' THEN estoque END ASC,
          CASE WHEN :ordenar = 'estoqueDesc' THEN estoque END DESC,
          id DESC
        """, nativeQuery = true)
    List<ProdutoCatalogoView> buscarCatalogoComFiltros(
            @Param("nome") String nome,
            @Param("categoria") String categoria,
            @Param("marca") String marca,
            @Param("precoMin") Double precoMin,
            @Param("precoMax") Double precoMax,
            @Param("disponivel") Boolean disponivel,
            @Param("estoqueBaixo") Boolean estoqueBaixo,
            @Param("ordenar") String ordenar
    );
}