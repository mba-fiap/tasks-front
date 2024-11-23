Feature: Cadastro de usuário

Scenario: Cadastro bem-sucedido com dados válidos

    Dado que o usuário está na página de cadastro
    Quando o usuário preenche o campo "Nome" com "João Silva"
    E o campo "Email" com "joao.silva@email.com"
    E o campo "Senha" com "senhaSegura123"
    E o campo "Confirmar Senha" com "senhaSegura123"
    E o usuário clica no botão "Cadastrar"
    Então o usuário deve ser redirecionado para a página inicial
    E o título da página deve ser "Bem-vindo, João Silva!"
    E o usuário deve ver a mensagem "Cadastro realizado com sucesso."

Scenario: Erro no cadastro - senha não confirmada corretamente

    Dado que o usuário está na página de cadastro
    Quando o usuário preenche o campo "Nome" com "Maria Oliveira"
    E o campo "Email" com "maria.oliveira@email.com"
    E o campo "Senha" com "senhaSegura123"
    E o campo "Confirmar Senha" com "senhaErrada123"
    E o usuário clica no botão "Cadastrar"
    Então o usuário deve ver uma mensagem de erro "As senhas não coincidem"
    E o usuário deve permanecer na página de cadastro


Scenario: Erro no cadastro - email já existente

    Dado que o usuário está na página de cadastro
    Quando o usuário preenche o campo "Nome" com "Carlos Souza"
    E o campo "Email" com "joao.silva@email.com"
    E o campo "Senha" com "novaSenha123"
    E o campo "Confirmar Senha" com "novaSenha123"
    E o usuário clica no botão "Cadastrar"
    Então o usuário deve ver uma mensagem de erro "Este email já está em uso"
    E o usuário deve permanecer na página de cadastro


Scenario: Erro no cadastro - email inválido

    Dado que o usuário está na página de cadastro
    Quando o usuário preenche o campo "Nome" com "Ana Costa"
    E o campo "Email" com "ana.costa@invalid"
    E o campo "Senha" com "senhaSegura456"
    E o campo "Confirmar Senha" com "senhaSegura456"
    E o usuário clica no botão "Cadastrar"
    Então o usuário deve ver uma mensagem de erro "Email inválido"
    E o usuário deve permanecer na página de cadastro

Scenario: Erro no cadastro - senha muito curta

    Dado que o usuário está na página de cadastro
    Quando o usuário preenche o campo "Nome" com "Fernanda Lima"
    E o campo "Email" com "fernanda.lima@email.com"
    E o campo "Senha" com "123"
    E o campo "Confirmar Senha" com "123"
    E o usuário clica no botão "Cadastrar"
    Então o usuário deve ver uma mensagem de erro "A senha deve ter no mínimo 6 caracteres"
    E o usuário deve permanecer na página de cadastro


Scenario: Erro no cadastro - campos obrigatórios vazios

    Dado que o usuário está na página de cadastro
    Quando o usuário deixa o campo "Nome" vazio
    E o campo "Email" vazio
    E o campo "Senha" vazio
    E o campo "Confirmar Senha" vazio
    E o usuário clica no botão "Cadastrar"
    Então o usuário deve ver mensagens de erro para "Nome é obrigatório", "Email é obrigatório", "Senha é obrigatória" e "Confirmar Senha é obrigatório"
    E o usuário deve permanecer na página de cadastro



Scenario: Erro no cadastro - senha e confirmar senha diferentes

    Dado que o usuário está na página de cadastro
    Quando o usuário preenche o campo "Nome" com "Lucas Pereira"
    E o campo "Email" com "lucas.pereira@email.com"
    E o campo "Senha" com "senha12345"
    E o campo "Confirmar Senha" com "senha1234"
    E o usuário clica no botão "Cadastrar"
    Então o usuário deve ver uma mensagem de erro "As senhas não coincidem"
    E o usuário deve permanecer na página de cadastro


