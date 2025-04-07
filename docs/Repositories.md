Aqui está um resumo detalhado de todos os repositórios e suas funcionalidades:

1. **IUserRepository / UserRepository**
- Gerencia operações de usuários no banco de dados
- Métodos:
  - `createUser`: Cria novo usuário
  - `getUserById`: Busca usuário por ID
  - `getAllUsers`: Lista todos os usuários
  - `updateUser`: Atualiza dados do usuário
  - `deleteUser`: Remove usuário
  - `findByEmail`: Busca usuário por email
  - `searchUsers`: Pesquisa usuários com critérios
  - `getTeachers`: Lista todos os professores

2. **IRequestRepository / RequestRepository**
- Gerencia operações de solicitações
- Métodos:
  - `createRequest`: Cria nova solicitação
  - `getRequestById`: Busca solicitação por ID
  - `getAllRequests`: Lista todas as solicitações
  - `updateRequest`: Atualiza solicitação
  - `deleteRequest`: Remove solicitação
  - `updateRequestStatus`: Atualiza status da solicitação
  - `searchRequests`: Pesquisa solicitações com critérios

3. **ITeacherConsentDisciplineRepository / TeacherConsentDisciplineRepository**
- Gerencia consentimentos de professores para disciplinas
- Métodos:
  - `createConsent`: Cria novo consentimento
  - `getConsentById`: Busca consentimento por ID
  - `getAllConsents`: Lista todos os consentimentos
  - `updateConsent`: Atualiza consentimento
  - `deleteConsent`: Remove consentimento

4. **IDisciplineRepository / DisciplineRepository**
- Gerencia operações de disciplinas
- Métodos:
  - `createDiscipline`: Cria nova disciplina
  - `getDisciplineById`: Busca disciplina por ID
  - `getAllDisciplines`: Lista todas as disciplinas
  - `updateDiscipline`: Atualiza disciplina
  - `deleteDiscipline`: Remove disciplina
  - `searchDisciplines`: Pesquisa disciplinas com critérios

5. **ICourseRepository / CourseRepository**
- Gerencia operações de cursos
- Métodos:
  - `createCourse`: Cria novo curso
  - `getCourseById`: Busca curso por ID
  - `getAllCourses`: Lista todos os cursos
  - `updateCourse`: Atualiza curso
  - `deleteCourse`: Remove curso
  - `searchCourses`: Pesquisa cursos com critérios

6. **IStatusRequestRepository / StatusRequestRepository**
- Gerencia status das solicitações
- Métodos:
  - `createStatusRequest`: Cria novo status
  - `findStatusRequestById`: Busca status por ID
  - `findAllStatusRequest`: Lista todos os status
  - `updateStatusRequest`: Atualiza status
  - `deleteStatusRequest`: Remove status

7. **IConsentRepository / ConsentRepository**
- Gerencia consentimentos gerais
- Métodos:
  - `createConsent`: Cria novo consentimento
  - `getConsentById`: Busca consentimento por ID
  - `getAllConsents`: Lista todos os consentimentos
  - `updateConsent`: Atualiza consentimento
  - `deleteConsent`: Remove consentimento
  - `searchConsents`: Pesquisa consentimentos com critérios

Observações importantes:
1. Todos os repositórios seguem o padrão de interface/implementação
2. As implementações são assíncronas (usando Promise)
3. Todos os métodos de busca podem retornar null/undefined quando não encontram resultados
4. Os métodos de atualização e criação aceitam dados parciais (Partial<T>)
5. A maioria dos repositórios implementa operações CRUD básicas
6. Alguns repositórios têm métodos adicionais específicos para suas necessidades (como search)
7. As implementações provavelmente usam um ORM (como TypeORM) para interagir com o banco de dados
