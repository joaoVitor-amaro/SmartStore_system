package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.CompraDTO;
import com.smartstore.smartstore.dto.MinhasComprasResponseDto;
import com.smartstore.smartstore.response.ApiResponse;
import com.smartstore.smartstore.service.CompraService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/compra")
@CrossOrigin(origins = "*")
public class CompraController {
    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @PostMapping("/finalizar")
    public ResponseEntity<ApiResponse<?>> finalizarCompra(@RequestBody CompraDTO dto, Authentication authentication) {
        Long compraId = compraService.realizarCompra(authentication.getName(), dto);
        return ResponseEntity.ok(new ApiResponse<>(
                true,
                "Compra realizada com sucesso!",
                Map.of("compraId", compraId, "status", "APROVADO"),
                null
        ));
    }

    @GetMapping("/minhas")
    public ResponseEntity<ApiResponse<List<MinhasComprasResponseDto>>> listarMinhasCompras(Authentication authentication) {
        List<MinhasComprasResponseDto> compras = compraService.listarMinhasCompras(authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(
                true,
                "Compras carregadas com sucesso!",
                compras,
                null
        ));
    }
}