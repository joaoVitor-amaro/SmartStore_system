package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarrinhoDto {
    private Long idCarrinho;
    private List<ItemCarrinhoDto> itens;

    private Double subtotalOriginal;
    private Double totalDesconto;
    private Double totalFinal;

    private String resumoDesconto;
}