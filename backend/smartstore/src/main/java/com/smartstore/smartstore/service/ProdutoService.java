package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.ProdutoDetalheResponseDto;
import com.smartstore.smartstore.dto.ProdutoHomeResponseDto;
import com.smartstore.smartstore.model.Produto;
import com.smartstore.smartstore.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<ProdutoHomeResponseDto> listarProdutosHome() {
        List<Produto> produtos = produtoRepository.findAll();

        return produtos.stream()
                .map(p -> new ProdutoHomeResponseDto(
                        p.getId(),
                        p.getNome(),
                        p.getPreco(),
                        p.getImagemUrl(),
                        p.getCategoria() != null ? p.getCategoria().getNome() : ""
                ))
                .toList();
    }

    public ProdutoDetalheResponseDto buscarDetalhePorId(Long id) {
        Produto p = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        return new ProdutoDetalheResponseDto(
                p.getId(),
                p.getNome(),
                p.getPreco(),
                p.getImagemUrl(),
                p.getCategoria() != null ? p.getCategoria().getNome() : "",
                p.getDescricao(),
                p.getLocal_fabricado(),
                p.getMarca() != null ? p.getMarca().getNome() : "",
                p.getEstoque()
        );
    }
}