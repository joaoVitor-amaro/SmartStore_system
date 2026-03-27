package com.smartstore.smartstore.dto;

import java.util.List;

public class AvaliacaoResumoDto {

    private Double mediaNotas;
    private Integer totalAvaliacoes;
    private List<Integer> distribuicao;
    private List<AvaliacaoResponseDto> comentarios;

    public AvaliacaoResumoDto(Double mediaNotas, Integer totalAvaliacoes, List<Integer> distribuicao, List<AvaliacaoResponseDto> comentarios) {
        this.mediaNotas = mediaNotas;
        this.totalAvaliacoes = totalAvaliacoes;
        this.distribuicao = distribuicao;
        this.comentarios = comentarios;
    }

    public Double getMediaNotas() {
        return mediaNotas;
    }

    public Integer getTotalAvaliacoes() {
        return totalAvaliacoes;
    }

    public List<Integer> getDistribuicao() {
        return distribuicao;
    }

    public List<AvaliacaoResponseDto> getComentarios() {
        return comentarios;
    }
}