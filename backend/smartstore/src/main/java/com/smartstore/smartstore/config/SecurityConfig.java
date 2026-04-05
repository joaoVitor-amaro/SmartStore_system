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
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtService jwtService;
    private final CorsConfigurationSource corsConfigurationSource; // <-- adicione

    public SecurityConfig(JwtService jwtService, CorsConfigurationSource corsConfigurationSource) { // <-- adicione
        this.jwtService = jwtService;
        this.corsConfigurationSource = corsConfigurationSource; // <-- adicione
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource)) // <-- altere
                .csrf(csrf -> csrf.disable())
                .sessionManagement(s -> s
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login", "/cliente/cadastro").permitAll()
                        .requestMatchers("/imagens/**").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        .requestMatchers(HttpMethod.GET,
                                "/categorias",
                                "/categorias/**",
                                "/api/categorias",
                                "/api/categorias/**",
                                "/marcas",
                                "/marcas/**",
                                "/api/marcas",
                                "/api/marcas/**",
                                "/produtos/home",
                                "/produtos/buscar",
                                "/produtos/categoria/**",
                                "/produtos/*"
                        ).permitAll()

                        .requestMatchers(HttpMethod.POST, "/produtos/cadastro").authenticated()
                        .requestMatchers(HttpMethod.POST, "/carrinho/adicionar").authenticated()
                        .requestMatchers(HttpMethod.GET, "/carrinho").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/carrinho/item/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/carrinho/item/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/cliente/me").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/cliente/atualizar").authenticated()
                        .requestMatchers(HttpMethod.POST, "/finalizar").authenticated()
                        .requestMatchers(HttpMethod.GET, "/produtos/*/avaliacoes").permitAll()
                        .requestMatchers(HttpMethod.POST, "/produtos/*/avaliacoes").authenticated()
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