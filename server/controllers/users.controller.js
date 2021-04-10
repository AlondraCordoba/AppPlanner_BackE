/*jshint esversion: 9*/
const UsuarioModel = require('../models/users.model');
const Helper = require("../libraries/helper");
const email = require("../libraries/email");
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();


// http://localhost:3000/usuario/
app.get('/', async(req, res) => {
    try {
        if (req.query.idUsuario) req.queryMatch._id = req.query.idUsuario;
        if (req.query.termino) req.queryMatch.$or = Helper(["username", "email", "_id"], req.query.termino);

        const usuario = await UsuarioModel.find({...req.queryMatch })

        if (usuario.length <= 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'No se encontraron usuarios en la base de datos.',
                cont: {
                    usuario
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion obtenida correctamente.',
                numUsuarios: usuario.length,
                cont: {
                    usuario
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al obtener a los usuarios.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/usuario/
app.post('/', async(req, res) => {

    try {
        // const user = new UsuarioModel(req.body);
        const user = new UsuarioModel({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            role: req.body.role
        });

        let err = user.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar el usuario.',
                cont: {
                    err
                }
            });
        }

        const usuarioEncontrado = await UsuarioModel.findOne({ email: { $regex: `^${user.email}$`, $options: 'i' } });
        if (usuarioEncontrado) return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'El correo del usuario que desea registrar ya se encuentra en uso.',
            cont: {
                Email: usuarioEncontrado.email
            }
        });

        const usuarioEncontrado2 = await UsuarioModel.findOne({ username: { $regex: `^${user.username}$`, $options: 'i' } });
        if (usuarioEncontrado2) return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'El Username que desea registrar ya se encuentra en uso.',
            cont: {
                Username: usuarioEncontrado2.username
            }
        });
        const usuarioEncontrado3 = await UsuarioModel.findOne({ phoneNumber: { $regex: `^${user.phoneNumber}$`, $options: 'i' } });
        if (usuarioEncontrado3) return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'El Numero de Telefono que desea registrar ya se encuentra en uso.',
            cont: {
                PhoneNumber: usuarioEncontrado3.phoneNumber
            }
        });

        const usuario = await user.save();
        if (usuario.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo registrar el usuario en la base de datos.',
                cont: {
                    usuario
                }
            });
        } else {
            email.sendEmail(req.body.email);
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion insertada correctamente.',
                cont: {
                    usuario
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al registrar al usuario.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/usuario/?idUsuario=603939becf1db633f87595b2
app.put('/', async(req, res) => {
    try {

        const idUsuario = req.query.idUsuario;

        if (idUsuario == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idUsuario;

        const usuarioEncontrado = await UsuarioModel.findById(idUsuario);

        if (!usuarioEncontrado)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro al usuario en la base de datos.',
                cont: usuarioEncontrado
            });

        const newPersona = new UsuarioModel(req.body);

        let err = newPersona.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar la persona.',
                cont: {
                    err
                }
            });
        }

        const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(idUsuario, { $set: newPersona }, { new: true });

        if (!usuarioActualizado) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar actualizar la persona.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Se actualizo la persona correctamente.',
                cont: {
                    usuarioActualizado
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al actualizar la persona.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/usuario/?idUsuario=603939becf1db633f87595b2
app.delete('/', async(req, res) => {

    try {

        if (req.query.idUsuario == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        idUsuario = req.query.idUsuario;
        status = req.body.status;

        const usuarioEncontrado = await UsuarioModel.findById(idUsuario);

        if (!usuarioEncontrado)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro la persona en la base de datos.',
                cont: usuarioEncontrado
            });

        const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(idUsuario, { $set: { status } }, { new: true });

        if (!usuarioActualizado) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar eliminar la persona.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: `Success: Se a ${status === 'true'? 'activado': 'desactivado'} la persona correctamente.`,
                cont: {
                    usuarioActualizado
                }
            });
        }


    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al eliminar a la persona.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});


module.exports = app;