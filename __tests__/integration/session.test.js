// importações
const request = require('supertest'); 
// O Supertest é uma biblioteca criada especificamente para testar os servidores http nodejs

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

//-------------------------------------------
// descrição de teste autenticação
describe('Autentication', () => { // usado para separar pontos de aplicação 'categoria dos testes'
  beforeEach(async () => { //executa automaticamente  antes de cada um dos teste de sessions
    await truncate(); //executa a função
  })
  //-------------------------------------------
  // validando credenciais de login validas
  it('should authenticate with valid credentials', async () => { //aviso/mensagem de rro que virá no teste
    const user = await factory.create('User', { //criando usuario com factory e faker
      password: '123123'//definição de senha para comparação
    })

    const response = await request(app) // aguarda requisição a rota /sessions com email e senha
      .post("/sessions") // rota de seção/login
      .send({ // campos de email e senha requeridos
        email: user.email, // campo criado pelo faker
        password: '123123' // campos corretos
      });
    expect(response.status).toBe(200); // esperando status ok
  });
  //-------------------------------------------
  // validando credenciais de login não validas
  it('should not autheticate with invalid credentials', async () => { //aviso/mensagem de rro que virá no teste
    const user = await factory.create('User', {  //criando usuario com factory e faker
      password: '123123' //definição de senha para comparação
    })

    const response = await request(app) // aguarda requisição a rota /sessions com email e senha
      .post("/sessions") // rota de seção/login
      .send({ // campos de email e senha requeridos
        email: user.email,
        password: '123456' // campos senha incoreto
      });
    expect(response.status).toBe(401); // esperando status de erro
  });

  //-------------------------------------------
  //validando token autenticado função definida em User.js
  it('should return jwt tokem autenticated', async () => { //aviso/mensagem de rro que virá no teste
    const user = await factory.create('User', {  //criando usuario com factory e faker
      password: '123123' //definição de senha para comparação
    })

    const response = await request(app) // aguarda requisição a rota /sessions com email e senha
      .post("/sessions")
      .send({
        email: user.email,
        password: '123123'
      });
    expect(response.body).toHaveProperty('token'); //espera que o token seja valido, ou seja o login fooi efetuado
  });

  //-------------------------------------------
  //validando autorização a rota privada com token ok
  it('should be able to acess private routes when autenticated', async () => { //aviso/mensagem de rro que virá no teste
    const user = await factory.create('User', {  //criando usuario com factory e faker
      password: '123123' //definição de senha para comparação
    });

    const response = await request(app)// aguarda requisição a rota /dashboard  com autorizaçõ e token invalido
      .get('/dashboard') // rota de dashboard 
      .set('Authorization', `Bearer ${user.generateToken()}`); //para enviar um tokem jwt sempre precisa colocar o bearer na frente
    //envia autorização mais o token jwt

    expect(response.status).toBe(200); // esperado estatus ok
  });

  //-------------------------------------------
  //validando  não autorização a rota privada sem token 
  it('should not be able to acess private routes without jwt token', async () => {//aviso/mensagem de erro que virá no teste
    const response = await request(app).get('/dashboard'); //aguarda requisição a rota sem token
    // se não for enviado a autorização e o token para rota rebece status 401 (erro)
    expect(response.status).toBe(401); //esperado status 401 (erro)
  });

  //-------------------------------------------
  //validando  não autorização a rota privada com token  invalido
  it('should not be to access private routes with invalid jwt', async () => { //aviso/mensagem de erro que virá no teste
    const response = await request(app) //aguarda requisição a rota com token invalido
      .get('/dashboard')
      .set('Autorization', `Bearer 123123`); //para enviar um tokem jwt sempre precisa colocar o bearer na frente

    expect(response.status).toBe(401); //esperado status 401 (erro)
  });

  it('should not access if token is not decrypted', async () => {
    const user = await factory.create('User', {  //criando usuario com factory e faker
      password: '123123' //definição de senha para comparação
    });

    const response = await request(app)// aguarda requisição a rota /dashboard  com autorizaçõ e token invalido
      .get('/dashboard') // rota de dashboard 
      .set('Authorization', `Bearer ${!user.generateToken()}`); //para enviar um tokem jwt sempre precisa colocar o bearer na frente
    //envia autorização mais o token jwt
  });
  //-------------------------------------------
  //validando  se o user não existe
  it('should check if the user exists', async () => {
    const user = await factory.create('User', { //criando usuario com factory e faker
      email: 'ldggfjijjjw'//definição de email para comparação


    });

    const response = await request(app) // aguarda requisição a rota /sessions com email e senha
      .post("/sessions") // rota de seção/login
      .send({ // campos de email e senha requeridos
        email: '1qeg12rt214',

      });
    expect(response.status).toBe(401); // esperando status de erro
  });

});
