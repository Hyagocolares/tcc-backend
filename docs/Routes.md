Aqui está um resumo detalhado de todas as rotas do sistema:

1. **authRoutes**
- Rotas de autenticação
- Endpoints:
  - POST `/register`: Registro de novos usuários
  - POST `/login`: Login de usuários
  - GET `/profile`: Obter perfil do usuário
  - PUT `/finalize-register`: Finalizar registro inicial

2. **userRoutes**
- Rotas de gerenciamento de usuários
- Endpoints:
  - GET `/teachers`: Listar professores
  - GET `/coordinator`: Obter coordenador
  - GET `/search`: Pesquisar usuários
  - POST `/`: Criar usuário
  - GET `/`: Listar todos os usuários
  - GET `/:id`: Obter usuário por ID
  - PUT `/:id`: Atualizar usuário
  - DELETE `/:id`: Deletar usuário

3. **requestRoutes**
- Rotas de solicitações
- Endpoints:
  - GET `/paginated`: Listar solicitações paginadas
  - GET `/`: Listar todas as solicitações
  - POST `/`: Criar solicitação
  - GET `/:id`: Obter solicitação por ID
  - PUT `/:id`: Atualizar solicitação
  - DELETE `/:id`: Deletar solicitação
  - PATCH `/:id/status`: Atualizar status da solicitação

4. **teacherConsentDisciplineRoutes**
- Rotas de consentimento de professores para disciplinas
- Endpoints:
  - GET `/requests/teacher/:teacherId`: Listar solicitações por professor
  - GET `/requests/user/:userId`: Listar consentimentos por usuário
  - GET `/requests/all-with-teachers`: Listar todas as solicitações com professores
  - GET `/`: Listar todos os consentimentos
  - POST `/`: Criar consentimento
  - GET `/:id`: Obter consentimento por ID
  - PUT `/:id`: Atualizar consentimento
  - DELETE `/:id`: Deletar consentimento

5. **disciplineRoutes**
- Rotas de disciplinas
- Endpoints:
  - POST `/`: Criar disciplina
  - GET `/`: Listar todas as disciplinas
  - GET `/:id`: Obter disciplina por ID
  - PUT `/:id`: Atualizar disciplina
  - DELETE `/:id`: Deletar disciplina

6. **courseRoutes**
- Rotas de cursos
- Endpoints:
  - POST `/`: Criar curso
  - GET `/`: Listar todos os cursos
  - GET `/:id`: Obter curso por ID
  - PUT `/:id`: Atualizar curso
  - DELETE `/:id`: Deletar curso

7. **passwordRoutes**
- Rotas de gerenciamento de senhas
- Endpoints:
  - POST `/password-reset`: Solicitar reset de senha
  - POST `/`: Realizar reset de senha

8. **statusRequestRoutes**
- Rotas de status das solicitações
- Endpoints:
  - POST `/`: Criar status
  - GET `/`: Listar todos os status
  - GET `/:id`: Obter status por ID
  - PUT `/:id`: Atualizar status
  - DELETE `/:id`: Deletar status

9. **consentRoutes**
- Rotas de consentimentos gerais
- Endpoints:
  - POST `/`: Criar consentimento
  - GET `/`: Listar todos os consentimentos
  - GET `/:id`: Obter consentimento por ID
  - PUT `/:id`: Atualizar consentimento
  - DELETE `/:id`: Deletar consentimento

Observações importantes:
1. Todas as rotas (exceto auth) utilizam o middleware de autenticação (`authenticate`)
2. A maioria das rotas segue o padrão RESTful
3. As rotas estão organizadas por domínio/entidade
4. Todas as rotas retornam respostas JSON
5. Os endpoints seguem convenções de nomenclatura consistentes
