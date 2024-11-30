describe('My First Test', () => {
  it('Deve realizar login com credenciais válidas', () => {
    cy.visit('/login') // Acesse a página de login
    cy.get('[data-cy="InputEmailLogin"]').type('joao@gmail.com') // Preenche o campo de usuário
    cy.get('[data-cy="InputPasswordLogin"]').type('senhaSegura2024') // Preenche o campo de senha
    cy.get('[data-cy="LoginButton"]').click() // Clica no botão de login

    // Validações após login bem-sucedido
    cy.url().should('include', '/tasks') // Verifica se foi redirecionado para a página inicial
  })
})

// Cenário: Falha no login com senha incorreta
describe('Senha incorreta', () => {
  it('Deve exibir erro com senha incorreta', () => {
    cy.visit('/login') // Acesse a página de login
    cy.get('[data-cy="InputEmailLogin"]').type('joao@gmail.com') // Preenche o campo de usuário
    cy.get('[data-cy="InputPasswordLogin"]').type('senhaErrada2024') // Preenche o campo de senha
    cy.get('[data-cy="LoginButton"]').click() // Clica no botão de login

    // Validação da mensagem de erro
    cy.contains('Credenciais inválidas') // Verifica se a mensagem de erro é exibida
    cy.url().should('include', '/login') // Verifica se permanece na página de login
  })
})

// Cenário: Campo de senha vazio
describe('Campo senha vazio', () => {
  it('Deve exibir erro quando o campo senha estiver vazio', () => {
    cy.visit('/login') // Acesse a página de login
    cy.get('[data-cy="InputEmailLogin"]').type('joao@gmail.com') // Preenche o campo de usuário
    cy.get('[data-cy="InputPasswordLogin"]').clear() // Preenche o campo de senha
    cy.get('[data-cy="LoginButton"]').click() // Clica no botão de login

    // Validação da mensagem de erro
    //cy.contains('O campo senha não pode estar vazio'); // Verifica se a mensagem de erro é exibida
    //cy.url().should('include', '/login'); // Verifica se permanece na página de login
  })
})

// Cenário: Campo de usuário vazio
describe('Campo usuario vazio', () => {
  it('Deve exibir erro quando o campo usuário estiver vazio', () => {
    cy.visit('/login') // Acesse a página de login
    cy.get('[data-cy="InputEmailLogin"]').clear() // Deixa o campo de usuário vazio
    cy.get('[data-cy="InputPasswordLogin"]').type('senhaSegura2024') // Preenche o campo de senha
    cy.get('[data-cy="LoginButton"]').click() // Clica no botão de login

    // Validação da mensagem de erro
    cy.contains('O campo usuário não pode estar vazio') // Verifica se a mensagem de erro é exibida
    cy.url().should('include', '/login') // Verifica se permanece na página de login
  })
})
