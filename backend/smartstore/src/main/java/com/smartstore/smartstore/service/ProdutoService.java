package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.ProdutoCreateRequestDto;
import com.smartstore.smartstore.dto.ProdutoCreateResponseDto;
import com.smartstore.smartstore.dto.ProdutoHomeResponseDto;
import com.smartstore.smartstore.model.Categoria;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.model.Marca;
import com.smartstore.smartstore.model.Produto;
import com.smartstore.smartstore.repository.CategoriaRepository;
import com.smartstore.smartstore.repository.ClienteRepository;
import com.smartstore.smartstore.repository.MarcaRepository;
import com.smartstore.smartstore.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProdutoService {
    private static final String PASTA_UPLOAD = "uploads/produtos/";
    private final ProdutoRepository produtoRepository;
    private final ClienteRepository clienteRepository;
    private final MarcaRepository marcaRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository produtoRepository, ClienteRepository clienteRepository, MarcaRepository marcaRepository, CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.clienteRepository = clienteRepository;
        this.marcaRepository = marcaRepository;
        this.categoriaRepository = categoriaRepository;
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

    public ProdutoCreateResponseDto cadastrar(ProdutoCreateRequestDto produtoDto, String emailCliente) throws Exception {
        Optional<Cliente> clienteOpt = clienteRepository.findByEmail(emailCliente);
        if (clienteOpt.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }
        Cliente cliente = clienteOpt.get();
        Marca marca = marcaRepository.findById(produtoDto.getMarcaId()).orElseThrow();
        Categoria categoria = categoriaRepository.findById(produtoDto.getCategoriaId()).orElseThrow();
        Produto produto = new Produto();
        produto.setNome(produtoDto.getNome());
        produto.setDescricao(produtoDto.getDescricao());
        produto.setPreco(produtoDto.getPreco());
        produto.setEstoque(produtoDto.getEstoque());
        produto.setLocal_fabricado(produtoDto.getFabricadoEm());
        produto.setVendedor(cliente);
        produto.setMarca(marca);
        produto.setCategoria(categoria);
        if (produtoDto.getImagem() != null && !produtoDto.getImagem().isEmpty()) {
            String urlImagem = salvarImagem(produtoDto.getImagem());
            produto.setImagemUrl(urlImagem);
        }
        produtoRepository.save(produto);
        return new ProdutoCreateResponseDto(produtoDto, emailCliente);
    }

    private String salvarImagem(MultipartFile imagem) throws Exception {
        String nomeArquivo = UUID.randomUUID() + "_" + imagem.getOriginalFilename();
        Path caminho = Paths.get(PASTA_UPLOAD + nomeArquivo);
        Files.createDirectories(caminho.getParent());
        Files.write(caminho, imagem.getBytes());
        return "http://localhost:8080/imagens/" + nomeArquivo;

    }
}