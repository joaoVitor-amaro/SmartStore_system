package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.AvaliacaoRequestDto;
import com.smartstore.smartstore.dto.AvaliacaoResponseDto;
import com.smartstore.smartstore.dto.AvaliacaoResumoDto;
import com.smartstore.smartstore.service.AvaliacaoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produtos/{produtoId}/avaliacoes")
@CrossOrigin
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @GetMapping
    public AvaliacaoResumoDto listar(@PathVariable Long produtoId) {
        return avaliacaoService.buscarPorProduto(produtoId);
    }

    @PostMapping
    public AvaliacaoResponseDto cadastrar(@PathVariable Long produtoId,
                                          @RequestBody AvaliacaoRequestDto dto) {
        return avaliacaoService.cadastrar(produtoId, dto);
    }
}