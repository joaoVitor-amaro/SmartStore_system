package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumoDTO {
    private String nomeVendedor;
    private int totalProdutosCadastrados;
    private int totalUnidadesVendidas;
    private double receitaTotal;
    private double ticketMedio;
}
