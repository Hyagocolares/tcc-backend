# Middlewares do Sistema

Esta pasta contém os middlewares utilizados na aplicação.

## authMiddleware.ts

Middleware de autenticação que gerencia tokens JWT. Contém as seguintes funções:

- **authenticate**: Middleware que verifica a autenticação do usuário
  - Verifica a presença do token no header
  - Valida o token JWT
  - Adiciona o ID do usuário ao request

- **encodeTokenUser**: Gera token JWT para usuário
  - Recebe ID e email do usuário
  - Gera token com expiração configurável

- **createTokenUser**: Similar ao encodeTokenUser, específico para usuários recém-criados

- **decodeToken**: Decodifica o token JWT do request
  - Verifica a presença do token
  - Decodifica e valida o token
  - Adiciona dados do usuário ao request

- **generateResetToken**: Gera token específico para reset de senha
  - Token com expiração de 15 minutos
  - Usado no processo de recuperação de senha

## error.middleware.ts

Middleware para tratamento global de erros:

- **errorHandler**: Função que captura e trata erros não tratados
  - Loga o erro no console
  - Retorna resposta padronizada de erro
  - Em ambiente de desenvolvimento, inclui detalhes do erro
  - Em produção, retorna apenas mensagem genérica 