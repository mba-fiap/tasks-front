describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should render all fields and buttons', () => {
    cy.get('[data-cy="registerFieldName"]').should('be.visible')

    cy.get('[data-cy="registerFieldEmail"]').should('be.visible')

    cy.get('[data-cy="registerFieldPassword"]').should('be.visible')

    cy.get('[data-cy="registerButtonSubmit"]').should('be.visible')
  })

  it('should show required validation messages', () => {
    cy.get('[data-cy="registerButtonSubmit"]').click()

    cy.contains('Informe o nome!').should('be.visible')

    cy.contains('Informe um e-mail!').should('be.visible')

    cy.contains('Informe uma senha!').should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('[data-cy="registerFieldEmail"]').type('invalidemail')

    cy.get('[data-cy="registerButtonSubmit"]').click()

    cy.contains('E-mail inválido!').should('be.visible')
  })

  it('should validate password length', () => {
    cy.get('[data-cy="registerFieldPassword"]').type('123')

    cy.get('[data-cy="registerButtonSubmit"]').click()

    cy.contains('A senha deve ter no mínimo 6 caracteres!').should('be.visible')
  })

  it('should submit the form successfully', () => {
    cy.get('[data-cy="registerFieldName"]').type('John Doe')

    cy.get('[data-cy="registerFieldEmail"]').type('johndoe@example.com')

    cy.get('[data-cy="registerFieldPassword"]').type('123456')

    cy.intercept('POST', '/users', {
      statusCode: 201,
      fixture: 'register.json',
    }).as('registerRequest')

    cy.intercept('POST', '/sessions', {
      statusCode: 200,
      fixture: 'login.json',
    }).as('loginRequest')

    cy.get('[data-cy="registerButtonSubmit"]').click()

    cy.wait('@registerRequest').its('response.statusCode').should('eq', 201)

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)

    cy.url().should('include', '/tasks')
  })

  it('should display error when email is already registered', () => {
    cy.get('[data-cy="registerFieldName"]').type('John Doe')

    cy.get('[data-cy="registerFieldEmail"]').type('johndoe@example.com')

    cy.get('[data-cy="registerFieldPassword"]').type('123456')

    cy.intercept('POST', '/users', {
      statusCode: 400,
      body: {
        message: 'USER_ALREADY_EXISTS',
      },
    }).as('registerRequest')

    cy.get('[data-cy="registerButtonSubmit"]').click()

    cy.wait('@registerRequest').its('response.statusCode').should('eq', 400)

    cy.get('.ant-notification-notice.USER_ALREADY_EXISTS').should('be.visible')

    cy.url().should('include', '/register')
  })

  it('should navigate to login page when clicking the login button', () => {
    cy.get('[data-cy="registerButtonSubmit"]').next('button').click()

    cy.url().should('include', '/login')
  })
})
