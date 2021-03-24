// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de Datos
if (process.env.NODE_ENV === 'dev') {
    // process.env.URLDB = "mongodb://localhost:27017/appPlanner";
    process.env.URLDB = "mongodb+srv://Admin:Alondra0729@cluster0.cn9sh.mongodb.net/appPlanner?retryWrites=true&w=majority";
} else {
    process.env.URLDB = "mongodb+srv://Admin:Alondra0729@cluster0.cn9sh.mongodb.net/appPlanner?retryWrites=true&w=majority";
}

// Declaración de array de middleweres a usar en las APIS
process.middlewares = []; //