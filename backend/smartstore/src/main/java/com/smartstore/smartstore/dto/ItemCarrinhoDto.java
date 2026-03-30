package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemCarrinhoDto {
    private Long idProduto;
    private String nomeProduto;
    private String imagemUrl;
    private Double preco;
    private Integer quantidade;
    private Double Subtotal;
}
