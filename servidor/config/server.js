/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

//inculir middleware para configurar paginas status	
app.use(function(req,res,next){
	res.status(404).render('errors/404');
	next();

	//dessa maneira o express irá configura qualquer status e não apenas os de erro
})

//inculir middleware para configurar apenas msg de erros internos 	
app.use(function(err,req,res,next){
	res.status(500).render('errors/404');
	next();
})

/* exportar o objeto app */
module.exports = app;