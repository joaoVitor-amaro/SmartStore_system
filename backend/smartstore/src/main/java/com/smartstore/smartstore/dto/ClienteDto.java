package com.smartstore.smartstore.dto;

import com.smartstore.smartstore.model.Cliente;

public class ClienteDto {
    private String nome;
    private String email;
    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;

    public ClienteDto() {
    }

    public ClienteDto(Cliente cliente) {
        this.nome = cliente.getNome();
        this.email = cliente.getEmail();
        this.cep = cliente.getCep();
        this.rua = cliente.getRua();
        this.numero = cliente.getNumero();
        this.bairro = cliente.getBairro();
        this.cidade = cliente.getCidade();
        this.estado = cliente.getEstado();
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
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
