package com.smartstore.smartstore.dto;

public class ItemCarrinhoResponseDto {
    private Long idProduto;
    private String nomeProduto;
    private Double preco;
    private Integer quantidade;

    public ItemCarrinhoResponseDto(Long idProduto, String nomeProduto, Double preco, Integer quantidade) {
        this.idProduto = idProduto;
        this.nomeProduto = nomeProduto;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public Double getPreco() {
        return preco;
    }

    public Integer getQuantidade() {
        return quantidade;
    }
}
