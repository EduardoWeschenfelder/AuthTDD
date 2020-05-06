const faker = require('faker') // componente que cria inumeros dados para testes
const { factory } = require('factory-girl'); //Funciona de forma assíncrona e suporta associações e o uso de funções para gerar atributos.
const { User } = require('../src/app/models'); //importação do model User

factory.define("User", User, { // utilização do factory para gerar atributos do user
  name: faker.name.findName(), // gera nome
  email: faker.internet.email(), // gera email
  password: faker.internet.password() // gera senha
})

module.exports = factory; // exportação do model