package com.smartstore.smartstore.dto;

public class ProdutoDetalheResponseDto {

    private Long id;
    private String nome;
    private Double preco;
    private String imagemUrl;
    private String categoriaNome;
    private String descricao;
    private String localFabricado;
    private String marcaNome;
    private Integer estoque;

    public ProdutoDetalheResponseDto(
            Long id,
            String nome,
            Double preco,
            String imagemUrl,
            String categoriaNome,
            String descricao,
            String localFabricado,
            String marcaNome,
            Integer estoque
    ) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.imagemUrl = imagemUrl;
        this.categoriaNome = categoriaNome;
        this.descricao = descricao;
        this.localFabricado = localFabricado;
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

    public String getDescricao() {
        return descricao;
    }

    public String getLocalFabricado() {
        return localFabricado;
    }

    public String getMarcaNome() {
        return marcaNome;
    }

    public Integer getEstoque() {
        return estoque;
    }
}