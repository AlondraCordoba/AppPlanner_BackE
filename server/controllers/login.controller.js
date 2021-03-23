const express = require('express');
const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/users.model');
const app = express();
const _ = require('underscore');

// El login puede ser por medio de un GET o un POST
// http://localhost:3000/login/
app.post('/', async(req, res) => {
    let body = req.body;
    //await UsuarioModel.findOne({ username: body.username, status: true }, (err, usuario) => {

    UsuarioModel.findOne({ username: body.username, status: true }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento del logeo',
                err
            });
        }

        // Si no existe ningun UsuarioModel o si su status estaba en false
        /*if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email incorrecto o inexistente, intentelo de nuevo'
            });
        }*/
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Username incorrecto o inexistente, intentelo de nuevo'
            });
        }


        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(401).json({
                ok: false,
                msg: 'Password incorrecto, intentelo de nuevo',
                err
            });
        }

        res.json({
            ok: true,
            msg: `Bienvenido ${usuario.username}`,
            usuario
        })

        /*if (usuario && usuario.role == 'USER_ROLE') {
            return res.status(401).json({
                ok: true,
                msg: `Bienvenido ${usuario.username}`,
                usuario
            }), res.redirect("https://www.google.com/");
        } else if (usuario && usuario.role == 'ADMIN_ROLE') {
            return res.status(401).json({
                ok: true,
                msg: `Bienvenido ${usuario.username}`,
                usuario
            });
        }*/

    });
});

module.exports = app;