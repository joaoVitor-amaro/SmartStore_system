package com.smartstore.smartstore.job;

import com.smartstore.smartstore.enums.TokenStatus;
import com.smartstore.smartstore.model.PasswordResetToken;
import com.smartstore.smartstore.repository.PasswordResetTokenRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class TokenExpiracaoJob {
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public TokenExpiracaoJob(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void expirarTokens() {
        List<PasswordResetToken> tokens = passwordResetTokenRepository.findByStatusAndExpiracaoBefore(
                TokenStatus.ATIVO,
                LocalDateTime.now()
        );
        tokens.forEach(t -> t.setStatus(TokenStatus.EXPIRADO));
        passwordResetTokenRepository.saveAll(tokens);
    }
}
