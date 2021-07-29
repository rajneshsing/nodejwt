var router = require('express').Router();
const User = require('../models/users');

router.get('/list', function (req, res) {
    
    User.find().then((result) => {
        res.status(200).json(result)
    })

})

module.exports = router;