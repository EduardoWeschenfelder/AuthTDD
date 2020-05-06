const { User } = require('../models') //importação model user

//const factory = require('../factories');

class SessionController { //função em forma de classe
  async store(req, res) { // store armazena chamadas
    const { email, password } = req.body // recebe email e senha pelo corpo da requisição

    const user = await User.findOne({ where: { email } }) // consulta usuarios pelo email campo que não pode repetir
 
    if (!user) { // se não encontrar o usuario pelo email
      return res.status(401).json({ message: "user not found" }); // retorna user não exite/ou não encontrado
    }
    // se a senha não coresponder a checkPassword
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'incorrect password' }); // retorna senha incorreta
    }

    return res.json({ // retorna uma resposta, o usuario e o token em formato json
      user,
      token: user.generateToken()
    });
  }
}

module.exports = new SessionController(); //instancia uma nova sessão