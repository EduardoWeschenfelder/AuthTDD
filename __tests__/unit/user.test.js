const bcrypt = require('bcryptjs') // para criptografar senhas

const factory = require('../factories'); //const { User } = require('../../src/app/models');

const truncate = require('../utils/truncate'); //importação de arquivo que exclui alterações no banco feitas nos testes
// descrição de testes do usuario
describe('user', () => {
  beforeEach(async () => { //a cada teste a guarda a execução da funçaõ truncate que elimina od dados de testes
    await truncate();
  })
  
  //-------------------------------------------
  //validando  se a senha é = a senha criptografada 
  it('should encript user password', async () => {
    const user = await factory.create('User', { //criando usuario com factory e faker
      password: '123123'//definição de senha para comparação
    })

    const compareHash = await bcrypt.compare('123123', user.password_hash) // capara a senha com a senha criptografada

    expect(compareHash).toBe(true); // esperado que a comparação seja ok
  });
})