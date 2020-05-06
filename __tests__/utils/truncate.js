// arquivo para apagar as alterações no banco feitas pelos testes
const { sequelize } = require('../../src/app/models');

module.exports = () => {
  return Promise.all( // ecapsula os comandos para que sejam exeucutados pois são processos que podem demorar 
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true }); //apaga todos os dados
    })
  );
};