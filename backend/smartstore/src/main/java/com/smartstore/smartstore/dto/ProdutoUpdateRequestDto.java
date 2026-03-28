package com.smartstore.smartstore.dto;

public record ProdutoUpdateRequestDto(
        String nome,
        Double preco,
        Integer estoque
) {}