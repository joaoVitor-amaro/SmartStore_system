package com.smartstore.smartstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'N'")
    private Character torceFlamengo;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'N'")
    private Character assisteOnePiece;

    @Column(columnDefinition = "CHAR(1) DEFAULT 'N'")
    private Character deSousa;

    @Column(nullable = false)
    private String senha;

    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;

    @OneToMany(mappedBy = "vendedor")
    private List<Produto> produtos;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Carrinho> carrinhos;  // era: private Carrinho carrinho

    @OneToMany(mappedBy = "cliente")
    private List<Compra> compras;

    public Cliente(String nome, String email, Character torceFlamengo, Character assisteOnePiece, Character deSousa, String senha, String cep, String rua, String numero, String bairro, String cidade, String estado) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.torceFlamengo = torceFlamengo;
        this.assisteOnePiece = assisteOnePiece;
        this.deSousa = deSousa;
        this.senha = senha;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
    }

    public Cliente( String nome, String email, String cep, String rua, String numero, String bairro, String cidade, String estado) {
        this.nome = nome;
        this.email = email;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
    }
}
