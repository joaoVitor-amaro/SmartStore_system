package com.smartstore.smartstore.repository;

import com.smartstore.smartstore.enums.TokenStatus;
import com.smartstore.smartstore.model.PasswordResetToken;
import com.smartstore.smartstore.service.PasswordResetService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    List<PasswordResetToken> findByStatusAndExpiracaoBefore(TokenStatus status, LocalDateTime data);
}
