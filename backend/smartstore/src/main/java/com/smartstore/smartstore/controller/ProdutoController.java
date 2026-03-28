package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.ProdutoDetalheResponseDto;
import com.smartstore.smartstore.dto.ProdutoHomeResponseDto;
import com.smartstore.smartstore.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/home")
    public List<ProdutoHomeResponseDto> listarProdutosHome() {
        return produtoService.listarProdutosHome();
    }

    @GetMapping("/categoria/{nome}")
    public List<ProdutoHomeResponseDto> listarPorCategoria(@PathVariable String nome) {
        return produtoService.listarProdutosPorCategoria(nome);
    }

    @GetMapping("/buscar")
    public List<ProdutoHomeResponseDto> buscarProdutos(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String categoria
    ) {
        return produtoService.buscarProdutos(nome, categoria);
    }

    @GetMapping("/{id}")
    public ProdutoDetalheResponseDto buscarProdutoPorId(@PathVariable Long id) {
        return produtoService.buscarDetalhePorId(id);
    }
}