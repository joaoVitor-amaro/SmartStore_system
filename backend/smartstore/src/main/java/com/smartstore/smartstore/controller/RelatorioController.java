package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.RelatorioVendedorDTO;
import com.smartstore.smartstore.response.ApiResponse;
import com.smartstore.smartstore.service.RelatorioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/relatorio")
@CrossOrigin(origins = "*")
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMeuRelatorio(Authentication authentication) {
        RelatorioVendedorDTO relatorio = relatorioService.gerarRelatorio(authentication.getName());

        return ResponseEntity.ok(new ApiResponse<>(
                true,
                "Relatório gerado com sucesso!",
                relatorio,
                null
        ));
    }
}