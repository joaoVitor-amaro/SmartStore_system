package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.ClienteDto;
import com.smartstore.smartstore.dto.GetClienteResponseDto;
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
                passwordEncoder.encode(userCreateRequestdto.getSenha()),
                userCreateRequestdto.getCep(),
                userCreateRequestdto.getRua(),
                userCreateRequestdto.getNumero(),
                userCreateRequestdto.getBairro(),
                userCreateRequestdto.getCidade(),
                userCreateRequestdto.getEstado()
        );
        clienteRepository.save(cliente);
        return new UserCreateResponseDto((userCreateRequestdto));
    }

    public GetClienteResponseDto getDadosClienteLogado(String emailCliente) {
        Cliente cliente = clienteRepository.findByEmail(emailCliente)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

        return new GetClienteResponseDto(
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getCep(),
                cliente.getRua(),
                cliente.getNumero(),
                cliente.getBairro(),
                cliente.getCidade(),
                cliente.getEstado(),
                cliente.getTorceFlamengo(),
                cliente.getAssisteOnePiece(),
                cliente.getDeSousa()
        );
    }

    public ClienteDto atualizarCliente(String email, ClienteDto dto) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setCep(dto.getCep());
        cliente.setRua(dto.getRua());
        cliente.setNumero(dto.getNumero());
        cliente.setBairro(dto.getBairro());
        cliente.setCidade(dto.getCidade());
        cliente.setEstado(dto.getEstado());

        clienteRepository.save(cliente);
        return new ClienteDto(cliente);
    }
}
