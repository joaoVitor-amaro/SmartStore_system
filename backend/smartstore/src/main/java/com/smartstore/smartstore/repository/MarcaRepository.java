package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
    List<Marca> findByCategoriaId(Long categoriaId);
}
    