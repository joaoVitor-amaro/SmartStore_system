package com.smartstore.smartstore.repository;

public interface ProdutoCatalogoView {
    Long getId();
    String getNome();
    Double getPreco();
    Integer getEstoque();
    String getImagemUrl();
    String getCategoriaNome();
    String getMarcaNome();
}