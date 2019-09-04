const express = require('express')
const bodyParser = require('body-parser');

//creo app express
const app = express();

//parsear requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//deshabilito cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, OPTIONS');
    next();
});

//defino una ruta simple
app.get('/', (request, result) =>{
    result.json({"message": "Welcome to Alti-Save application. Save to rise."})
})

//traigo routes
require('./app/routes/saving.routes')(app);
require('./app/routes/user.routes')(app);

//escuchar requests
const puerto = 3001;
app.listen(puerto, () => {
    console.log("Server escuchando al puerto " + puerto);
});

//traigo config de db
const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then( () =>{
    console.log("Conectado exitosamente!");
}).catch(err => {
    console.log('No se pudo conectar a la db.');
    process.exit();
})

