package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MinhasComprasResponseDto {
    private Long idCompra;
    private LocalDateTime data;
    private String status;
    private String metodoPagamento;
    private Double valorTotal;
    private Integer quantidadeItens;
    private List<ItemCompraResponseDto> itens;
}