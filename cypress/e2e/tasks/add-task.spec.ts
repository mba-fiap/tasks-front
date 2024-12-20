describe('Add Task Modal', () => {
  beforeEach(() => {
    cy.loginWithTasks()

    cy.visit('/tasks')

    cy.get('[data-cy="openModalAddTask"]').click()
  })

  it('Should add a new task successfully', () => {
    const taskTitle = 'New Task'

    cy.intercept('POST', '**/tasks', { statusCode: 201 }).as('createTask')

    cy.intercept('GET', '**/tasks', {
      fixture: 'tasks.json',
    }).as('listTasks')

    cy.get('[data-cy="addTaskModalTitleInput"]').type(taskTitle)

    cy.get('[data-cy="addTaskModalAddBtn"]').click()

    cy.wait('@createTask').its('response.statusCode').should('eq', 201)

    cy.contains(taskTitle).should('exist')
  })

  it('Should show validation error when title is missing', () => {
    cy.get('[data-cy="addTaskModalAddBtn"]').click()

    cy.contains('O título da tarefa é obrigatório').should('be.visible')
  })
})
