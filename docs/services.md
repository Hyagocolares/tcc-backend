# Serviços do Sistema

Esta pasta contém os serviços utilizados na aplicação.

## emailService.ts

Serviço responsável pelo envio de emails do sistema. Utiliza o Nodemailer com configurações do Mailtrap.

### Funções Disponíveis:

1. **sendWelcomeEmail**
   - Envia email de boas-vindas para novos usuários
   - Inclui dados de acesso (email e senha)
   - Formato em texto e HTML
   - Personalizado com nome do usuário

2. **sendResetPasswordEmail**
   - Envia email para recuperação de senha
   - Inclui link com token de reset
   - Link válido por 15 minutos
   - Formato em texto e HTML

3. **sendRequestTeacherEmail**
   - Envia notificação para professores sobre novas solicitações
   - Em desenvolvimento (template vazio)

4. **sendRequestCoordinatorEmail**
   - Envia notificação para coordenadores sobre novas solicitações
   - Em desenvolvimento (template vazio)

5. **sendRequestDirectorEmail**
   - Envia notificação para diretores sobre novas solicitações
   - Em desenvolvimento (template vazio)

### Configurações:
- Utiliza Mailtrap para ambiente de desenvolvimento
- Configurações de SMTP definidas no environment.ts
- Tratamento de erros com logs
- Templates HTML e texto plano para compatibilidade 