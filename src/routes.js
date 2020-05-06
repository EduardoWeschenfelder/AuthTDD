const routes = require('express').Router(); //importando

const authMiddleware = require('./app/middleware/auth') // importação do arquivo de rota de validação de token

const SessionController = require('./app/controllers/sessionsController'); // inportaçáo do arquivo que verifica email e senha

 routes.post('/sessions', SessionController.store); //rota que verifica email e senha para fazer login 

 routes.use(authMiddleware); // rota que valida o token de login

 routes.get('/dashboard', (req, res) => { //rota dashboard
   return res.status(200).send(); // definido 200 para dar ok
 })

module.exports = routes; // exporta o arquivo de rotas