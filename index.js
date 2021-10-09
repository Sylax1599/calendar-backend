

const express= require('express');
const { dbConnection } = require('./database/config');
const cors=require('cors');

require('dotenv').config();


//Crear el servidor de express

const app = express();


//Lectura y parseo dle body

app.use(express.json());


//Base de datos

dbConnection();

//CORS
app.use(cors());


//Rutas

//TODO: Auth //crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));




//Directorio publico

app.use( express.static('public'));



const PORT=process.env.PORT;

//Escuchar peticiones
app.listen( PORT, ()=>{
    console.log("Servidor en puerto "+ PORT);
})
