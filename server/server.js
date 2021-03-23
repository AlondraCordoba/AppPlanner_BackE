require('./config/database');
require('colors');

const express = require('express');

// Conexion a BD (mongoDB)
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const hostname = '127.0.0.1';

//const morgan = require('morgan');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Middlewares
//app.use(morgan('dev'));
//const opcionesGet = require('./middlewares/opcionesGet');

// Habilita CORS
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

//app.use(opcionesGet);
app.use('/', require('./routes/routes'));

// process.env.URLDB = "mongodb://localhost:27017/appPlanner";
process.env.URLDB = 'mongodb://localhost:27017/appPlanner';

app.get('/', function(req, res) {
    res.send('<h1> Bienvenido a mi Servidor de Plan-IT</h1>')
})


// Conexion
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
server = app.listen(process.env.PORT, hostname, () => {
    console.log('[SERVER]'.green, `running at http://${hostname}:${process.env.port}`);
});