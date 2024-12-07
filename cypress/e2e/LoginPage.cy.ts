describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should render all fields and buttons', () => {
    cy.get('[data-cy="loginFieldEmail"]').should('be.visible')

    cy.get('[data-cy="loginFieldPassword"]').should('be.visible')

    cy.get('[data-cy="loginButtonSubmit"]').should('be.visible')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('[data-cy="loginButtonSubmit"]').click()

    cy.contains('Informe um e-mail!').should('be.visible')

    cy.contains('Informe uma senha!').should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('[data-cy="loginFieldEmail"]').type('invalidemail')

    cy.get('[data-cy="loginButtonSubmit"]').click()

    cy.contains('E-mail inválido!').should('be.visible')
  })

  it('should log in successfully with valid credentials', () => {
    cy.get('[data-cy="loginFieldEmail"]').type('johndoe@example.com')

    cy.get('[data-cy="loginFieldPassword"]').type('123456')

    cy.intercept('POST', '/sessions', {
      statusCode: 200,
      body: { message: 'Success' },
    }).as('loginRequest')

    cy.get('[data-cy="loginButtonSubmit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)

    cy.url().should('include', '/tasks')
  })

  it('should show error for invalid credentials', () => {
    cy.get('[data-cy="loginFieldEmail"]').type('johndoe@example.com')

    cy.get('[data-cy="loginFieldPassword"]').type('wrongpassword')

    cy.intercept('POST', '/sessions', {
      statusCode: 401,
      body: { message: 'INVALID_CREDENTIALS' },
    }).as('loginRequest')

    cy.get('[data-cy="loginButtonSubmit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)

    cy.get('.ant-notification-notice.INVALID_CREDENTIALS').should('be.visible')

    cy.url().should('include', '/login')
  })

  it('should navigate to register page when clicking the register button', () => {
    cy.get('[data-cy="loginButtonSubmit"]').next('button').click()

    cy.url().should('include', '/register')
  })
})
