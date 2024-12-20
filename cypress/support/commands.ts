import { AUTH_TOKEN_KEY } from '../../src/common/utils/auth'

Cypress.Commands.add('loginEmpty', () => {
  cy.request('POST', 'http://localhost:3000/sessions', {
    email: 'login.without.tasks@gmail.com',
    password: '123456',
  }).then(response => {
    expect(response.status).to.eq(200)

    const { token } = response.body

    window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  })
})

Cypress.Commands.add('loginWithTasks', () => {
  cy.request('POST', 'http://localhost:3000/sessions', {
    email: 'login.with.tasks@gmail.com',
    password: '123456',
  }).then(response => {
    expect(response.status).to.eq(200)

    const { token } = response.body

    window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  })
})

export {}
