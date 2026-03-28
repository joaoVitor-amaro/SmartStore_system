package com.smartstore.smartstore.dto;

import com.smartstore.smartstore.model.ItemCarrinho;

import java.util.List;

public class CarrinhoResponseDto {
    private Long id;
    private String status;
    private String emailCliente;
    private List<ItemCarrinhoResponseDto> itens;

    public CarrinhoResponseDto(Long id, String status, String emailCliente, List<ItemCarrinhoResponseDto> itens) {
        this.id = id;
        this.status = status;
        this.emailCliente = emailCliente;
        this.itens = itens;
    }

    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getEmailCliente() {
        return emailCliente;
    }

    public List<ItemCarrinhoResponseDto> getItens() {
        return itens;
    }
}
