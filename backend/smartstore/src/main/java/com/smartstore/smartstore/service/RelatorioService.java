package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.ProdutoRelatorioDTO;
import com.smartstore.smartstore.dto.RelatorioVendedorDTO;
import com.smartstore.smartstore.dto.ResumoDTO;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.model.ItemCompra;
import com.smartstore.smartstore.model.Produto;
import com.smartstore.smartstore.repository.ClienteRepository;
import com.smartstore.smartstore.repository.ItemCompraRepository;
import com.smartstore.smartstore.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List; // 👈 esse era o import errado (estava importando java.awt.List)

@Service
public class RelatorioService {
    private ItemCompraRepository itemCompraRepository;
    private ProdutoRepository produtoRepository;
    private ClienteRepository clienteRepository;

    public RelatorioService(ItemCompraRepository itemCompraRepository, ProdutoRepository produtoRepository, ClienteRepository clienteRepository) {
        this.itemCompraRepository = itemCompraRepository;
        this.produtoRepository = produtoRepository;
        this.clienteRepository = clienteRepository;
    }

    public RelatorioVendedorDTO gerarRelatorio(String email) {

        Cliente vendedor = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Vendedor não encontrado"));

        List<Produto> produtos = produtoRepository.findByVendedor(vendedor);

        List<ProdutoRelatorioDTO> produtosDTO = produtos.stream().map(p -> {

            List<ItemCompra> itens = itemCompraRepository
                    .findByProdutoAndCompra_Status(p, "APROVADO");

            int qtdVendida = itens.stream()
                    .mapToInt(ItemCompra::getQuantidade).sum();

            double receita = itens.stream()
                    .mapToDouble(i -> i.getQuantidade() * i.getPreco()).sum();

            return new ProdutoRelatorioDTO(
                    p.getNome(),
                    p.getCategoria().getNome(),
                    p.getMarca().getNome(),
                    p.getPreco(),
                    p.getEstoque(),
                    qtdVendida,
                    receita
            );

        }).toList();

        int totalVendidos    = produtosDTO.stream().mapToInt(ProdutoRelatorioDTO::getQuantidadeVendida).sum();
        double receitaTotal  = produtosDTO.stream().mapToDouble(ProdutoRelatorioDTO::getReceitaGerada).sum();
        double ticketMedio   = totalVendidos > 0 ? receitaTotal / totalVendidos : 0;

        ResumoDTO resumo = new ResumoDTO(
                vendedor.getNome(),
                produtos.size(),
                totalVendidos,
                receitaTotal,
                ticketMedio
        );

        return new RelatorioVendedorDTO(resumo, produtosDTO);
    }
}