
require('dotenv').config({
  // se tiver uma variavel node_env e ela for = a 'test' eu carrego o arquivo .env.test, senão o proprio arquivo .env 
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  // crio uma variavel global de tempo de execução para carregar o arquivos .env.test e .venv
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT ||'postgres',
  storage: './__tests__/database.sqlite',
  //operatorsAliases: false, // desabilita um warning en versoes anteriores a v5 quevem do sequelize
  logging: false, //não mostrar muitos logs
  define: {
    timestamps: true, //força com que toda tabela criada no banco venha com data de criação e atulização automaticamente
    underscored: true, // faz a nomeação no formato de anderline  ex:'user_group' 
    underscoredAll: true // faz com que a nomeação de arquivos ocoras tbm nos campos da tabela
  }
};