var conexao = require('./conexaoBanco');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');



// Rota para carregar a página de cadastro
app.get('/', function(req, res) {
 res.sendFile(__dirname + '/cadastro.html');
});


// Rota para processar o formulário de cadastro
app.post('/', function(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;

  // Validação mais completa: verifica se nome, email E senha não estão vazios
 conexao.connect(function(error) {
    if (error) throw error;
    var sql = "INSERT INTO estudante (nome, email, senha) VALUES (?, ?, ?)";    
    conexao.query(sql, [nome, email, senha], function (error, result) {
      if (error) throw error;
     
      res.send("Estudante cadastrado com sucesso!"+ result.insertId);
    });
  });

    });

    app.get('/estudante', function(req, res) {
      conexao.connect(function(error) {
        if (error) throw error;
        var sql = "SELECT * FROM estudante";    
        conexao.query(sql, function (error, results) {
          if (error) console.log(error);
          
          console.log(results);
        });
      });
    });

    app.listen(7000);
    console.log("Servidor rodando na porta 7000");