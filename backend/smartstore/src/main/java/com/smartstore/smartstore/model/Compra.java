package com.smartstore.smartstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "compras")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double valorTotal;

    @Column(nullable = false)
    private LocalDateTime data;

    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    private Cliente cliente;

    @OneToOne
    @JoinColumn(name = "idCarrinho", nullable = false)
    private Carrinho carrinho;

    @OneToMany(mappedBy = "compra", cascade = CascadeType.ALL)
    private List<ItemCompra> itens;
}
