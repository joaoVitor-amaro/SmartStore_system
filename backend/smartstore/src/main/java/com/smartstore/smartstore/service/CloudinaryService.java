package com.smartstore.smartstore.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Service
public class CloudinaryService {

    private static final String PASTA_CLOUD = "produtos";

    private final String cloudName;
    private final String apiKey;
    private final String apiSecret;

    public CloudinaryService(@Value("${cloudinary.cloud-name:}") String cloudName,
                             @Value("${cloudinary.api-key:}") String apiKey,
                             @Value("${cloudinary.api-secret:}") String apiSecret) {
        this.cloudName = cloudName;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public boolean estaConfigurado() {
        return cloudName != null && !cloudName.isBlank()
                && apiKey != null && !apiKey.isBlank()
                && apiSecret != null && !apiSecret.isBlank();
    }

    public String upload(byte[] bytes, String nomeOriginal) throws Exception {
        if (!estaConfigurado()) {
            throw new IllegalStateException("Cloudinary não configurado (CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET)");
        }

        String credenciais = Base64.getEncoder().encodeToString(
                (apiKey + ":" + apiSecret).getBytes(StandardCharsets.UTF_8)
        );

        MultipartBodyBuilder body = new MultipartBodyBuilder();
        body.part("file", new ByteArrayResource(bytes) {
            @Override
            public String getFilename() {
                return nomeOriginal;
            }
        });
        body.part("folder", PASTA_CLOUD);

        RestClient client = RestClient.builder().build();

        @SuppressWarnings("unchecked")
        Map<String, Object> resultado = client.post()
                .uri("https://api.cloudinary.com/v1_1/{cloud_name}/image/upload", cloudName)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header(HttpHeaders.AUTHORIZATION, "Basic " + credenciais)
                .body(body.build())
                .retrieve()
                .body(Map.class);

        if (resultado == null || resultado.get("secure_url") == null) {
            throw new RuntimeException("Falha no upload para o Cloudinary: " + resultado);
        }

        return (String) resultado.get("secure_url");
    }
}