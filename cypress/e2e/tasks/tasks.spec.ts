describe('Tasks Module', () => {
  it('Should load the page and display the empty state', () => {
    cy.loginEmpty()

    cy.visit('/tasks')

    cy.contains('Você ainda não possui tarefas cadastradas!').should('exist')

    cy.get('[data-cy="emptyStateAddTaskButton"]').should('exist')
  })

  it('Should open Add Task modal when clicking the button', () => {
    cy.loginWithTasks()

    cy.visit('/tasks')

    cy.get('[data-cy="openModalAddTask"]').click()

    cy.get('[data-cy="addTasksModal"]').should('be.visible')
  })

  it('Must list tasks correctly', () => {
    cy.loginWithTasks()

    cy.visit('/tasks')

    cy.intercept('GET', '**/tasks', { fixture: 'tasks.json' }).as('getTasks')

    cy.contains('New Task').should('exist')
  })

  it('Should complete a task and update the list', () => {
    cy.loginWithTasks()

    cy.visit('/tasks')

    cy.intercept('GET', '**/tasks', { fixture: 'tasks.json' }).as('getTasks')

    cy.intercept('POST', '**/complete', { statusCode: 200 }).as('completeTask')

    cy.wait('@getTasks')

    cy.get('[data-cy="tasksListCompleteTask"]').first().click()

    cy.wait('@completeTask').its('response.statusCode').should('eq', 200)
  })

  it('Should redirect to login page if not authenticated', () => {
    cy.clearLocalStorage()

    cy.visit('/tasks')

    cy.url().should('include', '/login')
  })
})
