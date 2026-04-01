package com.smartstore.smartstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioVendedorDTO {
    private ResumoDTO resumo;
    private List<ProdutoRelatorioDTO> produtos;
}
