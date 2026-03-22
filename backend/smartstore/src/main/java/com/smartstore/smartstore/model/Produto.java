package com.smartstore.smartstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private Double preco;

    @Column(nullable = false)
    private Integer estoque;

    private String imagemUrl;

    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    private Cliente vendedor;

    @ManyToOne
    @JoinColumn(name = "idMarca", nullable = false)
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    private Categoria categoria;

    @OneToMany(mappedBy = "produto")
    private List<ItemCarrinho> itemCarrinhos;

    @OneToMany(mappedBy = "produto")
    private List<ItemCompra> itemCompras;

}
