package com.smartstore.smartstore.dto;

public class UserCreateRequestDto {
    private String nome;
    private String email;
    private Character torceFlamengo;
    private Character assisteOnePiece;
    private Character deSousa;
    private String senha;

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public Character getTorceFlamengo() {
        return torceFlamengo;
    }

    public Character getAssisteOnePiece() {
        return assisteOnePiece;
    }

    public Character getDeSousa() {
        return deSousa;
    }

    public String getSenha() {
        return senha;
    }
}
