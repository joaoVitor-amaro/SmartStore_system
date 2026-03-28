package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.ProdutoCreateRequestDto;
import com.smartstore.smartstore.dto.ProdutoCreateResponseDto;
import com.smartstore.smartstore.dto.ProdutoHomeResponseDto;
import com.smartstore.smartstore.response.ApiResponse;
import com.smartstore.smartstore.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
}