package com.smartstore.smartstore.dto;

import org.springframework.web.multipart.MultipartFile;

public class ProdutoCreateResponseDto {
    private String nome;
    private String descricao;
    private Double preco;
    private Integer estoque;
    private String fabricadoEm;

    private String imagemUrl;

    private Long marcaId;
    private Long categoriaId;

    private String email;

    public ProdutoCreateResponseDto() {
    }

    public ProdutoCreateResponseDto(ProdutoCreateRequestDto produtoDto, String emai) {
        this.nome = produtoDto.getNome();
        this.descricao = produtoDto.getDescricao();
        this.preco = produtoDto.getPreco();
        this.estoque = produtoDto.getEstoque();
        this.fabricadoEm = produtoDto.getFabricadoEm();
        this.imagemUrl = produtoDto.getImagem() != null ? produtoDto.getImagem().getOriginalFilename() : null;
        this.marcaId = produtoDto.getMarcaId();
        this.categoriaId = produtoDto.getCategoriaId();
        this.email = emai;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public String getFabricadoEm() {
        return fabricadoEm;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public Long getMarcaId() {
        return marcaId;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public String getEmail() {
        return email;
    }
}
