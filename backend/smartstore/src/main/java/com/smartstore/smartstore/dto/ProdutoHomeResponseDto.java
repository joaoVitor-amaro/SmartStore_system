package com.smartstore.smartstore.dto;

public class ProdutoHomeResponseDto {

    private String nome;
    private Double preco;
    private String imagemUrl;

    public ProdutoHomeResponseDto(String nome, Double preco, String imagemUrl) {
        this.nome = nome;
        this.preco = preco;
        this.imagemUrl = imagemUrl;
    }

    public String getNome() {
        return nome;
    }

    public Double getPreco() {
        return preco;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }
}