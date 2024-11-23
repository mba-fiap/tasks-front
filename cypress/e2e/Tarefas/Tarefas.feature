Feature: Gerenciamento de tarefas

Scenario: Adicionar uma nova tarefa

    Dado que o usuário está na página de gerenciamento de tarefas
    Quando o usuário clica no botão "Adicionar Tarefa"
    E o usuário preenche o campo "Título" com "Comprar mantimentos"
    E o usuário preenche o campo "Descrição" com "Comprar frutas, verduras e leite"
    E o usuário seleciona a data de vencimento como "2024-11-10"
    E o usuário clica no botão "Salvar"
    Então a tarefa "Comprar mantimentos" deve aparecer na lista de tarefas
    E a tarefa deve ter a descrição "Comprar frutas, verduras e leite"
    E a tarefa deve ter a data de vencimento "2024-11-10"

Scenario: Editar uma tarefa existente

    Dado que o usuário tem uma tarefa com o título "Comprar mantimentos"
    E a tarefa tem a descrição "Comprar frutas, verduras e leite"
    E a tarefa tem a data de vencimento "2024-11-10"
    Quando o usuário clica no botão "Editar" da tarefa "Comprar mantimentos"
    E o usuário altera o campo "Título" para "Comprar mantimentos e pão"
    E o usuário altera a descrição para "Comprar frutas, verduras, leite e pão"
    E o usuário altera a data de vencimento para "2024-11-12"
    E o usuário clica no botão "Salvar"
    Então a tarefa deve ser atualizada com o título "Comprar mantimentos e pão"
    E a tarefa deve ter a descrição "Comprar frutas, verduras, leite e pão"
    E a tarefa deve ter a data de vencimento "2024-11-12"


Scenario: Excluir uma tarefa

    Dado que o usuário tem uma tarefa com o título "Comprar mantimentos e pão"
    Quando o usuário clica no botão "Excluir" da tarefa "Comprar mantimentos e pão"
    E o usuário confirma a exclusão
    Então a tarefa "Comprar mantimentos e pão" não deve aparecer na lista de tarefas


Scenario: Filtrar tarefas por data de vencimento

    Dado que o usuário tem tarefas com as seguintes datas de vencimento:
      | Título                           | Data de Vencimento |
      | Comprar mantimentos              | 2024-11-10         |
      | Comprar pão                      | 2024-11-12         |
      | Estudar para a prova             | 2024-11-14         |
    Quando o usuário aplica o filtro de data com o valor "2024-11-12"
    Então a lista de tarefas deve exibir apenas a tarefa "Comprar pão"
    E a tarefa "Comprar mantimentos" não deve ser exibida
    E a tarefa "Estudar para a prova" não deve ser exibida


Scenario: Filtrar tarefas por status

    Dado que o usuário tem tarefas com os seguintes status:
      | Título                           | Status   |
      | Comprar mantimentos              | Pendente |
      | Comprar pão                      | Concluída|
      | Estudar para a prova             | Pendente |
    Quando o usuário aplica o filtro de status com o valor "Pendente"
    Então a lista de tarefas deve exibir apenas as tarefas "Comprar mantimentos" e "Estudar para a prova"
    E a tarefa "Comprar pão" não deve ser exibida

Scenario: Filtrar tarefas por título

    Dado que o usuário tem tarefas com os seguintes títulos:
      | Título                |
      | Comprar mantimentos   |
      | Comprar pão           |
      | Estudar para a prova  |
    Quando o usuário aplica o filtro de título com o valor "comprar"
    Então a lista de tarefas deve exibir apenas as tarefas "Comprar mantimentos" e "Comprar pão"
    E a tarefa "Estudar para a prova" não deve ser exibida

Scenario: Adicionar uma tarefa sem título

    Dado que o usuário está na página de gerenciamento de tarefas
    Quando o usuário clica no botão "Adicionar Tarefa"
    E o usuário deixa o campo "Título" vazio
    E o usuário preenche o campo "Descrição" com "Comprar frutas"
    E o usuário seleciona a data de vencimento como "2024-11-10"
    E o usuário clica no botão "Salvar"
    Então o sistema deve exibir uma mensagem de erro "O título é obrigatório"
    E a tarefa não deve ser adicionada à lista

Scenario: Marcar uma tarefa como concluída

    Dado que o usuário tem uma tarefa com o título "Comprar mantimentos"
    Quando o usuário clica no botão "Concluir" da tarefa "Comprar mantimentos"
    Então o status da tarefa deve ser alterado para "Concluída"
    E a tarefa "Comprar mantimentos" deve aparecer na seção de tarefas concluídas


Scenario: Reverter o status de uma tarefa concluída para pendente

    Dado que o usuário tem uma tarefa com o título "Comprar mantimentos" com o status "Concluída"
    Quando o usuário clica no botão "Reverter" da tarefa "Comprar mantimentos"
    Então o status da tarefa deve ser alterado para "Pendente"
    E a tarefa "Comprar mantimentos" deve aparecer na seção de tarefas pendentes

