const express = require('express');
const qs = require('qs');
const router = express.Router();

const Patient = require('../models').Patient;
const Doctor = require('../models').Doctor;

router.post('/signIn', async (req, res, next)=>{
    const user = await User.findOne({
        where: {id: req.body.id, password: req.body.password}
    });
    if (user) {
        res.json({
            id: user.id,
            name: user.name,
        })
    }
});

module.exports = router;
