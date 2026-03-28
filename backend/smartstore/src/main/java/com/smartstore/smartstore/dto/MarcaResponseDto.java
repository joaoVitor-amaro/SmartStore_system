package com.smartstore.smartstore.dto;

public class MarcaResponseDto {
    private Long id;
    private String nome;

    public MarcaResponseDto(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}