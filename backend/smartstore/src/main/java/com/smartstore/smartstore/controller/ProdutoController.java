package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.*;
import com.smartstore.smartstore.response.ApiResponse;
import com.smartstore.smartstore.service.ProdutoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    @PostMapping(value = "/cadastro", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ProdutoCreateResponseDto>> cadastrarProduto(
            @ModelAttribute ProdutoCreateRequestDto produtoDto, Authentication authentication) throws Exception {
        ProdutoCreateResponseDto data = produtoService.cadastrar(produtoDto, authentication.getName());
        ApiResponse<ProdutoCreateResponseDto> response = new ApiResponse<>(
                true,
                "Usuário cadastrado",
                data,
                null
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/categoria/{nome}")
    public List<ProdutoHomeResponseDto> listarPorCategoria(@PathVariable String nome) {
        return produtoService.listarProdutosPorCategoria(nome);
    }

    @GetMapping("/buscar")
    public List<ProdutoHomeResponseDto> buscarProdutos(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Double precoMin,
            @RequestParam(required = false) Double precoMax,
            @RequestParam(required = false) Boolean disponivel,
            @RequestParam(required = false) Boolean estoqueBaixo,
            @RequestParam(required = false) String ordenar
    ) {
        return produtoService.buscarProdutos(
                nome, categoria, marca, precoMin, precoMax, disponivel, estoqueBaixo, ordenar
        );
    }

    @GetMapping("/{id}")
    public ProdutoDetalheResponseDto buscarProdutoPorId(@PathVariable Long id) {
        return produtoService.buscarDetalhePorId(id);
    }

    @GetMapping("/meus")
    public List<MeusProdutosResponseDto> listarMeusProdutos(Authentication authentication) {
        return produtoService.listarProdutosDoVendedor(authentication.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id, Authentication authentication) {
        produtoService.excluirProduto(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarProduto(
            @PathVariable Long id,
            @RequestBody ProdutoUpdateRequestDto dto,
            Authentication authentication
    ) {
        produtoService.atualizarProduto(id, dto, authentication.getName());
        return ResponseEntity.ok().build();
    }
}