const express = require('express');

require('dotenv').config();

const port = process.env.PORT;

const app = express()

app.get('/',function(request,response){
	console.log(__dirname + '/public/index.html')
	//response.send('hello')
	//response.sendFile(__dirname + '/public/index.html');
	response.redirect(307, process.env.FRONTEND_URL)
})

app.get('/hola/:name', function(request, response){
	const name = request.params.name;
	response.send(`hello ${name}`)
})

app.get('*', function (request, response){
	response.send('404 pagina no encontrada');
})


app.listen(port, function(){
	console.log('servidor listo!')
})
