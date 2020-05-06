const jwt = require('jsonwebtoken');
const { promisify } = require('util'); 
// promisify É a conversão de uma função que aceita um retorno de chamada em uma função que retorna uma promessa

//Funções de middleware são funções que têm acesso ao objeto de solicitação ( req), 
//ao objeto de resposta ( res) e à próxima função de middleware no ciclo de solicitação-resposta do aplicativo. 
// A função de middleware próxima é comumente denotada por uma variável chamada next.

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization; // recebe a requisão de autorização

  if (!authHeader) { // se não for atorizado, retorma mensagen de token não fornecido
    return res.status(401).json({ message: "token not provided" });
  }
  // como o token vem em duas partes (Bearer 146946) é preciso pegar s'a segunda parte e rmover os espaços 
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET); 
    //transforma a função jwt.verify em  uma promisse

    req.userId = decoded.id; // se o token for validoarmazena en uma variavel req para que todas as rotas tenham acesso
   
    return next();
  }catch (err){ //caso não decofifique o token ele cai no erro: token invalido
      return res.status(401).json( {message: "Token invalid" });
    } 
};