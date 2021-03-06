/*jshint esversion: 9*/
const UsuarioModel = require('../models/users.model');
const EventsCalendarModel = require('../models/eventsCalendar.model');

const express = require('express');

const app = express();


// http://localhost:3000/eventsCalendar/?idUsuario=603e51f51a35a066388f0f28
app.get('/', async(req, res) => {

    try {

        let idEventsCalendar = '';

        const idUsuario = req.query.idUsuario;

        if (req.query.idEventsCalendar)
            idEventsCalendar = req.query.idEventsCalendar;

        let queryFind = {};
        let queryOptions = {};

        if (idEventsCalendar) {
            queryFind = {
                '_id': idUsuario,
                'eventsCalendar': {
                    $elemMatch: {
                        '_id': idEventsCalendar
                    }
                }
            };
            queryOptions = { 'eventsCalendar.$': 1 };
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

        if (eventsCalendar.length <= 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'No se encontraron eventos  en la base de datos.',
                cont: {
                    eventsCalendar
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion obtenida correctamente.',
                cont: {
                    eventsCalendar
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

// http://localhost:3000/eventsCalendar/?idUsuario=603e51f51a35a066388f0f28
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

        const eventsCalendar = new EventsCalendarModel(req.body);
        let err = eventsCalendar.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar la eventsCalendar.',
                cont: {
                    err
                }
            });
        }

        const eventsCalendarDisponible = await UsuarioModel.findOne({ _id: idUsuario });

        if (eventsCalendarDisponible == null) {
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: no se encontro el eventsCalendar.',
                cont: 0
            });
        } else {
            const nuevaeventsCalendar = await UsuarioModel.findByIdAndUpdate(idUsuario, { $push: { 'eventsCalendar': eventsCalendar } }, { new: true });

            if (nuevaeventsCalendar.length <= 0) {
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
                        eventsCalendar
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

// http://localhost:3000/eventsCalendar/?idUsuario=603e51f51a35a066388f0f28&idEventsCalendar=603e5d996dcc7c2108734283
app.put('/', async(req, res) => {

    try {

        const idUsuario = req.query.idUsuario;
        const idEventsCalendar = req.query.idEventsCalendar;

        if (idUsuario == undefined || idEventsCalendar == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idEventsCalendar;

        const eventsCalendar = new EventsCalendarModel(req.body);
        let err = eventsCalendar.validateSync();

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

        const nuevaeventsCalendar = await UsuarioModel.findOneAndUpdate({ '_id': idUsuario, 'eventsCalendar._id': idEventsCalendar }, { $set: { 'eventsCalendar.$[i]': eventsCalendar } }, { arrayFilters: [{ 'i._id': idEventsCalendar }], new: true });

        if (nuevaeventsCalendar.length <= 0) {
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
                    eventsCalendar
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al actualizar la eventsCalendar.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});

// http://localhost:3000/eventsCalendar/?idUsuario=603e51f51a35a066388f0f28&idEventsCalendar=603e5d996dcc7c2108734283
app.delete('/', async(req, res) => {

    try {

        const idUsuario = req.query.idUsuario;
        const idEventsCalendar = req.query.idEventsCalendar;
        const blnActivo = req.body.blnActivo;

        if (idUsuario == undefined || idEventsCalendar == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }


        const nuevaeventsCalendar = await UsuarioModel.findOneAndUpdate({ '_id': idUsuario, 'eventsCalendar._id': eventsCalendar }, { $set: { 'eventsCalendar.$[i]': eventsCalendar } }, { arrayFilters: [{ 'i._id': eventsCalendar }], new: true });


        if (nuevaeventsCalendar.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo eliminar la eventsCalendar en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion eliminada correctamente.',
                cont: {
                    nuevaeventsCalendar
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