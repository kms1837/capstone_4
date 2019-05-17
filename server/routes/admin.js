const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('admin_main.ejs');
});

router.get('/category', (request, response) => {
    response.render('admin_main.ejs');
});

router.get('/weight', (request, response) => {
    response.render('admin_main.ejs');
});

router.get('/track', (request, response) => {
    response.render('track.ejs');
});

router.get('/accept_waiting', (request, response) => {
    response.render('accept_waiting_list.ejs');
});

router.get('/accept_spec', (request, response) => {
    response.render('accept_spec.ejs');
});

module.exports = router;