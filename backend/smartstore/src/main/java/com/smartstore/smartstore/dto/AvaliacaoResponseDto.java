package com.smartstore.smartstore.dto;

import java.time.LocalDateTime;

public class AvaliacaoResponseDto {

    private Long id;
    private Integer nota;
    private String comentario;
    private String nomeCliente;
    private LocalDateTime dataCriacao;

    public AvaliacaoResponseDto(Long id, Integer nota, String comentario, String nomeCliente, LocalDateTime dataCriacao) {
        this.id = id;
        this.nota = nota;
        this.comentario = comentario;
        this.nomeCliente = nomeCliente;
        this.dataCriacao = dataCriacao;
    }

    public Long getId() {
        return id;
    }

    public Integer getNota() {
        return nota;
    }

    public String getComentario() {
        return comentario;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
}