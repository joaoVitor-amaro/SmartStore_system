package com.smartstore.smartstore.dto;

public record MeusProdutosResponseDto(
        Long id,
        String nome,
        Double preco,
        String categoria,
        Integer estoque
) {}