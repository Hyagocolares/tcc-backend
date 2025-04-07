Aqui está um resumo detalhado de todas as entidades do sistema:

1. **UserEntity**
- Entidade base para usuários do sistema
- Atributos principais:
  - `id`: Identificador único
  - `name`: Nome do usuário
  - `email`: Email único
  - `password`: Senha criptografada
  - `category`: Tipo de usuário (Teacher, Coordinator, Director)
  - `registration`: Matrícula (opcional)
  - `academicBackground`: Formação acadêmica (opcional)
  - `photoUrl`: URL da foto (opcional)
  - `isFirstLogin`: Flag de primeiro acesso
- Classes derivadas:
  - `Teacher`: Professor com relacionamentos com cursos e disciplinas
  - `Coordinator`: Coordenador com supervisão de cursos e disciplinas
  - `Director`: Diretor com consentimentos específicos

2. **RequestEntity**
- Entidade para solicitações
- Atributos principais:
  - `id`: Identificador único
  - `user`: Usuário que criou a solicitação
  - `companions`: Usuários acompanhantes
  - `status`: Status da solicitação (enum)
  - Relacionamentos:
    - `subjects`: Assuntos da solicitação
    - `locations`: Locais
    - `itinerary`: Itinerário
    - `resources`: Recursos necessários
    - `consent`: Consentimentos de professores
    - `coordinatorConsents`: Consentimentos de coordenadores
    - `directorConsents`: Consentimentos de diretores

3. **CourseEntity**
- Entidade para cursos
- Atributos principais:
  - `id`: Identificador único
  - `name`: Nome do curso
  - Relacionamentos:
    - `coordinators`: Coordenadores do curso
    - `teachers`: Professores do curso
    - `disciplines`: Disciplinas do curso

4. **DisciplineEntity**
- Entidade para disciplinas
- Atributos principais:
  - `id`: Identificador único
  - `name`: Nome da disciplina
  - `code`: Código da disciplina
  - `workload`: Carga horária
  - Relacionamentos:
    - `courses`: Cursos que contêm a disciplina
    - `teachers`: Professores da disciplina
    - `coordinators`: Coordenadores da disciplina
    - `consents`: Consentimentos relacionados

5. **ConsentEntity**
- Entidade base para consentimentos
- Atributos principais:
  - `id`: Identificador único
  - `accepted`: Status de aceitação
  - `signature`: Assinatura
  - `opinion`: Opinião (opcional)
- Classes derivadas:
  - `TeacherConsent`: Consentimento de professor
  - `CoordinatorConsent`: Consentimento de coordenador
  - `DirectorConsent`: Consentimento de diretor

6. **StatusRequestEntity**
- Entidade para histórico de status das solicitações
- Atributos principais:
  - `id`: Identificador único
  - `request`: Solicitação relacionada
  - `user`: Usuário que alterou o status
  - `name`: Nome do status
  - `comment`: Comentário (opcional)
  - `status`: Status atual (enum)

7. **RequestStatusEnum**
- Enumeração de status possíveis para solicitações:
  - `DRAFT`: Rascunho
  - `IN_PROGRESS`: Pendente
  - `PENDINGC`: Em análise
  - `APPROVED`: Aprovado
  - `REJECTED`: Rejeitado

Observações importantes:
1. Todas as entidades usam TypeORM para mapeamento objeto-relacional
2. A maioria das entidades inclui timestamps (createdAt e updatedAt)
3. Existe uma hierarquia clara de usuários (User -> Teacher/Coordinator/Director)
4. Os relacionamentos são bem definidos usando decorators do TypeORM
5. Há uso extensivo de herança para diferentes tipos de consentimentos
6. As entidades seguem boas práticas de modelagem de dados
7. Existe um sistema robusto de rastreamento de status para solicitações
