require('./config/database');
require('colors');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


// Conexion a BD (mongoDB)
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const hostname = '127.0.0.1';

const morgan = require('morgan');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Middlewares
app.use(morgan('dev'));
const opcionesGet = require('./middlewares/opcionesGet');
app.use(opcionesGet);

app.use('/', require('./routes/routes'));

// Habilitar CORS
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});


app.get('/', function(req, res) {
    res.send('<h1> Bienvenido a mi Servidor de Plan-IT</h1>')
})


// Conexion
//process.env.URLDB = "mongodb://localhost:27017/appPlanner";
process.env.URLDB = 'mongodb+srv://Admin:Alondra0729@cluster0.cn9sh.mongodb.net/appPlanner';
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((resp) => {
    console.log('[SERVER]'.green, `Base de datos ONLINE en ${process.env.URLDB}`);
}).catch((err) => {
    console.log('[SERVER]'.red, `Conexion fallida: ${err}`);
});

// Conexion
/*server = app.listen(process.env.PORT, hostname, () => {
    console.log('[SERVER]'.green, `running at http://${hostname}:${process.env.port}`);
});*/
app.listen(process.env.PORT, () => {
    console.log('[SERVER]'.green, `running at`, process.env.PORT);
});