package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.AdicionarItemDto;
import com.smartstore.smartstore.dto.CarrinhoResponseDto;
import com.smartstore.smartstore.model.Carrinho;
import com.smartstore.smartstore.response.ApiResponse;
import com.smartstore.smartstore.service.CarrinhoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carrinho")
@CrossOrigin(origins = "*")
public class CarrinhoController {
    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<ApiResponse<CarrinhoResponseDto>> adicionarItem(@RequestBody AdicionarItemDto dto, Authentication authentication) {
        CarrinhoResponseDto carrinho = carrinhoService.adicionarItem(dto, authentication.getName());
        ApiResponse<CarrinhoResponseDto> response = new ApiResponse<>(
                true,
                "Produto adicionado ao carrinho",
                carrinho,
                null
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping
    public ResponseEntity<ApiResponse<CarrinhoResponseDto>> buscarCarrinho(
            Authentication authentication) {
        CarrinhoResponseDto carrinho = carrinhoService.buscarCarrinho(authentication.getName());
        ApiResponse<CarrinhoResponseDto> response = new ApiResponse<>(
                true,
                "Carrinho encontrado",
                carrinho,
                null
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/item/{idProduto}")
    public ResponseEntity<ApiResponse<Void>> atualizarQuantidade(
            @PathVariable Long idProduto,
            @RequestParam Integer quantidade,
            Authentication authentication) {
        carrinhoService.atualizarQuantidade(authentication.getName(), idProduto, quantidade);
        return ResponseEntity.ok(new ApiResponse<>(true, "Quantidade atualizada", null, null));
    }

    @DeleteMapping("/item/{idProduto}")
    public ResponseEntity<ApiResponse<Void>> deletarItem(
            @PathVariable Long idProduto,
            Authentication authentication) {
        carrinhoService.deletarCarrinho(authentication.getName(), idProduto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Item removido do carrinho", null, null));
    }
}
