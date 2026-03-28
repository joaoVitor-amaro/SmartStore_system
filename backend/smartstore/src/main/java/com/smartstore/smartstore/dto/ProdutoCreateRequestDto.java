package com.smartstore.smartstore.dto;

import org.springframework.web.multipart.MultipartFile;

public class ProdutoCreateRequestDto {
    private String nome;
    private String descricao;
    private Double preco;
    private Integer estoque;
    private String fabricadoEm;

    private MultipartFile imagem;

    private Long marcaId;
    private Long categoriaId;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }

    public String getFabricadoEm() {
        return fabricadoEm;
    }

    public void setFabricadoEm(String fabricadoEm) {
        this.fabricadoEm = fabricadoEm;
    }

    public MultipartFile getImagem() {
        return imagem;
    }

    public void setImagem(MultipartFile imagem) {
        this.imagem = imagem;
    }

    public Long getMarcaId() {
        return marcaId;
    }

    public void setMarcaId(Long marcaId) {
        this.marcaId = marcaId;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
}
