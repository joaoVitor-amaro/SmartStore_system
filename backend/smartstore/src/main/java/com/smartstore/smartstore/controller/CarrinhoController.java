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
}
