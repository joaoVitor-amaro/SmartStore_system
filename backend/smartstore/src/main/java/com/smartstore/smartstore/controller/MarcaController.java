package com.smartstore.smartstore.controller;


import com.smartstore.smartstore.dto.MarcaResponseDto;
import com.smartstore.smartstore.model.Marca;
import com.smartstore.smartstore.repository.MarcaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marcas")
@CrossOrigin(origins = "*")
public class MarcaController {

    private MarcaRepository marcaRepository;

    public MarcaController(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    @GetMapping("/categoria/{id}")
    public List<MarcaResponseDto> listarPorCategoria(@PathVariable Long id) {
        return marcaRepository.findByCategoriaId(id)
                .stream()
                .map(m -> new MarcaResponseDto(m.getId(), m.getNome()))
                .toList();
    }
}
