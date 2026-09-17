package com.smartstore.smartstore.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseFunctionInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseFunctionInitializer.class);

    private final JdbcTemplate jdbcTemplate;

    public DatabaseFunctionInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) {
        try {
            jdbcTemplate.execute("""
                CREATE OR REPLACE FUNCTION public.realizar_compra(
                    p_carrinho_id bigint,
                    p_valor_total numeric,
                    p_metodo_pagamento varchar
                )
                RETURNS bigint
                LANGUAGE plpgsql
                AS $$
                DECLARE
                    v_cliente_id BIGINT;
                    v_novo_id BIGINT;
                BEGIN

                    SELECT id_cliente INTO v_cliente_id
                    FROM carrinhos
                    WHERE id = p_carrinho_id;

                    INSERT INTO compras (
                        valor_total,
                        status,
                        data,
                        metodo_pagamento,
                        id_cliente,
                        id_carrinho
                    )
                    VALUES (
                        p_valor_total,
                        'APROVADO',
                        CURRENT_TIMESTAMP,
                        p_metodo_pagamento,
                        v_cliente_id,
                        p_carrinho_id
                    )
                    RETURNING id INTO v_novo_id;

                    INSERT INTO itens_compra (
                        quantidade,
                        preco,
                        id_compra,
                        id_produto
                    )
                    SELECT
                        ic.quantidade,
                        p.preco,
                        v_novo_id,
                        ic.id_produto
                    FROM itens_carrinho ic
                    JOIN produtos p ON p.id = ic.id_produto
                    WHERE ic.id_carrinho = p_carrinho_id;

                    UPDATE produtos p
                    SET estoque = estoque - ic.quantidade
                    FROM itens_carrinho ic
                    WHERE p.id = ic.id_produto
                    AND ic.id_carrinho = p_carrinho_id;

                    DELETE FROM itens_carrinho
                    WHERE id_carrinho = p_carrinho_id;

                    UPDATE carrinhos
                    SET status = 'FECHADO'
                    WHERE id = p_carrinho_id;

                    INSERT INTO carrinhos (status, id_cliente)
                    VALUES ('ABERTO', v_cliente_id);

                    RETURN v_novo_id;

                END;
                $$;
                """);
        } catch (Exception e) {
            log.warn("Nao foi possivel criar a function realizar_compra: {}", e.getMessage());
        }
    }
}