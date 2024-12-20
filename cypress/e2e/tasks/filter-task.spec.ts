describe('Filter Tasks Modal', () => {
  beforeEach(() => {
    cy.loginWithTasks()

    cy.visit('/tasks')
  })

  it('Should open the filter modal', () => {
    cy.get('[data-cy="openFilterButton"]').click()

    cy.contains('Filtrar Tarefas').should('exist')
  })

  it('Should apply filters and display filtered tasks', () => {
    cy.intercept('GET', '**/tasks', {
      fixture: 'filteredTasks.json',
    }).as('filterTasks')

    cy.get('[data-cy="openFilterButton"]').click()

    cy.get('[data-cy="filterModalInputTitle"]').type('Filtrada')

    cy.get('[data-cy="filterTaskBtn"]').click()

    cy.wait('@filterTasks').its('response.statusCode').should('eq', 200)

    cy.contains('Itens para sua busca').should('exist')
  })

  it('Should clear filters', () => {
    cy.get('[data-cy="openFilterButton"]').click()

    cy.get('[data-cy="filterModalInputTitle"]').type('Filtrada')

    cy.get('[data-cy="filterTaskBtn"]').click()

    cy.get('[data-cy="clearFilterButton"]').should('exist')
  })
})
