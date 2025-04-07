# Processo de Criação de Request

## Visão Geral
O processo de criação de uma request envolve várias etapas e entidades relacionadas. Este documento explica o fluxo completo e os requisitos necessários.

## Estrutura da Request
Uma request é composta pelos seguintes elementos principais:

1. **Dados Básicos**
   - Status (DRAFT, IN_PROGRESS, PENDINGC, APPROVED, REJECTED)
   - Data de criação
   - Usuário solicitante

2. **Elementos da Viagem**
   - Companheiros (acompanhantes)
   - Disciplinas (subjects)
   - Locais (locations)
   - Itinerário
   - Recursos necessários

3. **Consentimentos**
   - Consentimento do Professor
   - Consentimento do Coordenador
   - Consentimento do Diretor

## Fluxo de Criação

1. **Validação Inicial**
   - Verificar se o usuário está autenticado
   - Validar os dados básicos da request

2. **Processamento de Relacionamentos**
   - Associar companheiros
   - Associar disciplinas
   - Associar locais
   - Configurar itinerário
   - Definir recursos

3. **Processamento de Consentimentos**
   - Criar consentimento do professor
   - Criar consentimento do coordenador
   - Criar consentimento do diretor

4. **Persistência**
   - Salvar a request no banco de dados
   - Salvar todos os relacionamentos
   - Salvar os consentimentos

## Exemplo de Payload

```json
{
  "user": {
    "id": 3
  },
  "companions": [],
  "status": "Rascunho",
  "subjects": [
    {
      "subject": {
        "id": 5
      },
      "classGroup": "2021",
      "studentCount": 10,
      "workload": 40,
      "fileData": "base64...",
      "fileName": "1.txt",
      "fileType": "text/plain"
    }
  ],
  "locations": [
    {
      "location": "UFRA",
      "municipality": "Paragominas",
      "periodStart": "2025-04-03",
      "periodEnd": "2025-04-04",
      "totalDistanceKm": 100
    }
  ],
  "itinerary": [
    {
      "date": "2025-04-03",
      "origin": "a",
      "destination": "b",
      "activity": "c",
      "departureTime": "08:00",
      "arrivalTime": "10:00",
      "unpavedRoadKm": "true",
      "kilometers": 10,
      "roadCondition": "Mediano",
      "hasWoodenBridge": "true",
      "hasFerry": "true",
      "hasToll": "true"
    }
  ],
  "resources": [
    {
      "resource": "Jantar",
      "quantity": 10,
      "quantityPerDay": 1
    }
  ],
  "consent": [
    {
      "teacher": {
        "id": 4
      },
      "discipline": {
        "id": 1
      },
      "date": "2025-04-04",
      "timeIn": "11:00",
      "timeOut": "13:00",
      "signature": ""
    }
  ]
}
```

## Validações Necessárias

1. **Dados Obrigatórios**
   - Usuário solicitante
   - Pelo menos uma disciplina
   - Pelo menos um local
   - Itinerário com pelo menos um item
   - Consentimento do professor

2. **Validações de Negócio**
   - Usuário deve ter permissão para criar request
   - Datas devem ser válidas
   - Professor deve existir
   - Disciplinas devem existir
   - Período do local deve estar dentro do itinerário

## Tratamento de Erros

- Erros de validação retornam 400
- Erros de permissão retornam 403
- Erros de banco de dados retornam 500
- Erros de negócio retornam 422

## Notificações

Após a criação bem-sucedida:
1. Email é enviado para o professor
2. Email é enviado para o coordenador
3. Sistema é atualizado com o novo status 