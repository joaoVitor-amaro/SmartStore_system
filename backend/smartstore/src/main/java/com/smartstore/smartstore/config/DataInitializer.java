package com.smartstore.smartstore.config;

import com.smartstore.smartstore.model.Categoria;
import com.smartstore.smartstore.model.Marca;
import com.smartstore.smartstore.repository.CategoriaRepository;
import com.smartstore.smartstore.repository.MarcaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {
    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final CategoriaRepository categoriaRepository;
    private final MarcaRepository marcaRepository;

    public DataInitializer(CategoriaRepository categoriaRepository, MarcaRepository marcaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.marcaRepository = marcaRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        try {
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
        } catch (Exception e) {
            log.warn("Nao foi possivel popular categorias/marcas: {}", e.getMessage());
        }
    }
}