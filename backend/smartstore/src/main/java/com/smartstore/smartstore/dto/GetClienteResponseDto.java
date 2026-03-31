package com.smartstore.smartstore.dto;

public class GetClienteResponseDto {
    private String nome;
    private String email;
    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;

    private Character torceFlamengo;
    private Character assisteOnePiece;
    private Character deSousa;

    public GetClienteResponseDto(
            String nome,
            String email,
            String cep,
            String rua,
            String numero,
            String bairro,
            String cidade,
            String estado,
            Character torceFlamengo,
            Character assisteOnePiece,
            Character deSousa
    ) {
        this.nome = nome;
        this.email = email;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.torceFlamengo = torceFlamengo;
        this.assisteOnePiece = assisteOnePiece;
        this.deSousa = deSousa;
    }

    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getCep() { return cep; }
    public String getRua() { return rua; }
    public String getNumero() { return numero; }
    public String getBairro() { return bairro; }
    public String getCidade() { return cidade; }
    public String getEstado() { return estado; }

    public Character getTorceFlamengo() { return torceFlamengo; }
    public Character getAssisteOnePiece() { return assisteOnePiece; }
    public Character getDeSousa() { return deSousa; }
}