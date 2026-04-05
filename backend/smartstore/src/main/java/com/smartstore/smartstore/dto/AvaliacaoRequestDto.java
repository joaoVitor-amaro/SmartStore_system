package com.smartstore.smartstore.dto;

public class AvaliacaoRequestDto {

    private Integer nota;
    private String comentario;

    public AvaliacaoRequestDto() {
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

}