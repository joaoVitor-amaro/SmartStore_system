package com.smartstore.smartstore.service;

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
                        p.getNome(),
                        p.getPreco(),
                        p.getImagemUrl(),
                        p.getCategoria().getNome()
                ))
                .toList();
    }
}