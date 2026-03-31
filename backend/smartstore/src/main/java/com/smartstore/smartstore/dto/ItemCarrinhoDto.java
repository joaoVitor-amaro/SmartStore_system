package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemCarrinhoDto {
    private Long idProduto;
    private String nomeProduto;
    private String imagemUrl;
    private Double preco;
    private Integer quantidade;

    private Double subtotalOriginal;
    private Double percentualDesconto;
    private Double valorDesconto;
    private Double subtotalFinal;

    private List<DescontoAplicadoDto> descontosAplicados;
    private String motivoResumo;
}