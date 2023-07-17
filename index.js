
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./databases/config');


//ver todas las variables de entorno
//console.log(process.env);

//crear el servidor de express
const app= express();

//Base de datos
dbConnection();

//CORS proteccion de las rutas
app.use(cors());

//Directorio Publico
app.use(express.static('public'));


//Lectura y parseo del body
app.use(express.json());

//          RUTAS
//TODO auth //crear,login, renew
app.use('/api/auth',require('./routes/auth'));
//TODO CRUD: Eventos
app.use('/api/events',require('./routes/events'));


//const port = process.env.PORT || 4000;
//escuchar peticiones
//app.listen(port);

app.get("*",(req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
})
app.listen(process.env.PORT,() =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})
