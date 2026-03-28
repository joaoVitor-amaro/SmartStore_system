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
            Categoria eletronicos = categoriaRepository.save(new Categoria("ELETRONICOS"));
            Categoria moveis = categoriaRepository.save(new Categoria("MOVEIS"));
            Categoria roupas = categoriaRepository.save(new Categoria("ROUPAS"));
            Categoria remedios = categoriaRepository.save(new Categoria("REMEDIOS"));
            Categoria eletrodomesticos = categoriaRepository.save(new Categoria("ELETRODOMESTICOS"));
            if (marcaRepository.count() == 0) {

                // eletrônicos
                marcaRepository.save(new Marca("Samsung", eletronicos));
                marcaRepository.save(new Marca("Apple", eletronicos));
                marcaRepository.save(new Marca("Sony", eletronicos));
                marcaRepository.save(new Marca("LG", eletronicos));
                marcaRepository.save(new Marca("Dell", eletronicos));

                // móveis
                marcaRepository.save(new Marca("Tok&Stok", moveis));
                marcaRepository.save(new Marca("Etna", moveis));
                marcaRepository.save(new Marca("Ikea", moveis));
                marcaRepository.save(new Marca("Casas Bahia", moveis));
                marcaRepository.save(new Marca("MadeiraMadeira", moveis));

                // roupas
                marcaRepository.save(new Marca("Nike", roupas));
                marcaRepository.save(new Marca("Adidas", roupas));
                marcaRepository.save(new Marca("Hering", roupas));
                marcaRepository.save(new Marca("Renner", roupas));
                marcaRepository.save(new Marca("Levi's", roupas));

                // remédios
                marcaRepository.save(new Marca("Sanofi", remedios));
                marcaRepository.save(new Marca("Novartis", remedios));
                marcaRepository.save(new Marca("EMS", remedios));
                marcaRepository.save(new Marca("Roche", remedios));
                marcaRepository.save(new Marca("Ache", remedios));

                // eletrodomésticos
                marcaRepository.save(new Marca("Brastemp", eletrodomesticos));
                marcaRepository.save(new Marca("Electrolux", eletrodomesticos));
                marcaRepository.save(new Marca("Philco", eletrodomesticos));
                marcaRepository.save(new Marca("Panasonic", eletrodomesticos));
                marcaRepository.save(new Marca("Mondial", eletrodomesticos));
            }
        }
    }
}
