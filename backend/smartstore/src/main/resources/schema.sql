-- VIEW
CREATE OR REPLACE VIEW public.vw_produtos_catalogo AS
SELECT
    p.id,
    p.nome,
    p.preco,
    p.estoque,
    p.imagem_url,
    c.nome AS categoria_nome,
    m.nome AS marca_nome
FROM produtos p
JOIN categoria c ON p.id_categoria = c.id
JOIN marcas m ON p.id_marca = m.id;