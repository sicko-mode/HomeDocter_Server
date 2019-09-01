const express = require('express');
const router = express.Router();

const Room = require('../models').Room;

router.get('/', async (req, res, next) => {
    const room = await Room.findAll();
    if(room) res.json(room);
});

module.exports = router;
