package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.CompraDTO;
import com.smartstore.smartstore.model.Carrinho;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.repository.CarrinhoRepository;
import com.smartstore.smartstore.repository.ClienteRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class CompraService {

    private final JdbcTemplate jdbcTemplate;
    private final ClienteRepository clienteRepository;
    private final CarrinhoRepository carrinhoRepository;

    public CompraService(JdbcTemplate jdbcTemplate, ClienteRepository clienteRepository, CarrinhoRepository carrinhoRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.clienteRepository = clienteRepository;
        this.carrinhoRepository = carrinhoRepository;
    }

    public Long realizarCompra(String email, CompraDTO dto) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

        Carrinho carrinho = carrinhoRepository.findByClienteAndStatus(cliente, "ABERTO")
                .orElseThrow(() -> new IllegalArgumentException("Carrinho não encontrado"));

        return jdbcTemplate.execute(
                (java.sql.Connection con) -> {
                    java.sql.CallableStatement cs = con.prepareCall("CALL realizar_compra(?, ?, ?, ?)");
                    cs.setLong(1, carrinho.getId());
                    cs.setDouble(2, dto.getValorTotal());
                    cs.setString(3, dto.getMetodoPagamento());
                    cs.registerOutParameter(4, java.sql.Types.BIGINT);
                    cs.execute();
                    return cs.getLong(4);
                }
        );
    }
}