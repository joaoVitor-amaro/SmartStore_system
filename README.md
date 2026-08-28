# SmartStore

Sistema de e-commerce full stack, com backend em **Spring Boot (Java 21)** e frontend em **React + Vite**, totalmente containerizado com **Docker Compose**. Permite que usuários criem conta, cadastrem e vendam produtos, montem carrinho, finalizem compras e acompanhem seu histórico e relatórios de vendas.

## ✨ Funcionalidades

- **Autenticação e conta**
  - Cadastro e login de usuários com autenticação via **JWT**
  - Recuperação de senha por e-mail (fluxo "esqueci minha senha" com token de expiração)
  - Atualização de dados do cliente logado
- **Catálogo de produtos**
  - Listagem de produtos na home, por categoria e por busca
  - Página de detalhe do produto
  - Cadastro, edição e exclusão de produtos (upload de imagem via `multipart/form-data`)
  - Listagem de marcas (geral e por categoria) e categorias
- **Avaliações**
  - Cadastro de avaliações por produto e resumo (média/quantidade)
- **Carrinho de compras**
  - Adicionar, atualizar quantidade e remover itens
  - Consulta do carrinho do cliente autenticado
- **Compras**
  - Finalização de pedido (checkout) com aplicação de descontos
  - Histórico de "minhas compras"
- **Relatórios**
  - Relatório de vendas por vendedor (resumo e detalhamento por produto)
- **Outros**
  - Job agendado para expirar tokens de redefinição de senha
  - Endpoint de health check
  - Documentação de API via Swagger/OpenAPI (springdoc)

## 🛠️ Stack tecnológica

**Backend** (`backend/smartstore`)
- Java 21 + Spring Boot 4
- Spring Data JPA / Hibernate
- Spring Security + JWT (`jjwt`)
- Spring Mail (envio de e-mails)
- Spring Validation
- PostgreSQL (driver `org.postgresql`)
- springdoc-openapi (Swagger UI)
- Lombok
- Maven (via Maven Wrapper)

**Frontend** (`frontend`)
- React 19 + Vite
- React Router DOM
- Bootstrap 5 + Bootstrap Icons + React Icons
- jsPDF / jsPDF-AutoTable (geração de relatórios/comprovantes em PDF)
- ESLint

**Infraestrutura**
- Docker e Docker Compose (containers para PostgreSQL, backend e frontend)
- Nginx (servindo o build de produção do frontend)

## 📁 Estrutura do projeto

```
SmartStore_system/
├── backend/
│   └── smartstore/
│       ├── src/main/java/com/smartstore/smartstore/
│       │   ├── config/         # CORS, Web, Security, dados iniciais
│       │   ├── controller/     # Endpoints REST
│       │   ├── dto/            # Objetos de transferência de dados
│       │   ├── enums/
│       │   ├── exception/      # Tratamento global de exceções
│       │   ├── job/            # Jobs agendados (expiração de token)
│       │   ├── model/          # Entidades JPA
│       │   ├── repository/     # Repositórios Spring Data
│       │   ├── response/       # Wrapper padrão de resposta da API
│       │   ├── security/       # Filtro e serviço JWT
│       │   └── service/        # Regras de negócio
│       ├── src/main/resources/
│       │   ├── application.properties
│       │   └── schema.sql
│       ├── Dockerfile
│       └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/         # Header, filtros, card de produto, breadcrumb...
│   │   ├── hooks/               # Hooks customizados (ex: useCategorias)
│   │   ├── pages/               # Login, cadastro, home, carrinho, checkout,
│   │   │                        # pagamento, meus produtos, minhas compras...
│   │   └── App.jsx              # Rotas da aplicação
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── .env.example
```

## 🔌 Principais endpoints da API

| Recurso | Endpoint base | Descrição |
|---|---|---|
| Auth | `POST /auth/login`, `/auth/recuperar-senha`, `/auth/nova-senha` | Login e recuperação de senha |
| Cliente | `POST /cliente/cadastro`, `GET /cliente/me`, `PUT /cliente/atualizar` | Conta do usuário |
| Produtos | `GET /produtos/home`, `/produtos/buscar`, `/produtos/{id}`, `/produtos/categoria/{nome}`, `/produtos/meus`, `POST /produtos/cadastro`, `PUT /produtos/{id}`, `DELETE /produtos/{id}` | Catálogo e gestão de produtos |
| Categorias | `GET /api/categorias` | Lista de categorias |
| Marcas | `GET /marcas`, `GET /marcas/categoria/{id}` | Lista de marcas |
| Avaliações | `GET /produtos/{produtoId}/avaliacoes`, `POST /produtos/{produtoId}/avaliacoes` | Avaliações de produtos |
| Carrinho | `POST /carrinho/adicionar`, `GET /carrinho`, `GET /carrinho/me`, `PUT /carrinho/item/{idProduto}`, `DELETE /carrinho/item/{idProduto}` | Carrinho de compras |
| Compra | `POST /compra/finalizar`, `GET /compra/minhas` | Checkout e histórico |
| Relatório | `GET /relatorio` | Relatório de vendas do vendedor |
| Health | `GET /health` | Health check |

Com a aplicação rodando, a documentação interativa (Swagger UI) fica disponível em `http://localhost:8080/swagger-ui.html`.

## 🚀 Como executar

### Pré-requisitos
- [Docker](https://www.docker.com/) e Docker Compose
- (Para rodar sem Docker) Java 21, Maven e Node.js 22+

### Opção 1 — Docker Compose (recomendado)

1. Clone o repositório:
   ```bash
   git clone https://github.com/joaoVitor-amaro/SmartStore_system.git
   cd SmartStore_system
   ```

2. Copie o arquivo de variáveis de ambiente e preencha os valores:
   ```bash
   cp .env.example .env
   ```
   Variáveis principais (ver `.env.example`):
   ```
   POSTGRES_DB=
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/your_database_name
   SPRING_DATASOURCE_USERNAME=
   SPRING_DATASOURCE_PASSWORD=
   JWT_SECRET=
   ```
   O `docker-compose.yml` também espera `EMAIL_USERNAME`, `EMAIL_PASSWORD` (usados para envio de e-mail de recuperação de senha via SMTP do Gmail) e `APP_FRONTEND_URL` (URL do frontend usada nos links enviados por e-mail).

3. Suba os containers:
   ```bash
   docker compose up --build
   ```

4. Acesse:
   - Frontend: `http://localhost:3000`
   - Backend/API: `http://localhost:8080`
   - PostgreSQL: `localhost:5432`

### Opção 2 — Rodando localmente sem Docker

**Backend**
```bash
cd backend/smartstore
# configure as variáveis de ambiente (ou um application-local.properties)
./mvnw spring-boot:run
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Autenticação

A API utiliza tokens **JWT**. Após o login (`POST /auth/login`), o token retornado deve ser enviado no header `Authorization` das requisições autenticadas (ex.: `/cliente/me`, `/carrinho`, `/compra/finalizar`, `/produtos/meus`, `/relatorio`).

## 📄 Licença

Este projeto não possui licença definida no repositório. Caso pretenda reutilizá-lo, entre em contato com o autor.

## 👤 Autor

[João Vitor Amaro](https://github.com/joaoVitor-amaro)
[Eduardo Rodrigues](https://github.com/EduardooXz)
