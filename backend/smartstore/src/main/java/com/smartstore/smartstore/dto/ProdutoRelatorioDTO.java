package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoRelatorioDTO {
    private String nome;
    private String categoria;
    private String marca;
    private double preco;
    private int estoqueAtual;
    private int quantidadeVendida;
    private double receitaGerada;
}
