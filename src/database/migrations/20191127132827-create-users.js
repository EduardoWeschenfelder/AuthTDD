// arquivi  criado apartir do comando  yarn sequelize migration:create --name=create-users

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { // executando migration
    return queryInterface.createTable("users", { // criando tabela de usuarios
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true,
        allownull: false, // compo não nulo
      },
      name: {
        type: Sequelize.STRING,   // compo de texto
        allownull: false, // compo não nulo
      },
      email: {
        type: Sequelize.STRING,   // compo nde texto
        unique: true,
        allownull: false, // compo não nulo
      },
      password_hash: {
        type: Sequelize.STRING, // compo nde texto
        allownull: false, // compo não nulo
      },
      created_at: {
        type: Sequelize.DATE, // compo nde texto
        allownull: false, // compo não nulo
      },
      updated_at: {
        type: Sequelize.DATE, // compo nde texto
        allownull: false, // compo não nulo
      },
    
    })
  },
 
  down: (queryInterface, Sequelize) => {  // desfazendo migration / voltando atraz
    return queryInterface.dropTable('users'); // excluindo tabela users
  }
};
