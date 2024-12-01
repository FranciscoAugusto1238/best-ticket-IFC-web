# Título do Projeto

Best Ticket

# Grupo

Felipe Biava Favarin e Francisco Augusto Neves Moreira Souza

# Ferramentas Usadas

IDE Visual Studio Code
Framework Vue.js
Banco de Dados Oracle Database, linguagem SQL
Github
Linguagem Java
Linguagem JavaScript
IDE IntelliJ IDEA
Linguagens HTML e CSS
Uso do Node.JS
API REST

## Versões

Vue 3.2.13
Pinia 2.1.4
Axios 1.4.0
Keycloak-js 22.0.1
Firebase 10.7.1

*demais versões/requisitos estão no arquivo package.json

## Tema escolhido

Sistema de Gerenciamento de Eventos: Um sistema para gerenciamento de eventos acadêmicos, que permita aos alunos visualizar os eventos em andamento no campus, inscrever-se neles, avaliá-los e sugerir novos eventos. O administrador deve poder cadastrar os eventos, incluindo todas as informações relevantes, e os alunos devem ter a opção de se inscrever.

## Funcionalidades implementadas

### Cadastro de Usuário

Sistema de cadastro completo com as principais perguntas e alternativas, como seu sexo, peso, altura, data de nascimento, idade, estado civil, cpf e um campo caso o usuário seja menor de idade, deve informar o nome e contato de um parente, neste caso, foi escolhido a parte materna.
Contém dados sobre sua cidade, estado, rua, número, bairro e cep.
Formas de contato como telefone fixo, celular e e-mail.
Restrições alimentares ou o uso de medicamentos.

### Barra lateral

Uma barra lateral estilizada com CSS contendo os seguintes direcionamentos.
 - Início
 - Sobre
 - Cadastro Eventos
 - Comprar Eventos
 - Cadastro Permissão
 - Cadastro Permissão Usuario
 - Listar Permissão Usuario
 - Listar Usuario

### Início

Permite ver os eventos que estão em andamento.

### Sobre

Uma rota que explica sobre a nossa missão com o projeto, sua criação e a equipe envolvida na realização.

### Cadastro de Eventos

Procura pelos eventos numa pesquisa rápida, exclua ou adicione um novo evento, colocando seu nome, descrição, local, o organizador e o valor do evento.

### Comprar Eventos

Aqui onde estão listadas suas compras, onde você pode adicionar outras, avaliá-las ou excluí-las

### Cadastro Permissão

>> Aqui é possível criar permissões para os usuários.

### Cadastro Permissão Usuário

>> Após a criação da permissão, é possível adicioná-la ao usuário desejado

### Lista Permissão Usuário

>> Listagem das permissões de cada usuário, se este for o admin, pode removê-las

### Lista Usuário

>> Listagem dos usuários cadastrados, permitindo a edição e exclusão destes

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
