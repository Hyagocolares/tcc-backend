# Utilitários do Sistema

Esta pasta contém funções utilitárias utilizadas em toda a aplicação.

## formatRequest.ts

Utilitário para formatação de solicitações (requests). Função `formatRequest` que:

- Formata dados da solicitação para exibição
- Inclui:
  - ID da solicitação
  - Status
  - Data de criação
  - Dados do usuário (ID e nome)
  - Assuntos relacionados
  - Localizações
  - Cursos relacionados
- Remove dados sensíveis e desnecessários
- Estrutura os dados de forma hierárquica

## utilsRequest.ts

Utilitário para tratamento de erros nas requisições. Contém:

- **Tipo ErrorRequest**:
  ```typescript
  {
    status: 'error',
    message: string,
    error?: string
  }
  ```

- **Função exceptionRouter**:
  - Trata exceções não capturadas
  - Registra stack trace do erro
  - Gera mensagem de erro padronizada
  - Inclui detalhes do erro apenas em ambiente de desenvolvimento
  - Retorna status 500 com resposta formatada
  - Loga o erro no console 