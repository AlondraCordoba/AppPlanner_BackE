/*jshint esversion: 9*/
const UsuarioModel = require('../models/users.model');
const ToDoListModel = require('../models/toDoList.model')

const express = require('express');

const app = express();


// http://localhost:3000/toDoList/?idUsuario=603e51f51a35a066388f0f28
app.get('/', async(req, res) => {

    try {

        let idToDoList = '';

        const idUsuario = req.query.idUsuario;

        if (req.query.idToDoList)
            idToDoList = req.query.idToDoList;

        let queryFind = {};
        let queryOptions = {};

        if (idToDoList) {
            queryFind = {
                '_id': idUsuario,
                'toDoList': {
                    $elemMatch: {
                        '_id': idToDoList
                    }
                }
            };
            queryOptions = { 'toDoList.$': 1 };
        } else {
            queryFind = {
                '_id': idUsuario
            };
            queryOptions = {};
        }

        if (idUsuario == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        if (toDoList.length <= 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'No se encontraron eventos  en la base de datos.',
                cont: {
                    toDoList
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion obtenida correctamente.',
                cont: {
                    toDoList
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al obtener los eventos.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }


});

// http://localhost:3000/toDoList/?idUsuario=603e51f51a35a066388f0f28
app.post('/', async(req, res) => {

    try {
        const idUsuario = req.query.idUsuario;

        if (idUsuario == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        const toDoList = new ToDoListModel(req.body);
        let err = toDoList.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar la toDoList.',
                cont: {
                    err
                }
            });
        }

        const toDoListDisponible = await UsuarioModel.findOne({ _id: idUsuario });

        if (toDoListDisponible == null) {
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: no se encontro el toDoList.',
                cont: 0
            });
        } else {
            const nuevatoDoList = await UsuarioModel.findByIdAndUpdate(idUsuario, { $push: { 'toDoList': toDoList } }, { new: true });

            if (nuevatoDoList.length <= 0) {
                res.status(400).send({
                    estatus: '400',
                    err: true,
                    msg: 'No se pudo registrar el evento en la base de datos.',
                    cont: 0
                });
            } else {
                res.status(200).send({
                    estatus: '200',
                    err: false,
                    msg: 'Informacion insertada correctamente.',
                    cont: {
                        toDoList
                    }
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al registrar el evento.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/toDoList/?idUsuario=603e51f51a35a066388f0f28&idToDoList=603e5d996dcc7c2108734283
app.put('/', async(req, res) => {

    try {

        const idUsuario = req.query.idUsuario;
        const idToDoList = req.query.idToDoList;

        if (idUsuario == undefined || idToDoList == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idToDoList;

        const toDoList = new ToDoListModel(req.body);
        let err = toDoList.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al actualizar la evento.',
                cont: {
                    err
                }
            });
        }

        const nuevatoDoList = await UsuarioModel.findOneAndUpdate({ '_id': idUsuario, 'toDoList._id': idToDoList }, { $set: { 'toDoList.$[i]': toDoList } }, { arrayFilters: [{ 'i._id': idToDoList }], new: true });

        if (nuevatoDoList.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo actualizar la evento en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion actualizada correctamente.',
                cont: {
                    toDoList
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al actualizar la toDoList.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});

// http://localhost:3000/toDoList/?idUsuario=603e51f51a35a066388f0f28&idToDoList=603e5d996dcc7c2108734283
app.delete('/', async(req, res) => {

    try {

        const idUsuario = req.query.idUsuario;
        const idToDoList = req.query.idToDoList;
        const blnActivo = req.body.blnActivo;

        if (idUsuario == undefined || idToDoList == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }


        const nuevatoDoList = await UsuarioModel.deleteOne({ '_id': idUsuario, 'toDoList._id': idToDoList });

        if (nuevatoDoList.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo eliminar la toDoList en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion eliminada correctamente.',
                cont: {
                    nuevatoDoList
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al actualizar el evento.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});

module.exports = app;