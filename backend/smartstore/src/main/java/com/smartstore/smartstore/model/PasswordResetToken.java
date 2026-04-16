package com.smartstore.smartstore.model;

import com.smartstore.smartstore.enums.TokenStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_token")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String token;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Cliente cliente;
    @Column(nullable = false)
    private LocalDateTime expiracao;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TokenStatus status = TokenStatus.ATIVO;
}
