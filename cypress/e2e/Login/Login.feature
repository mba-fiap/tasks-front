Feature: Login

Scenario: Login com sucesso

    Given que o usuário está na página de login
    When o usuário preenche o campo "Usuário" com "joao123"
    And o campo "Senha" com "senhaSegura2024"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ser redirecionado para a página inicial
    And o título da página deve ser "Bem-vindo, João!"
    And o usuário deve ver a mensagem "Login realizado com sucesso."

Scenario: Erro no Login - Senha incorreta

    Dado que o usuário está na página de login
    Quando o usuário preenche o campo "Usuário" com "joao123"
    E o campo "Senha" com "senhaErrada2024"
    E o usuário clica no botão "Entrar"
    Então o usuário deve ver uma mensagem de erro "Credenciais inválidas"
    E o usuário deve permanecer na página de login

Scenario: Erro no Login - Usuário Inexistente

    Dado que o usuário está na página de login
    Quando o usuário preenche o campo "Usuário" com "usuarioInexistente"
    E o campo "Senha" com "qualquerSenha"
    E o usuário clica no botão "Entrar"
    Então o usuário deve ver uma mensagem de erro "Usuário não encontrado"
    E o usuário deve permanecer na página de login


Scenario: Erro no Login - Campo de senha vazio

    Dado que o usuário está na página de login
    Quando o usuário preenche o campo "Usuário" com "joao123"
    E deixa o campo "Senha" vazio
    E o usuário clica no botão "Entrar"
    Então o usuário deve ver uma mensagem de erro "O campo senha não pode estar vazio"
    E o usuário deve permanecer na página de login

Scenario: Erro no Login - Campo de usuário vazio

    Dado que o usuário está na página de login
    Quando o usuário deixa o campo "Usuário" vazio
    E preenche o campo "Senha" com "senhaSegura2024"
    E o usuário clica no botão "Entrar"
    Então o usuário deve ver uma mensagem de erro "O campo usuário não pode estar vazio"
    E o usuário deve permanecer na página de login