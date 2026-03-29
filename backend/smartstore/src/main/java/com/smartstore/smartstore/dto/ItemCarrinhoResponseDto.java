package com.smartstore.smartstore.dto;

public class ItemCarrinhoResponseDto {
    private Long idProduto;
    private String nomeProduto;
    private Double preco;
    private Integer quantidade;
    private String imagemUrl;
    private Integer estoque;

    public ItemCarrinhoResponseDto(Long idProduto, String nomeProduto, Double preco, Integer quantidade, String imagemUrl, Integer estoque) {
        this.idProduto = idProduto;
        this.nomeProduto = nomeProduto;
        this.preco = preco;
        this.quantidade = quantidade;
        this.imagemUrl = imagemUrl;
        this.estoque = estoque;
    }

    public Long getIdProduto() { return idProduto; }
    public String getNomeProduto() { return nomeProduto; }
    public Double getPreco() { return preco; }
    public Integer getQuantidade() { return quantidade; }
    public String getImagemUrl() { return imagemUrl; }
    public Integer getEstoque() { return estoque; }
}