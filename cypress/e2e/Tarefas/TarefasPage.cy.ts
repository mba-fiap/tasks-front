describe.only('Gerenciamento de Tarefas', () => {
  it('Deve adicionar uma nova tarefa', () => {
    // Dado que o usuário está na página de gerenciamento de tarefas
    cy.visit('/tasks') // Substitua com a URL correta da página de gerenciamento de tarefas

    // Quando o usuário clica no botão "Adicionar Tarefa"
    cy.get('[data-cy="OpenTaskButton"]').click()

    // E o usuário preenche o campo "Título" com "Comprar mantimentos"
    cy.get('[data-cy="InputTitleTask"]').type('Comprar mantimentos')

    // E o usuário seleciona a data de vencimento como "2024-11-10"
    // cy.get('[data-cy="AddTaskCalendar"]').click()
    // cy.get('.ant-calendar-today').should('have.text', '10') // Selecionando a data de vencimento
    // cy.get('.ant-calendar-date').contains('10').click() // Seleciona o dia 10 na data picker
    cy.get('[data-cy="AddTaskCalendar"] .ant-picker-cell')
      .contains('15')
      .click()

    // E o usuário clica no botão "Salvar"
    cy.get('[data-cy="AddTaskButton"]').click()

    // Então a modal de adicionar tarefa deve ser fechada (não visível)
    // cy.get('[data-cy="TaskModal"]') // Verifique o seletor da modal, ajuste conforme a estrutura real
    //   .should('not.be.visible') // A modal não deve estar visível na tela

    // // Então a tarefa "Comprar mantimentos" deve aparecer na lista de tarefas
    // cy.get('.task-list')  // Substitua '.task-list' com o seletor correto da lista de tarefas
    //   .should('contain', 'Comprar mantimentos')

    // // E a tarefa deve ter a descrição "Comprar frutas, verduras e leite"
    // cy.get('.task-list .task')  // Seletor de item de tarefa, ajustar conforme a estrutura
    //   .should('contain', 'Comprar frutas, verduras e leite')

    // // E a tarefa deve ter a data de vencimento "2024-11-10"
    // cy.get('.task-list .task')  // Seletor de item de tarefa, ajustar conforme a estrutura
    //   .should('contain', '2024-11-10')
  })
})
