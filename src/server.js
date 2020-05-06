// arquivo de configuração de portas do servidor

const app = require('./app');

// busca por uma variavel chamada PORT e se não encontrar usa a porta 3000 (facilita deploy)
app.listen(process.env.PORT || 3000);
