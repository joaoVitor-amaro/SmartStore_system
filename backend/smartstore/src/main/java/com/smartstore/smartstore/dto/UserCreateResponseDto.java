package com.smartstore.smartstore.dto;

public class UserCreateResponseDto {
    private String nome;
    private String email;
    private Character torceFlamengo;
    private Character assisteOnePiece;
    private Character deSousa;

    public UserCreateResponseDto(UserCreateRequestDto userCreateRequest) {
        this.nome = userCreateRequest.getNome();
        this.email = userCreateRequest.getEmail();
        this.torceFlamengo = userCreateRequest.getTorceFlamengo();
        this.assisteOnePiece = userCreateRequest.getAssisteOnePiece();
        this.deSousa = userCreateRequest.getDeSousa();
    }

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
}
