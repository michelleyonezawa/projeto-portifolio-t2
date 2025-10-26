const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/swagger.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../../resources/swagger.json'));
});

module.exports = router;
