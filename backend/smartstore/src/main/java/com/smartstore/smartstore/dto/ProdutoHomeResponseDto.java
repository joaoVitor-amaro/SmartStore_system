package com.smartstore.smartstore.dto;

public class ProdutoHomeResponseDto {
    private String nome;
    private Double preco;
    private String imagemUrl;
    private String categoriaNome;

    public ProdutoHomeResponseDto() {
    }

    public ProdutoHomeResponseDto(String nome, Double preco, String imagemUrl, String categoriaNome) {
        this.nome = nome;
        this.preco = preco;
        this.imagemUrl = imagemUrl;
        this.categoriaNome = categoriaNome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public String getCategoriaNome() {
        return categoriaNome;
    }

    public void setCategoriaNome(String categoriaNome) {
        this.categoriaNome = categoriaNome;
    }
}