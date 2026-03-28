package com.smartstore.smartstore.dto;

public class AdicionarItemDto {
    private Long idProduto;
    private Integer quantidade;

    public AdicionarItemDto() {
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }
}
