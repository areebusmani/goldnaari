const express = require('express');

const router = express.Router()

router.get('/register', (req, res) => {
    res.send('Registered');
});

router.get('*', (req, res) => {
    res.send('Unkown route');
});

module.exports = router;