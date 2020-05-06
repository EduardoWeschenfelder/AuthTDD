// arquivo que vem configurado com a inicialização do sequelize (yarn sequelize init)
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../../config/database'); //camhino do arquivo config 
const db = {};


const sequelize = new Sequelize(  // sequelize faz o mapeamento de dados relacionais 
  config.database,                //(tabelas, colunas e linhas) para objetos Javascript.
  config.username, 
  config.password,
  config
  ); 


fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
