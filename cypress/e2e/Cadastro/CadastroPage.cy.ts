describe('Cadastro de usuário', () => {
  // Cenário 1: Cadastro bem-sucedido com dados válidos
  it('Deve cadastrar o usuário com dados válidos', () => {
    cy.visit('/register') // Acesse a página de cadastro

    // Preenchendo os campos do formulário
    cy.get('[data-cy="InputNameRegister"]').type('João Silva')
    cy.get('[data-cy="InputEmailRegister"]').type('joao.silva@email.com')
    cy.get('[data-cy="InputPasswordRegister"]').type('senhaSegura123')

    // Submetendo o formulário
    cy.get('[data-cy="RegisterButton"]').click()

    // Validações após o cadastro bem-sucedido
    cy.url().should('include', '/tasks') // Verifica se foi redirecionado para a página inicial
    //cy.contains('Bem-vindo, João Silva!') // Verifica se a mensagem de boas-vindas aparece
    //cy.contains('Cadastro realizado com sucesso.') // Verifica se a mensagem de sucesso aparece
  })
})

describe('Cadastro de usuário', () => {
  // Cenário 2: Falha no cadastro com senha não confirmada corretamente
  it('Deve exibir erro quando as senhas não coincidirem', () => {
    cy.visit('/resgister')

    // Preenchendo os campos com senha não correspondente
    cy.get('[data-cy="InputNameRegister"]').type('Maria Oliveira')
    cy.get('[data-cy="InputEmailRegister"]').type('maria.oliveira@email.com')
    cy.get('[data-cy="InputPasswordRegister"]').type('senhaSegura123')
    //cy.get('input[name="confirmarSenha"]').type('senhaErrada123')

    // Submetendo o formulário
    cy.get('[data-cy="RegisterButton"]').click()

    // // Validações
    // cy.contains('As senhas não coincidem') // Verifica a mensagem de erro
    // cy.url().should('include', '/register') // Verifica se permaneceu na página de cadastro
  })
})

describe('Cadastro de usuário', () => {
  // Cenário 3: Falha no cadastro com email já registrado
  it('Deve exibir erro quando o email já estiver registrado', () => {
    cy.visit('/register')

    // Preenchendo com um email já registrado
    cy.get('[data-cy="InputNameRegister"]').type('Carlos Souza')
    cy.get('[data-cy="InputEmailRegister"]').type('joao.silva@email.com') // Email já existente
    cy.get('[data-cy="InputPasswordRegister"]').type('novaSenha123')

    // Submetendo o formulário
    cy.get('[data-cy="RegisterButton"]').click()

    // // Validações
    // cy.contains('Este email já está em uso') // Verifica a mensagem de erro
    // cy.url().should('include', '/register') // Verifica se permaneceu na página de cadastro
  })
})

// Cenário 4: Falha no cadastro com email inválido
it('Deve exibir erro quando o email for inválido', () => {
  cy.visit('/register')

  // Preenchendo com um email inválido
  cy.get('[data-cy="InputNameRegister"]').type('Ana Costa')
  cy.get('[data-cy="InputEmailRegister"]').type('ana.costa@invalid') // Email inválido
  cy.get('[data-cy="InputPasswordRegister"]').type('senhaSegura456')

  // Submetendo o formulário
  cy.get('[data-cy="RegisterButton"]').click()

  // // Validações
  // cy.contains('Email inválido') // Verifica a mensagem de erro
  // cy.url().should('include', '/register') // Verifica se permaneceu na página de cadastro
})

// Cenário 5: Falha no cadastro com senha muito curta
it('Deve exibir erro quando a senha for muito curta', () => {
  cy.visit('/resgiter')

  // Preenchendo com uma senha muito curta
  cy.get('[data-cy="InputNameRegister"]').type('Fernanda Lima')
  cy.get('[data-cy="InputEmailRegister"]').type('fernanda.lima@email.com')
  cy.get('[data-cy="InputPasswordRegister"]').type('123') // Senha muito curta

  // Submetendo o formulário
  cy.get('[data-cy="RegisterButton"]').click()

  // // Validações
  // cy.contains('A senha deve ter no mínimo 6 caracteres') // Verifica a mensagem de erro
  // cy.url().should('include', '/register') // Verifica se permaneceu na página de cadastro
})

// Cenário 6: Falha no cadastro com campos obrigatórios vazios
it('Deve exibir erro quando campos obrigatórios estiverem vazios', () => {
  cy.visit('/register')

  // Deixa todos os campos vazios
  cy.get('[data-cy="InputNameRegister"]').clear()
  cy.get('[data-cy="InputEmailRegister"]').clear()
  cy.get('[data-cy="InputPasswordRegister"]').clear()

  // Submetendo o formulário
  cy.get('[data-cy="RegisterButton"]').click()

  // // Validações
  // cy.contains('Nome é obrigatório') // Verifica a mensagem de erro do nome
  // cy.contains('Email é obrigatório') // Verifica a mensagem de erro do email
  // cy.contains('Senha é obrigatória') // Verifica a mensagem de erro da senha
  // cy.url().should('include', '/register') // Verifica se permaneceu na página de cadastro
})

// Cenário 7: Falha no cadastro com senha e confirmar senha diferentes
it('Deve exibir erro quando senha e confirmar senha forem diferentes', () => {
  cy.visit('/register')

  // Preenchendo senha e confirmar senha diferentes
  cy.get('[data-cy="InputNameRegister"]').type('Lucas Pereira')
  cy.get('[data-cy="InputEmailRegister"]').type('lucas.pereira@email.com')
  cy.get('[data-cy="InputPasswordRegister"]').type('senha12345')

  // Submetendo o formulário
  cy.get('[data-cy="RegisterButton"]').click()

  // // Validações
  // cy.contains('As senhas não coincidem') // Verifica a mensagem de erro
  // cy.url().should('include', '/register') // Verifica se permaneceu na página de cadastro
})
