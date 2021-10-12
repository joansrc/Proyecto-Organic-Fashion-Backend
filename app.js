require('dotenv').config();
const chalk = require('chalk');
const express = require('express');

require('./driver/mongo-connection');

const vendorsRouter = require('./routes/modvendors-routes');

const port = process.env.PORT;

const app = express()

app.use(express.json())

app.use('/api/vendors', vendorsRouter);
/*
app.get('/hola/:name', function(request, response){
	const name = request.params.name;
	response.send(`hello ${name}`)
})

app.get('*', function (request, response){
	response.send('404 pagina no encontrada');
})
*/

app.listen(port, function(){
	console.log('servidor listo!')
})
