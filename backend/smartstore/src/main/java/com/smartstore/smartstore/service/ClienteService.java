package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.UserCreateRequestDto;
import com.smartstore.smartstore.dto.UserCreateResponseDto;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.repository.ClienteRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {
    private ClienteRepository clienteRepository;
    private PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserCreateResponseDto cadastroCliente(UserCreateRequestDto userCreateRequestdto) {
        if (this.clienteRepository.existsByEmail(userCreateRequestdto.getEmail())) {
            throw new IllegalArgumentException("Email existente");
        }
        Cliente cliente = new Cliente(
                userCreateRequestdto.getNome(),
                userCreateRequestdto.getEmail(),
                userCreateRequestdto.getTorceFlamengo(),
                userCreateRequestdto.getAssisteOnePiece(),
                userCreateRequestdto.getDeSousa(),
                passwordEncoder.encode(userCreateRequestdto.getSenha())
        );
        clienteRepository.save(cliente);
        return new UserCreateResponseDto((userCreateRequestdto));
    }
}
