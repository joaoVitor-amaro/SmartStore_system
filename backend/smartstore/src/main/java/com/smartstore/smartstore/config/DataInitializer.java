package com.smartstore.smartstore.config;

import com.smartstore.smartstore.model.Categoria;
import com.smartstore.smartstore.model.Marca;
import com.smartstore.smartstore.repository.CategoriaRepository;
import com.smartstore.smartstore.repository.MarcaRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    private CategoriaRepository categoriaRepository;
    private MarcaRepository marcaRepository;

    public DataInitializer(CategoriaRepository categoriaRepository, MarcaRepository marcaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.marcaRepository = marcaRepository;
    }

    @PostConstruct
    public void init() {
        if (categoriaRepository.count() == 0) {
            categoriaRepository.save(new Categoria("ELETRONICOS"));
            categoriaRepository.save(new Categoria("MOVEIS"));
            categoriaRepository.save(new Categoria("ROUPAS"));
            categoriaRepository.save(new Categoria("REMEDIOS"));
            categoriaRepository.save(new Categoria("ELETRODOMESTICOS"));
        }
        if (marcaRepository.count() == 0) {
            // Marcas de eletrônicos
            marcaRepository.save(new Marca("Samsung"));
            marcaRepository.save(new Marca("Apple"));
            marcaRepository.save(new Marca("Sony"));
            marcaRepository.save(new Marca("LG"));
            marcaRepository.save(new Marca("Dell"));

            // Marcas de móveis
            marcaRepository.save(new Marca("Tok&Stok"));
            marcaRepository.save(new Marca("Etna"));
            marcaRepository.save(new Marca("Ikea"));
            marcaRepository.save(new Marca("Casas Bahia"));
            marcaRepository.save(new Marca("MadeiraMadeira"));

            // Marcas de roupas
            marcaRepository.save(new Marca("Nike"));
            marcaRepository.save(new Marca("Adidas"));
            marcaRepository.save(new Marca("Hering"));
            marcaRepository.save(new Marca("Renner"));
            marcaRepository.save(new Marca("Levi's"));

            // Marcas de remédios
            marcaRepository.save(new Marca("Sanofi"));
            marcaRepository.save(new Marca("Novartis"));
            marcaRepository.save(new Marca("EMS"));
            marcaRepository.save(new Marca("Roche"));
            marcaRepository.save(new Marca("Ache"));

            // Marcas de eletrodomésticos
            marcaRepository.save(new Marca("Brastemp"));
            marcaRepository.save(new Marca("Electrolux"));
            marcaRepository.save(new Marca("Philco"));
            marcaRepository.save(new Marca("Panasonic"));
            marcaRepository.save(new Marca("Mondial"));

        }
    }
}
