var conexao = require('./conexaoBanco');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// 1. Conecte ao banco de dados uma única vez, quando a aplicação for iniciada.
// Isso evita que o erro de handshake aconteça.
conexao.connect(function(error) {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
    }
    console.log("Conectado ao banco de dados!");
});

// Rota para carregar a página de cadastro
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/cadastro.html');
});

// Rota para processar o formulário de cadastro
app.post('/', function(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    // 2. Use a conexão já estabelecida para executar a query.
    var sql = "INSERT INTO estudante (nome, email, senha) VALUES (?, ?, ?)";
    conexao.query(sql, [nome, email, senha], function(error, result) {
        if (error) {
            console.error('Erro ao inserir estudante:', error);
            return res.status(500).send('Erro ao inserir estudante');
        }
        res.redirect('/estudantes');
    });
});

// Rota para exibir a lista de estudantes
app.get('/estudantes', function(req, res) {
    // 3. Use a mesma conexão para buscar os dados.
    var sql = "SELECT * FROM estudante";
    conexao.query(sql, function(error, result) {
        if (error) {
            console.error('Erro ao buscar estudantes:', error);
            return res.status(500).send('Erro ao buscar estudantes');
        }
        //console.log(result);
        res.render('estudantes', { estudante: result });
    });
});
//Rota do delete
app.delete('/delete-estudantes', function(req, res) {
   const id = req.body.id;
   conexao.query('DELETE FROM estudante WHERE id = ?', [id], function(error) {
         if (error) {
                console.error('Erro ao deletar estudante:', error);
                return res.status(500).send('Erro ao deletar estudante');
            }
            res.redirect('estudantes');
        });
            


    });

//Rota Update
app.get('/update-estudantes', function(req, res) {
    var sql = "select * from estudante WHERE id=?";
    var id = req.query.id;
    conexao.query(sql, [id], function(error, result) {
        if (error) console.log(error);
        res.render(__dirname + "/alterarestudantes", { estudante: result});
        
        });
    });

app.put('/update-estudantes', function(req, res) {
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var sql = "UPDATE estudante SET nome=?, email=?, senha=? WHERE id=?";
    conexao.query(sql, [nome, email, senha, id], function(error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao atualizar estudante');
        }
       
        res.redirect('/estudantes');
    });
});
        


// Inicia o servidor na porta 7000
        app.listen(7000, () => {
    console.log("Servidor rodando na porta 7000");
});