Feature: Register

Scenario: Registro com sucesso

    Given que o usuário está na página de registro
    When o usuário preenche o campo "Nome" com "John Doe"
    And o campo "E-mail" com "johndoe@example.com"
    And o campo "Senha" com "123456"
    And o usuário clica no botão "Cadastrar-se"
    Then o usuário deve ser redirecionado para a página inicial

Scenario: Erro no Registro - E-mail já registrado

    Given que o usuário está na página de registro
    When o usuário preenche o campo "Nome" com "John Doe"
    And o campo "E-mail" com "johndoe@example.com"
    And o campo "Senha" com "123456"
    And o usuário clica no botão "Cadastrar-se"
    Then o usuário deve ver uma mensagem de erro "Usuário já existe"
    And o usuário deve permanecer na página de registro


Scenario: Erro no Registro - Campos obrigatórios vazios

    Given que o usuário está na página de registro
    When o usuário deixa o campo "Nome" vazio
    And o campo "E-mail" vazio
    And o campo "Senha" vazio
    And o usuário clica no botão "Cadastrar-se"
    Then o usuário deve ver mensagens de erro:
        - "Informe o nome!"
        - "Informe um e-mail!"
        - "Informe uma senha!"
    And o usuário deve permanecer na página de registro


Scenario: Erro no Registro - Formato de e-mail inválido

    Given que o usuário está na página de registro
    When o usuário preenche o campo "Nome" com "John Doe"
    And o campo "E-mail" com "invalidemail"
    And o campo "Senha" com "123456"
    And o usuário clica no botão "Cadastrar-se"
    Then o usuário deve ver uma mensagem de erro "E-mail inválido!"
    And o usuário deve permanecer na página de registro

Scenario: Erro no Registro - Senha com menos de 6 caracteres

    Given que o usuário está na página de registro
    When o usuário preenche o campo "Nome" com "John Doe"
    And o campo "E-mail" com "johndoe@example.com"
    And o campo "Senha" com "123"
    And o usuário clica no botão "Cadastrar-se"
    Then o usuário deve ver uma mensagem de erro "A senha deve ter no mínimo 6 caracteres!"
    And o usuário deve permanecer na página de registro