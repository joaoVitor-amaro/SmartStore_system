package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.ProdutoDetalheResponseDto;
import com.smartstore.smartstore.dto.ProdutoHomeResponseDto;
import com.smartstore.smartstore.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin // importante pro React
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/home")
    public List<ProdutoHomeResponseDto> listarProdutosHome() {
        return produtoService.listarProdutosHome();
    }
    @GetMapping("/{id}")
    public ProdutoDetalheResponseDto buscarProdutoPorId(@PathVariable Long id) {
        return produtoService.buscarDetalhePorId(id);
}
}