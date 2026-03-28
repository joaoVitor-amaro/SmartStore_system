package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.AdicionarItemDto;
import com.smartstore.smartstore.dto.CarrinhoResponseDto;
import com.smartstore.smartstore.dto.ItemCarrinhoResponseDto;
import com.smartstore.smartstore.model.Carrinho;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.model.ItemCarrinho;
import com.smartstore.smartstore.model.Produto;
import com.smartstore.smartstore.repository.CarrinhoRepository;
import com.smartstore.smartstore.repository.ClienteRepository;
import com.smartstore.smartstore.repository.ItemCarrinhoRepository;
import com.smartstore.smartstore.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoService {
    private final CarrinhoRepository carrinhoRepository;
    private final ItemCarrinhoRepository itemCarrinhoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    public CarrinhoService(CarrinhoRepository carrinhoRepository, ItemCarrinhoRepository itemCarrinhoRepository, ClienteRepository clienteRepository, ProdutoRepository produtoRepository) {
        this.carrinhoRepository = carrinhoRepository;
        this.itemCarrinhoRepository = itemCarrinhoRepository;
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
    }

    public CarrinhoResponseDto adicionarItem(AdicionarItemDto dto, String emailCliente) {
        Cliente cliente = clienteRepository.findByEmail(emailCliente)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        Produto produto = produtoRepository.findById(dto.getIdProduto())
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        if(produto.getVendedor().getId().equals(cliente.getId())) {
            throw new IllegalArgumentException("Você não pode adicionar seu próprio produto no carrinho");
        }

        if (produto.getEstoque() < dto.getQuantidade()) {
            throw new IllegalArgumentException("Estoque insuficiente");
        }

        Carrinho carrinho = carrinhoRepository.findByCliente(cliente)
                .orElseGet(() -> {
                        Carrinho novo = new Carrinho();
                        novo.setCliente(cliente);
                        novo.setStatus("ABERTO");
                        return carrinhoRepository.save(novo);
                });
        Optional<ItemCarrinho> itemExistente = itemCarrinhoRepository
                .findByCarrinhoAndProduto(carrinho, produto);
        if (itemExistente.isPresent()) {
            ItemCarrinho item = itemExistente.get();
            int novaQuantidade = item.getQuantidade() + dto.getQuantidade();
            if (novaQuantidade > produto.getEstoque()) {
                throw new IllegalArgumentException("Estoque insuficiente");
            }
            item.setQuantidade(novaQuantidade);
            itemCarrinhoRepository.save(item);
        } else {
            if (dto.getQuantidade() > produto.getEstoque()) {
                throw new IllegalArgumentException("Estoque insuficiente");
            }
            ItemCarrinho novoItem = new ItemCarrinho();
            novoItem.setCarrinho(carrinho);
            novoItem.setProduto(produto);
            novoItem.setQuantidade(dto.getQuantidade());
            itemCarrinhoRepository.save(novoItem);
        }
        Carrinho carrinhoAtualizado = carrinhoRepository.findById(carrinho.getId()).orElseThrow();
        List<ItemCarrinhoResponseDto> itensDto = carrinhoAtualizado.getItens() != null
                ? carrinhoAtualizado.getItens().stream()
                .map(i -> new ItemCarrinhoResponseDto(
                        i.getProduto().getId(),
                        i.getProduto().getNome(),
                        i.getProduto().getPreco(),
                        i.getQuantidade()
                )).toList()
                : List.of();
        return new CarrinhoResponseDto(
                carrinhoAtualizado.getId(),
                carrinhoAtualizado.getStatus(),
                emailCliente,
                itensDto
        );
    }
}
