package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.CompraDTO;
import com.smartstore.smartstore.dto.ItemCompraResponseDto;
import com.smartstore.smartstore.dto.MinhasComprasResponseDto;
import com.smartstore.smartstore.model.Carrinho;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.model.Compra;
import com.smartstore.smartstore.model.ItemCompra;
import com.smartstore.smartstore.repository.CarrinhoRepository;
import com.smartstore.smartstore.repository.ClienteRepository;
import com.smartstore.smartstore.repository.CompraRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CompraService {

    private final JdbcTemplate jdbcTemplate;
    private final ClienteRepository clienteRepository;
    private final CarrinhoRepository carrinhoRepository;
    private final CompraRepository compraRepository;

    public CompraService(
            JdbcTemplate jdbcTemplate,
            ClienteRepository clienteRepository,
            CarrinhoRepository carrinhoRepository,
            CompraRepository compraRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.clienteRepository = clienteRepository;
        this.carrinhoRepository = carrinhoRepository;
        this.compraRepository = compraRepository;
    }

    public Long realizarCompra(String email, CompraDTO dto) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

        Carrinho carrinho = carrinhoRepository.findByClienteAndStatus(cliente, "ABERTO")
                .orElseThrow(() -> new IllegalArgumentException("Carrinho não encontrado"));

        return jdbcTemplate.queryForObject(
                "SELECT realizar_compra(?, ?, ?)",
                Long.class,
                carrinho.getId(),
                dto.getValorTotal(),
                dto.getMetodoPagamento()
        );
    }

    public List<MinhasComprasResponseDto> listarMinhasCompras(String email) {
        return compraRepository.findByClienteEmailOrderByDataDesc(email)
                .stream()
                .map(this::toResponseDto)
                .toList();
    }

    private MinhasComprasResponseDto toResponseDto(Compra compra) {
        List<ItemCompraResponseDto> itens = compra.getItens() == null
                ? Collections.emptyList()
                : compra.getItens().stream().map(this::toItemDto).toList();

        int quantidadeItens = itens.stream()
                .map(ItemCompraResponseDto::getQuantidade)
                .filter(qtd -> qtd != null)
                .mapToInt(Integer::intValue)
                .sum();

        return new MinhasComprasResponseDto(
                compra.getId(),
                compra.getData(),
                compra.getStatus(),
                compra.getMetodoPagamento(),
                compra.getValorTotal(),
                quantidadeItens,
                itens
        );
    }

    private ItemCompraResponseDto toItemDto(ItemCompra item) {
        Double precoUnitario = item.getPreco();
        Integer quantidade = item.getQuantidade();
        double subtotal = (precoUnitario == null ? 0.0 : precoUnitario) * (quantidade == null ? 0 : quantidade);

        return new ItemCompraResponseDto(
                item.getProduto() != null ? item.getProduto().getId() : null,
                item.getProduto() != null ? item.getProduto().getNome() : "Produto",
                item.getProduto() != null ? item.getProduto().getImagemUrl() : null,
                quantidade,
                precoUnitario,
                subtotal
        );
    }
}