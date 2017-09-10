var express = require('express');
var router = express.Router();
var Note = require('../model/note');

/* GET users listing. */
router.get('/notes', function(req, res, next) {
    Note.findAll({raw: true}).then(function(notes) {
        res.send({status: 0, data: notes});
    });
});
router.post('/notes/add', function(req, res, next) {
    console.log('/notes/add...')
});
router.post('/notes/edit', function(req, res, next) {
    console.log('/notes/edit...')
    res.send('respond with a resource');
});
router.post('/notes/delete', function(req, res, next) {
    console.log('/notes/delete...')
    res.send('respond with a resource');
});

module.exports = router;
