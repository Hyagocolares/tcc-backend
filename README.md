# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


nodemailer funcao do gmail.com google de enviar email desta forma.

# Prompt
# ---------------------------------------------------------------------------------------------------------------------------------------------

No arquivo api.routes.ts e onde terei acesso a todas as informações, tabelas, entidades etc do meu sistema, onde informações privadas vão estar, e como esta protegido e onde quero poder estabelecer uma certa questão, sobre o nível de acesso idealizado pelo campo category.
Onde cada user pode acessar essas rotas de api de acordo com sua categoria e nível de informação disponível.

Para isto preciso definir o que terá no meu sistema, quais as rotas e funções, os CRUDs etc.

Quero realizar um CRUD do Request(Requerimento), onde será necessário os campos para esta tabela e as tabelas que complementam o requerimento.

# ---------------------------------------------------------------------------------------------------------------------------------------------


User
Request
Discipline
Itinerary
OpinionUser
Resource
StatusRequest

# ---------------------------------------------------------------------------------------------------------------------------------------------

A Request em si, englobando todos os campos que ela vai usar, mesmo sendo outras tabelas, será da seguinte forma:

Descrever em detalhe como funcionará a Request completa e montada, onde ela vai ter as informações necessária, e então terá suas informações distribuídas para que sejam vistas de forma micro, detalhada, e assim funciona a Request, tendo status e estados de preenchimento e de confirmação, autorização e liberação.

As Request serão datadas, o inicio do processo ate a finalização, sendo autorizada ou rejeitada.

Devo melhorar as regras de negocio.


Preciso criar request, e os statuis dela, os estagios dela, e conforme ela for criada, ela podera ser modificada tendo atualizacao em partes com infromacoes de tabelas separadas que fazem parte da interacao do user, no caso teremos uma ligacao, mas a tabela estara vazia, entao e isso.

Precisamos criar outras rotas.

E a rota de finalizacao do cadastro de usuario, ver como fazer isso, como se fosse uma vcalidacao, o usuario foi todo preenchido, dai um campo dele diz sim ou nao, e isso sera o fator de quando o user logar ele tera de finalizar o cadastro.

# --------------------------------------------------------------------------------------------------------------------------------------------- 

Quero exemplos de CRUD de User, Course, Discipline, Consent, StatusRequest e Request para testes no Postman.

# ---------------------------------------------------------------------------------------------------------------------------------------------


Tenho aqui uma sequencia completa de código para CRUD de User:
Entitys: ""
Repositories: ""
IRepositories: ""
Controllers: ""
Routes: ""


# ---------------------------------------------------------------------------------------------------------------------------------------------


Depois da explicação reforce consertando a entitie/entity:
Pq a ideia de que a entity 'user' seja criar três tipos de usuários, (professor, coordenador e diretor).
A entity 'user' tem de ter seus campos comum, id, name, email, password, registration, category, photoUrl, createdAt e updatedAt.
Mas ja as outrroas extensoes que se extend o User, elas devem complementar com campos especificos delas mesmas, por exemplo, "consents", gostaria de ter para os tres tipos de usuarios, so que com nomes diferentes para utilizacao diferentes.
A entity 'user':professor tenha a relação de 1 ou N cursos, uma relação de 1 ou N consents, e tenha uma relação com 1 ou N disciplinas, e uma relação de 1 ou N com Request.
A entity 'user':coordenador tenha a relação de 1 ou N cursos, uma relação de 1 ou N consents, e tenha uma relação com 1 ou N disciplinas, e uma relação 1 ou N com Request.
A entity 'user':diretor tenha a relação de 1 ou N consents.
Somente isso. 
Baseado na ideia da entidade "User".


# ---------------------------------------------------------------------------------------------------------------------------------------------

Novamente fiz uma requisicao de get de todas as requests:
"🚀 START APPLICATION => { PORT: '3003', MODE: 'development' }
📥 [Controller] Solicitando todas as Requests
🔍 [Repository] Buscando todas as Requests
query: SELECT "Request"."id" AS "Request_id", "Request"."status" AS "Request_status", "Request"."created_at" AS "Request_created_at", "Request"."updated_at" AS "Request_updated_at", "Request"."userId" AS "Request_userId", "Request"."teacherId" AS "Request_teacherId", "Request"."coordinatorId" AS "Request_coordinatorId", "Request__Request_user"."id" AS "Request__Request_user_id", "Request__Request_user"."name" AS "Request__Request_user_name", "Request__Request_user"."email" AS "Request__Request_user_email", "Request__Request_user"."password" AS "Request__Request_user_password", "Request__Request_user"."registration" AS "Request__Request_user_registration", "Request__Request_user"."category" AS "Request__Request_user_category", "Request__Request_user"."photoUrl" AS "Request__Request_user_photoUrl", "Request__Request_user"."created_at" AS "Request__Request_user_created_at", "Request__Request_user"."updated_at" AS "Request__Request_user_updated_at", "Request__Request_user"."academicBackground" AS "Request__Request_user_academicBackground", "Request__Request_user"."supervision" AS "Request__Request_user_supervision", "Request__Request_user"."user_type" AS "Request__Request_user_user_type", "Request__Request_companions"."id" AS "Request__Request_companions_id", "Request__Request_companions"."name" AS "Request__Request_companions_name", "Request__Request_companions"."email" AS "Request__Request_companions_email", "Request__Request_companions"."password" AS "Request__Request_companions_password", "Request__Request_companions"."registration" AS "Request__Request_companions_registration", "Request__Request_companions"."category" AS "Request__Request_companions_category", "Request__Request_companions"."photoUrl" AS "Request__Request_companions_photoUrl", "Request__Request_companions"."created_at" AS "Request__Request_companions_created_at", "Request__Request_companions"."updated_at" AS "Request__Request_companions_updated_at", "Request__Request_companions"."academicBackground" AS "Request__Request_companions_academicBackground", "Request__Request_companions"."supervision" AS "Request__Request_companions_supervision", "Request__Request_companions"."user_type" AS "Request__Request_companions_user_type", "Request__Request_subjects"."id" AS "Request__Request_subjects_id", "Request__Request_subjects"."class_group" AS "Request__Request_subjects_class_group", "Request__Request_subjects"."student_count" AS "Request__Request_subjects_student_count", "Request__Request_subjects"."workload" AS "Request__Request_subjects_workload", "Request__Request_subjects"."file_data" AS "Request__Request_subjects_file_data", "Request__Request_subjects"."file_name" AS "Request__Request_subjects_file_name", "Request__Request_subjects"."file_type" AS "Request__Request_subjects_file_type", "Request__Request_subjects"."created_at" AS "Request__Request_subjects_created_at", "Request__Request_subjects"."updated_at" AS "Request__Request_subjects_updated_at", "Request__Request_subjects"."subjectId" AS "Request__Request_subjects_subjectId", "Request__Request_subjects"."requestId" AS "Request__Request_subjects_requestId", "Request__Request_locations"."id" AS "Request__Request_locations_id", "Request__Request_locations"."location" AS "Request__Request_locations_location", "Request__Request_locations"."municipality" AS "Request__Request_locations_municipality", "Request__Request_locations"."period_start" AS "Request__Request_locations_period_start", "Request__Request_locations"."period_end" AS "Request__Request_locations_period_end", "Request__Request_locations"."total_distance_km" AS "Request__Request_locations_total_distance_km", "Request__Request_locations"."created_at" AS "Request__Request_locations_created_at", "Request__Request_locations"."updated_at" AS "Request__Request_locations_updated_at", "Request__Request_locations"."requestId" AS "Request__Request_locations_requestId", "Request__Request_itinerary"."id" AS "Request__Request_itinerary_id", "Request__Request_itinerary"."date" AS "Request__Request_itinerary_date", "Request__Request_itinerary"."origin" AS "Request__Request_itinerary_origin", "Request__Request_itinerary"."destination" AS "Request__Request_itinerary_destination", "Request__Request_itinerary"."activity" AS "Request__Request_itinerary_activity", "Request__Request_itinerary"."departureTime" AS "Request__Request_itinerary_departureTime", "Request__Request_itinerary"."arrivalTime" AS "Request__Request_itinerary_arrivalTime", "Request__Request_itinerary"."unpaved_road_km" AS "Request__Request_itinerary_unpaved_road_km", "Request__Request_itinerary"."kilometers" AS "Request__Request_itinerary_kilometers", "Request__Request_itinerary"."roadCondition" AS "Request__Request_itinerary_roadCondition", "Request__Request_itinerary"."has_wooden_bridge" AS "Request__Request_itinerary_has_wooden_bridge", "Request__Request_itinerary"."has_ferry" AS "Request__Request_itinerary_has_ferry", "Request__Request_itinerary"."has_toll" AS "Request__Request_itinerary_has_toll", "Request__Request_itinerary"."created_at" AS "Request__Request_itinerary_created_at", "Request__Request_itinerary"."updated_at" AS "Request__Request_itinerary_updated_at", "Request__Request_itinerary"."requestId" AS "Request__Request_itinerary_requestId", "Request__Request_resources"."id" AS "Request__Request_resources_id", "Request__Request_resources"."resource" AS "Request__Request_resources_resource", "Request__Request_resources"."quantity" AS "Request__Request_resources_quantity", "Request__Request_resources"."quantity_per_day" AS "Request__Request_resources_quantity_per_day", "Request__Request_resources"."created_at" AS "Request__Request_resources_created_at", "Request__Request_resources"."updated_at" AS "Request__Request_resources_updated_at", "Request__Request_resources"."requestId" AS "Request__Request_resources_requestId", "Request__Request_teacher"."id" AS "Request__Request_teacher_id", "Request__Request_teacher"."name" AS "Request__Request_teacher_name", "Request__Request_teacher"."email" AS "Request__Request_teacher_email", "Request__Request_teacher"."password" AS "Request__Request_teacher_password", "Request__Request_teacher"."registration" AS "Request__Request_teacher_registration", "Request__Request_teacher"."category" AS "Request__Request_teacher_category", "Request__Request_teacher"."photoUrl" AS "Request__Request_teacher_photoUrl", "Request__Request_teacher"."created_at" AS "Request__Request_teacher_created_at", "Request__Request_teacher"."updated_at" AS "Request__Request_teacher_updated_at", "Request__Request_teacher"."academicBackground" AS "Request__Request_teacher_academicBackground", "Request__Request_teacher"."user_type" AS "Request__Request_teacher_user_type", "Request__Request_coordinator"."id" AS "Request__Request_coordinator_id", "Request__Request_coordinator"."name" AS "Request__Request_coordinator_name", "Request__Request_coordinator"."email" AS "Request__Request_coordinator_email", "Request__Request_coordinator"."password" AS "Request__Request_coordinator_password", "Request__Request_coordinator"."registration" AS "Request__Request_coordinator_registration", "Request__Request_coordinator"."category" AS "Request__Request_coordinator_category", "Request__Request_coordinator"."photoUrl" AS "Request__Request_coordinator_photoUrl", "Request__Request_coordinator"."created_at" AS "Request__Request_coordinator_created_at", "Request__Request_coordinator"."updated_at" AS "Request__Request_coordinator_updated_at", "Request__Request_coordinator"."supervision" AS "Request__Request_coordinator_supervision", "Request__Request_coordinator"."user_type" AS "Request__Request_coordinator_user_type", "Request__teacherConsentDisciplines"."id" AS "Request__teacherConsentDisciplines_id", "Request__teacherConsentDisciplines"."date" AS "Request__teacherConsentDisciplines_date", "Request__teacherConsentDisciplines"."time_in" AS "Request__teacherConsentDisciplines_time_in", "Request__teacherConsentDisciplines"."time_out" AS "Request__teacherConsentDisciplines_time_out", "Request__teacherConsentDisciplines"."created_at" AS "Request__teacherConsentDisciplines_created_at", "Request__teacherConsentDisciplines"."updated_at" AS "Request__teacherConsentDisciplines_updated_at", "Request__teacherConsentDisciplines"."teacherId" AS "Request__teacherConsentDisciplines_teacherId", "Request__teacherConsentDisciplines"."disciplineId" AS "Request__teacherConsentDisciplines_disciplineId", "Request__teacherConsentDisciplines"."consentId" AS "Request__teacherConsentDisciplines_consentId", "Request__teacherConsentDisciplines"."requestId" AS "Request__teacherConsentDisciplines_requestId", "Request__teacherConsents"."id" AS "Request__teacherConsents_id", "Request__teacherConsents"."accepted" AS "Request__teacherConsents_accepted", "Request__teacherConsents"."signature" AS "Request__teacherConsents_signature", "Request__teacherConsents"."opinion" AS "Request__teacherConsents_opinion", "Request__teacherConsents"."created_at" AS "Request__teacherConsents_created_at", "Request__teacherConsents"."updated_at" AS "Request__teacherConsents_updated_at", "Request__teacherConsents"."consent_type" AS "Request__teacherConsents_consent_type", "Request__teacherConsents"."userTeacherId" AS "Request__teacherConsents_userTeacherId", "Request__teacherConsents"."requestId" AS "Request__teacherConsents_requestId", "Request__teacherConsents"."userCoordinatorId" AS "Request__teacherConsents_userCoordinatorId", "Request__teacherConsents"."userDirectorId" AS "Request__teacherConsents_userDirectorId", "Request__coordinatorConsents"."id" AS "Request__coordinatorConsents_id", "Request__coordinatorConsents"."accepted" AS "Request__coordinatorConsents_accepted", "Request__coordinatorConsents"."signature" AS "Request__coordinatorConsents_signature", "Request__coordinatorConsents"."opinion" AS "Request__coordinatorConsents_opinion", "Request__coordinatorConsents"."created_at" AS "Request__coordinatorConsents_created_at", "Request__coordinatorConsents"."updated_at" AS "Request__coordinatorConsents_updated_at", "Request__coordinatorConsents"."consent_type" AS "Request__coordinatorConsents_consent_type", "Request__coordinatorConsents"."userTeacherId" AS "Request__coordinatorConsents_userTeacherId", "Request__coordinatorConsents"."requestId" AS "Request__coordinatorConsents_requestId", "Request__coordinatorConsents"."userCoordinatorId" AS "Request__coordinatorConsents_userCoordinatorId", "Request__coordinatorConsents"."userDirectorId" AS "Request__coordinatorConsents_userDirectorId", "Request__directorConsents"."id" AS "Request__directorConsents_id", "Request__directorConsents"."accepted" AS "Request__directorConsents_accepted", "Request__directorConsents"."signature" 
AS "Request__directorConsents_signature", "Request__directorConsents"."opinion" AS "Request__directorConsents_opinion", "Request__directorConsents"."created_at" AS "Request__directorConsents_created_at", "Request__directorConsents"."updated_at" AS "Request__directorConsents_updated_at", "Request__directorConsents"."consent_type" AS "Request__directorConsents_consent_type", "Request__directorConsents"."userTeacherId" AS "Request__directorConsents_userTeacherId", "Request__directorConsents"."requestId" AS "Request__directorConsents_requestId", "Request__directorConsents"."userCoordinatorId" AS "Request__directorConsents_userCoordinatorId", "Request__directorConsents"."userDirectorId" AS "Request__directorConsents_userDirectorId" FROM "ufra_requests"."requests" "Request" LEFT JOIN "ufra_requests"."users" "Request__Request_user" ON "Request__Request_user"."id"="Request"."userId"  LEFT JOIN "ufra_requests"."request_companions" "Request_Request__Request_companions" ON "Request_Request__Request_companions"."requestsId"="Request"."id" LEFT JOIN "ufra_requests"."users" "Request__Request_companions" ON "Request__Request_companions"."id"="Request_Request__Request_companions"."usersId"  LEFT JOIN "ufra_requests"."subjects" "Request__Request_subjects" ON "Request__Request_subjects"."requestId"="Request"."id"  LEFT JOIN "ufra_requests"."locations" "Request__Request_locations" ON "Request__Request_locations"."requestId"="Request"."id"  LEFT JOIN "ufra_requests"."itinerary_items" "Request__Request_itinerary" ON "Request__Request_itinerary"."requestId"="Request"."id"  LEFT JOIN "ufra_requests"."resources" "Request__Request_resources" ON "Request__Request_resources"."requestId"="Request"."id"  LEFT JOIN "ufra_requests"."users" "Request__Request_teacher" ON "Request__Request_teacher"."id"="Request"."teacherId"  LEFT JOIN "ufra_requests"."users" "Request__Request_coordinator" ON "Request__Request_coordinator"."id"="Request"."coordinatorId"  LEFT JOIN "ufra_requests"."teacher_consent_disciplines" "Request__teacherConsentDisciplines" ON "Request__teacherConsentDisciplines"."requestId"="Request"."id"  LEFT JOIN "ufra_requests"."consents" "Request__teacherConsents" ON "Request__teacherConsents"."requestId"="Request"."id" AND "Request__teacherConsents"."consent_type"='teacher_consent'  LEFT JOIN "ufra_requests"."consents" "Request__coordinatorConsents" ON "Request__coordinatorConsents"."requestId"="Request"."id" AND "Request__coordinatorConsents"."consent_type"='coordinator_consent'  LEFT JOIN "ufra_requests"."consents" "Request__directorConsents" ON "Request__directorConsents"."requestId"="Request"."id" AND "Request__directorConsents"."consent_type"='director_consent'
✅ [Repository] Requests encontradas: [
  {
    "id": 4,
    "status": "Rascunho",
    "createdAt": "2025-03-24T02:40:04.809Z",
    "updatedAt": "2025-03-24T02:40:04.809Z",
    "user": {
      "id": 3,
      "name": "Hyago Colares",
      "email": "hyago.colares@ufra.edu.br",
      "password": "$2b$10$4VgAqnQyBh7LMBX0FjiZpO99yBaEjF87.Ld9u.56DIfrdR7zCz1mu",
      "registration": null,
      "category": "Director",
      "photoUrl": null,
      "createdAt": "2025-03-21T21:11:20.018Z",
      "updatedAt": "2025-03-21T21:11:20.018Z"
    },
    "companions": [
      {
        "id": 7,
        "name": "Ashaphe Colares",
        "email": "ashaphe.colares@example.com",
        "password": "senha123",
        "registration": "202301234",
        "category": "Coordinator",
        "photoUrl": "https://avatars.githubusercontent.com/u/176313660?v=4",
        "createdAt": "2025-03-23T03:01:17.202Z",
        "updatedAt": "2025-03-23T03:01:17.202Z"
      },
      {
        "id": 2,
        "name": "Renato Silva",
        "email": "renato.silva@ufra.edu.br",
        "password": "$2b$10$mZJzO8w2fXxYiT3FKB1mLux48tb0tJDKhyNpn2Zu/syyB7bO/4ssG",
        "registration": null,
        "category": "Coordinator",
        "photoUrl": null,
        "createdAt": "2025-03-21T21:11:13.614Z",
        "updatedAt": "2025-03-21T21:11:13.614Z"
      }
    ],
    "subjects": [],
    "locations": [],
    "itinerary": [],
    "resources": [],
    "teacher": {
      "id": 1,
      "name": "Fabricio Araujo",
      "email": "fabricio.araujo@ufra.edu.br",
      "password": "$2b$10$9.TNNmZQfxpkoZPQ4WesQOwhx0eSC5vcc3ngKK5iowR9ys7/8Yici",
      "registration": null,
      "category": "Teacher",
      "photoUrl": null,
      "createdAt": "2025-03-21T21:10:17.254Z",
      "updatedAt": "2025-03-21T21:10:17.254Z",
      "academicBackground": null
    },
    "coordinator": null,
    "teacherConsentDisciplines": [],
    "teacherConsents": [],
    "coordinatorConsents": [],
    "directorConsents": []
  }
]
✅ [Controller] Requests retornadas: [
  {
    "id": 4,
    "status": "Rascunho",
    "createdAt": "2025-03-24T02:40:04.809Z",
    "updatedAt": "2025-03-24T02:40:04.809Z",
    "user": {
      "id": 3,
      "name": "Hyago Colares",
      "email": "hyago.colares@ufra.edu.br",
      "password": "$2b$10$4VgAqnQyBh7LMBX0FjiZpO99yBaEjF87.Ld9u.56DIfrdR7zCz1mu",
      "registration": null,
      "category": "Director",
      "photoUrl": null,
      "createdAt": "2025-03-21T21:11:20.018Z",
      "updatedAt": "2025-03-21T21:11:20.018Z"
    },
    "companions": [
      {
        "id": 7,
        "name": "Ashaphe Colares",
        "email": "ashaphe.colares@example.com",
        "password": "senha123",
        "registration": "202301234",
        "category": "Coordinator",
        "photoUrl": "https://avatars.githubusercontent.com/u/176313660?v=4",
        "createdAt": "2025-03-23T03:01:17.202Z",
        "updatedAt": "2025-03-23T03:01:17.202Z"
      },
      {
        "id": 2,
        "name": "Renato Silva",
        "email": "renato.silva@ufra.edu.br",
        "password": "$2b$10$mZJzO8w2fXxYiT3FKB1mLux48tb0tJDKhyNpn2Zu/syyB7bO/4ssG",
        "registration": null,
        "category": "Coordinator",
        "photoUrl": null,
        "createdAt": "2025-03-21T21:11:13.614Z",
        "updatedAt": "2025-03-21T21:11:13.614Z"
      }
    ],
    "subjects": [],
    "locations": [],
    "itinerary": [],
    "resources": [],
    "teacher": {
      "id": 1,
      "name": "Fabricio Araujo",
      "email": "fabricio.araujo@ufra.edu.br",
      "password": "$2b$10$9.TNNmZQfxpkoZPQ4WesQOwhx0eSC5vcc3ngKK5iowR9ys7/8Yici",
      "registration": null,
      "category": "Teacher",
      "photoUrl": null,
      "createdAt": "2025-03-21T21:10:17.254Z",
      "updatedAt": "2025-03-21T21:10:17.254Z",
      "academicBackground": null
    },
    "coordinator": null,
    "teacherConsentDisciplines": [],
    "teacherConsents": [],
    "coordinatorConsents": [],
    "directorConsents": []
  }
]"