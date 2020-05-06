const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {  //exportar uma função que recebe dois parametros
  const User = sequelize.define(
    "User",
    { //define model "user" com os campos
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL, //presente somente no model, não aparece na base de dados
      password_hash: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8) //aguardo o a senha ser criptografada em 8 rounds
          }
        }
      }
    }
  );

  User.prototype.checkPassword = function (password){ // prototype são tipagem dinamica ( a checagem ocorre em tempo de execução)
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.generateToken = function() {
    return jwt.sign({id: this.id}, process.env.APP_SECRET);
  };

  return User;
};