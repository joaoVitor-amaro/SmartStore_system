package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.AvaliacaoRequestDto;
import com.smartstore.smartstore.dto.AvaliacaoResponseDto;
import com.smartstore.smartstore.dto.AvaliacaoResumoDto;
import com.smartstore.smartstore.model.Avaliacao;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.model.Produto;
import com.smartstore.smartstore.repository.AvaliacaoRepository;
import com.smartstore.smartstore.repository.ClienteRepository;
import com.smartstore.smartstore.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final ProdutoRepository produtoRepository;
    private final ClienteRepository clienteRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository,
                            ProdutoRepository produtoRepository,
                            ClienteRepository clienteRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.produtoRepository = produtoRepository;
        this.clienteRepository = clienteRepository;
    }

    public AvaliacaoResponseDto cadastrar(Long produtoId, AvaliacaoRequestDto dto) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Avaliacao avaliacao = new Avaliacao(
                dto.getNota(),
                dto.getComentario(),
                LocalDateTime.now(),
                produto,
                cliente
        );

        Avaliacao salva = avaliacaoRepository.save(avaliacao);

        return new AvaliacaoResponseDto(
                salva.getId(),
                salva.getNota(),
                salva.getComentario(),
                salva.getCliente().getNome(),
                salva.getDataCriacao()
        );
    }

    public AvaliacaoResumoDto buscarPorProduto(Long produtoId) {
        List<Avaliacao> avaliacoes = avaliacaoRepository.findByProdutoId(produtoId);

        int total = avaliacoes.size();
        double media = 0.0;

        if (total > 0) {
            media = avaliacoes.stream()
                    .mapToInt(Avaliacao::getNota)
                    .average()
                    .orElse(0.0);
        }

        int estrelas1 = 0;
        int estrelas2 = 0;
        int estrelas3 = 0;
        int estrelas4 = 0;
        int estrelas5 = 0;

        List<AvaliacaoResponseDto> comentarios = new ArrayList<>();

        for (Avaliacao a : avaliacoes) {
            switch (a.getNota()) {
                case 1 -> estrelas1++;
                case 2 -> estrelas2++;
                case 3 -> estrelas3++;
                case 4 -> estrelas4++;
                case 5 -> estrelas5++;
            }

            comentarios.add(new AvaliacaoResponseDto(
                    a.getId(),
                    a.getNota(),
                    a.getComentario(),
                    a.getCliente().getNome(),
                    a.getDataCriacao()
            ));
        }

        List<Integer> distribuicao = List.of(estrelas5, estrelas4, estrelas3, estrelas2, estrelas1);

        return new AvaliacaoResumoDto(media, total, distribuicao, comentarios);
    }
}