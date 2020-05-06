//arquivo de criação do servidor
require('dotenv').config({
  // se tiver uma variavel node_env e ela for = a 'test' eu carrego o arquivo .env.test, senão o proprio arquivo .env 
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  // crio uma variavel global de tempo de execução para carregar o arquivos .env.test e .venv
});
const express = require('express'); // importação express

class AppControler {//aplicação em formato de classe
  constructor() { //método que executa automaticamente
    this.express = express();

    this.middlewares(); //têm acesso ao objeto de solicitação ( req)e ao objeto de resposta ( res)
    this.routes();
  }

  middlewares() {
    this.express.use(express.json()); //permite a aplicação entender requisições e fomato json

  }
  routes() {
    this.express.use(require('./routes')); //busca o arquivo routes
  }
}

module.exports = new AppControler().express // instancia uma nova classe exporta somente a propriedade express