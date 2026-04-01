package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemCompraResponseDto {
    private Long idProduto;
    private String nomeProduto;
    private String imagemUrl;
    private Integer quantidade;
    private Double precoUnitario;
    private Double subtotal;
}