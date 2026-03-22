package com.smartstore.smartstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "itens_compra")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer quantidade;
    @Column(nullable = false)
    private Double preco;
    @ManyToOne
    @JoinColumn(name = "idCompra", nullable = false)
    private Compra compra;
    @ManyToOne
    @JoinColumn(name = "idProduto", nullable = false)
    private Produto produto;
}
