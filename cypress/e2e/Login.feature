Feature: Login

Scenario: Login com sucesso

    Given que o usuário está na página de login
    When o usuário preenche o campo "E-mail" com "johndoe@example.com"
    And o campo "Senha" com "123456"
    And o usuário clica no botão "Login"
    Then o usuário deve ser redirecionado para a página inicial


Scenario: Erro no Login - Senha incorreta

    Given que o usuário está na página de login
    When o usuário preenche o campo "E-mail" com "johndoe@example.com"
    And o campo "Senha" com "wrongpassword"
    And o usuário clica no botão "Login"
    Then o usuário deve ver uma mensagem de erro "Credenciais inválidas"
    And o usuário deve permanecer na página de login

Scenario: Erro no Login - Usuário não encontrado

    Given que o usuário está na página de login
    When o usuário preenche o campo "E-mail" com "non-existent-johndoe@example.co"
    And o campo "Senha" com "123456"
    And o usuário clica no botão "Login"
    Then o usuário deve ver uma mensagem de erro "Usuário não encontrado"
    And o usuário deve permanecer na página de login


Scenario: Erro no Login - Campo de senha vazio

    Given que o usuário está na página de login
    When o usuário preenche o campo "E-mail" com "johndoe@example.com"
    And deixa o campo "Senha" vazio
    And o usuário clica no botão "Login"
    Then o usuário deve ver uma mensagem de erro "Informe uma senha!"
    And o usuário deve permanecer na página de login

Scenario: Erro no Login - Campo de e-mail vazio

    Given que o usuário está na página de login
    When o usuário deixa o campo "E-mail" vazio
    And preenche o campo "Senha" com "123456"
    And o usuário clica no botão "Login"
    Then o usuário deve ver uma mensagem de erro "Informe um e-mail!"
    And o usuário deve permanecer na página de login