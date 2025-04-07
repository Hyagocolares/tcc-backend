# Configurações do Sistema

Esta pasta contém os arquivos de configuração do sistema.

## environment.ts

Arquivo responsável por gerenciar as variáveis de ambiente do sistema. Define configurações para:

- **Servidor**:
  - Host
  - Porta
  - Modo de operação (development/production)

- **Banco de Dados**:
  - Host
  - Porta
  - Nome
  - Schema
  - Usuário
  - Senha
  - Sincronização automática
  - Log de queries

- **Mailtrap** (Serviço de Email):
  - Host
  - Porta
  - Usuário
  - Senha
  - Email remetente

- **Frontend**:
  - URL base

## ormconfig.ts

Configuração do TypeORM (Object-Relational Mapping) para o sistema. Define:

- Conexão com o banco de dados PostgreSQL
- Entidades do sistema:
  - User (e suas subclasses: Teacher, Coordinator, Director)
  - Course
  - Request
  - Discipline
  - Consent (e suas subclasses)
  - Subject
  - StatusRequest
  - ItineraryItem
  - Resource
  - Location
  - TeacherConsentDiscipline
- Configurações de migrações
- Configurações de subscribers
- Modo de sincronização do banco
- Logging de queries 