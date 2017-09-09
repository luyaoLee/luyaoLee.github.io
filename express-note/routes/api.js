var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
    console.log('/notes...')
});
router.post('/notes/add', function(req, res, next) {
    console.log('/notes/add...')
});
router.post('/notes/edit', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/notes/delete', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
