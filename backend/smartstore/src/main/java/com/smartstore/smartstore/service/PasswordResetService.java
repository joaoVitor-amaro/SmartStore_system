package com.smartstore.smartstore.service;

import com.smartstore.smartstore.dto.NovaSenhaRequestDto;
import com.smartstore.smartstore.dto.RecuperarSenhaRequest;
import com.smartstore.smartstore.enums.TokenStatus;
import com.smartstore.smartstore.model.Cliente;
import com.smartstore.smartstore.model.PasswordResetToken;
import com.smartstore.smartstore.repository.ClienteRepository;
import com.smartstore.smartstore.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {
    @Value("${app.frontend.url}")
    private String urlFront;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final ClienteRepository clienteRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(PasswordResetTokenRepository passwordResetTokenRepository, ClienteRepository clienteRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.clienteRepository = clienteRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    public String gerarToken() {
        return UUID.randomUUID().toString();
    }

    public void processarRecuperacaoSenha(RecuperarSenhaRequest dto) {
        Cliente cliente = clienteRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontado"));
        String token = gerarToken();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setCliente(cliente);
        passwordResetToken.setExpiracao(LocalDateTime.now().plusMinutes(30));
        passwordResetTokenRepository.save(passwordResetToken);
        String link = this.urlFront+"/nova-senha?token="+token;

        emailService.sendMail(
                cliente.getEmail(),
                "Recuperação de senha - SmartStore",
                "Olá, " + cliente.getNome() + "!\n\n" +
                        "Recebemos uma solicitação para redefinir a senha da sua conta.\n\n" +
                        "Clique no link abaixo para criar uma nova senha:\n" +
                        link + "\n\n" +
                        "Este link expira em 30 minutos.\n\n" +
                        "Se você não solicitou a recuperação de senha, ignore este email.\n\n" +
                        "Equipe SmartStore"
        );
    }

    public void redefinirSenha(NovaSenhaRequestDto dto) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(dto.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Token inválido"));
        if (!(resetToken.getStatus() == TokenStatus.ATIVO && LocalDateTime.now().isBefore(resetToken.getExpiracao()))) {
            throw new IllegalArgumentException("Token inválido ou expirado");
        }
        Cliente cliente = resetToken.getCliente();
        cliente.setSenha(passwordEncoder.encode(dto.getSenha()));
        clienteRepository.save(cliente);
        resetToken.setStatus(TokenStatus.USADO);
        passwordResetTokenRepository.save(resetToken);
    }
}
