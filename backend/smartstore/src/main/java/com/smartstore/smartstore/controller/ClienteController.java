package com.smartstore.smartstore.controller;

import com.smartstore.smartstore.dto.UserCreateRequestDto;
import com.smartstore.smartstore.dto.UserCreateResponseDto;
import com.smartstore.smartstore.response.ApiResponse;
import com.smartstore.smartstore.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {
    private ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<ApiResponse<UserCreateResponseDto>> cadastrarCliente(@RequestBody UserCreateRequestDto userCreateRequest) {
        UserCreateResponseDto data = this.clienteService.cadastroCliente(userCreateRequest);
        ApiResponse<UserCreateResponseDto> response = new ApiResponse<>(
          true,
                "Usuário cadastrado",
                data,
                null

        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
