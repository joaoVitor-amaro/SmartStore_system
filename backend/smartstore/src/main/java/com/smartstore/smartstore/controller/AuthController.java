package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.AuthResponseDto;
import com.smartstore.smartstore.dto.LoginDto;
import com.smartstore.smartstore.dto.NovaSenhaRequestDto;
import com.smartstore.smartstore.dto.RecuperarSenhaRequest;
import com.smartstore.smartstore.service.AuthService;
import com.smartstore.smartstore.service.PasswordResetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private AuthService authService;
    private PasswordResetService passwordResetService;

    public AuthController(AuthService authService, PasswordResetService passwordResetService) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        AuthResponseDto response = authService.login(loginDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(@RequestBody RecuperarSenhaRequest dto) {
        System.out.println(">>> chegou no endpoint: " + dto.getEmail());
        passwordResetService.processarRecuperacaoSenha(dto);
        return ResponseEntity.ok("Email enviado");
    }

    @PostMapping("/nova-senha")
    public ResponseEntity<?> novaSenha(@RequestBody NovaSenhaRequestDto dto) {
        passwordResetService.redefinirSenha(dto);
        return ResponseEntity.ok("Senha alterada com sucesso");
    }
}
