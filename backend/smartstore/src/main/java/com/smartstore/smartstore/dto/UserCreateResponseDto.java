package com.smartstore.smartstore.dto;

public class UserCreateResponseDto {
    private String nome;
    private String email;
    private Character torceFlamengo;
    private Character assisteOnePiece;
    private Character deSousa;
    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;

    public UserCreateResponseDto(UserCreateRequestDto userCreateRequest) {
        this.nome = userCreateRequest.getNome();
        this.email = userCreateRequest.getEmail();
        this.torceFlamengo = userCreateRequest.getTorceFlamengo();
        this.assisteOnePiece = userCreateRequest.getAssisteOnePiece();
        this.deSousa = userCreateRequest.getDeSousa();
        this.cep = userCreateRequest.getCep();
        this.rua = userCreateRequest.getRua();
        this.numero = userCreateRequest.getNumero();
        this.bairro = userCreateRequest.getBairro();
        this.cidade = userCreateRequest.getCidade();
        this.estado = userCreateRequest.getEstado();
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

    public String getCep() {
        return cep;
    }

    public String getRua() {
        return rua;
    }

    public String getNumero() {
        return numero;
    }

    public String getBairro() {
        return bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }
}
