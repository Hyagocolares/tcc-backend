Agora que analisei todos os controllers, vou apresentar um resumo detalhado de cada um deles e suas funcionalidades:

1. **AuthController**
- Gerencia autenticação e autorização
- Métodos:
  - `register`: Registra novos usuários, criptografa senha e envia email de boas-vindas
  - `login`: Autentica usuários e gera token JWT
  - `getProfile`: Obtém perfil do usuário autenticado
  - `finalizeRegistration`: Finaliza o registro inicial do usuário

2. **UserController**
- Gerencia operações relacionadas a usuários
- Métodos:
  - `createUser`: Cria novo usuário
  - `getAllUsers`: Lista todos os usuários
  - `getUserById`: Busca usuário por ID
  - `updateUser`: Atualiza dados do usuário
  - `deleteUser`: Remove usuário
  - `findByEmail`: Busca usuário por email
  - `searchUsers`: Pesquisa usuários com filtros
  - `getTeachers`: Lista todos os professores
  - `getCoordinator`: Obtém o coordenador

3. **RequestController**
- Gerencia solicitações do sistema
- Métodos:
  - `createRequest`: Cria nova solicitação
  - `getAllRequests`: Lista todas as solicitações
  - `getRequestById`: Busca solicitação por ID
  - `updateRequest`: Atualiza solicitação
  - `deleteRequest`: Remove solicitação
  - `updateRequestStatus`: Atualiza status da solicitação
  - `searchRequests`: Pesquisa solicitações
  - `getPaginatedRequests`: Lista solicitações paginadas
  - `getPaginatedRequestsByMe`: Lista solicitações do usuário atual paginadas

4. **TeacherConsentDisciplineController**
- Gerencia consentimentos de professores para disciplinas
- Métodos:
  - `createConsent`: Cria novo consentimento
  - `getConsentById`: Busca consentimento por ID
  - `getAllConsents`: Lista todos os consentimentos
  - `updateConsent`: Atualiza consentimento
  - `deleteConsent`: Remove consentimento
  - `getConsentsByUserId`: Busca consentimentos por ID do usuário
  - `getRequestsByTeacherId`: Lista solicitações por professor
  - `getAllRequestsWithTeachers`: Lista todas as solicitações com professores

5. **DisciplineController**
- Gerencia operações de disciplinas
- Métodos:
  - `createDiscipline`: Cria nova disciplina
  - `getAllDisciplines`: Lista todas as disciplinas
  - `getDisciplineById`: Busca disciplina por ID
  - `updateDiscipline`: Atualiza disciplina
  - `deleteDiscipline`: Remove disciplina
  - `searchDisciplines`: Pesquisa disciplinas

6. **CourseController**
- Gerencia operações de cursos
- Métodos:
  - `createCourse`: Cria novo curso
  - `getAllCourses`: Lista todos os cursos
  - `getCourseById`: Busca curso por ID
  - `updateCourse`: Atualiza curso
  - `deleteCourse`: Remove curso
  - `searchCourses`: Pesquisa cursos

7. **PasswordController**
- Gerencia operações relacionadas a senhas
- Métodos:
  - `requestPasswordReset`: Solicita reset de senha
  - `resetPassword`: Realiza o reset da senha

8. **StatusRequestController**
- Gerencia status das solicitações
- Métodos:
  - `createStatusRequest`: Cria novo status
  - `getAllStatusRequests`: Lista todos os status
  - `getStatusRequestById`: Busca status por ID
  - `updateStatusRequest`: Atualiza status
  - `deleteStatusRequest`: Remove status

9. **ConsentController**
- Gerencia consentimentos gerais
- Métodos:
  - `createConsent`: Cria novo consentimento
  - `getAllConsents`: Lista todos os consentimentos
  - `getConsentById`: Busca consentimento por ID
  - `updateConsent`: Atualiza consentimento
  - `deleteConsent`: Remove consentimento
  - `searchConsents`: Pesquisa consentimentos

Todos os controllers seguem um padrão similar de implementação, utilizando repositories para acesso aos dados e incluindo tratamento de erros através do `exceptionRouter`. A maioria implementa operações CRUD básicas (Create, Read, Update, Delete) e algumas funcionalidades específicas para suas áreas de responsabilidade.