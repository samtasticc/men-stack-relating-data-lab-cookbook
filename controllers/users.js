const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render(User)
    // console.log(User)
})


module.exports = router;