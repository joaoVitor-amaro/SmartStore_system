package com.smartstore.smartstore.dto;

public class ProdutoHomeResponseDto {

    private Long id;
    private String nome;
    private Double preco;
    private String imagemUrl;
    private String categoriaNome;
    private String marcaNome;
    private Integer estoque;

    public ProdutoHomeResponseDto() {
    }

    public ProdutoHomeResponseDto(Long id, String nome, Double preco, String imagemUrl,
                                  String categoriaNome, String marcaNome, Integer estoque) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.imagemUrl = imagemUrl;
        this.categoriaNome = categoriaNome;
        this.marcaNome = marcaNome;
        this.estoque = estoque;
    }

    public Long getId() {
        return id;
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

    public String getCategoriaNome() {
        return categoriaNome;
    }

    public String getMarcaNome() {
        return marcaNome;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public void setCategoriaNome(String categoriaNome) {
        this.categoriaNome = categoriaNome;
    }

    public void setMarcaNome(String marcaNome) {
        this.marcaNome = marcaNome;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }
}