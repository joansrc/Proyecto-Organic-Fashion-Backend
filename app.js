require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const cors =require('cors');

require('./driver/mongo-connection');

const vendorsRouter = require('./routes/modvendors-routes');
const productsRouter = require('./routes/modproducts-routes');

const port = process.env.PORT;

const app = express()

app.use(cors());
app.use(express.json())

app.use('/api/vendors', vendorsRouter);
app.use('/api/products', productsRouter);
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
