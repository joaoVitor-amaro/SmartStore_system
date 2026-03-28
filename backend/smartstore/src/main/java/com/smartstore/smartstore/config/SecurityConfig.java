package com.smartstore.smartstore.config;

import com.smartstore.smartstore.security.JwtFilter;
import com.smartstore.smartstore.security.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private JwtService jwtService;

    public SecurityConfig(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(s -> s
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/auth/login",
                                "/cliente/cadastro"
                        ).permitAll()

                        // liberar imagens
                        .requestMatchers("/imagens/**").permitAll()

                        .requestMatchers(
                                "/marcas",
                                "/marcas/**",
                                "/api/marcas",
                                "/api/marcas/**",
                                "/categorias",
                                "/categorias/**",
                                "/api/categorias",
                                "/api/categorias/**",
                                "/produtos/*/avaliacoes",
                                "/produtos/home",
                                "/produtos/buscar",
                                "/produtos/categoria/**",
                                "/produtos/*",
                                "/imagens/**",
                                "/cliente/cadastro",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        new JwtFilter(jwtService),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
