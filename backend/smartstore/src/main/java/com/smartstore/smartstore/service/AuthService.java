package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.AuthResponseDto;
import com.smartstore.smartstore.dto.LoginDto;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.repository.ClienteRepository;
import com.smartstore.smartstore.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private ClienteRepository clienteRepository;
    private JwtService jwtService;
    private PasswordEncoder passwordEncoder;

    public AuthService(ClienteRepository clienteRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponseDto login(LoginDto loginDto) {
        Cliente cliente = clienteRepository
                .findByEmail(loginDto.getEmail())
                .orElseThrow(() ->
                    new IllegalArgumentException("Cliente não encontrado")
                );
        boolean senhaValida = passwordEncoder.matches(loginDto.getSenha(), cliente.getSenha());
        if (!senhaValida) {
            throw new IllegalArgumentException("Senha inválida");
        }
        String token = jwtService.gerarToken(cliente.getEmail());
        return new AuthResponseDto(token, loginDto.getEmail());
    }
}

