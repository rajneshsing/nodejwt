var router = require('express').Router();
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const { JWT_KEY, ALGO, KEY } = require('./../config/DB');
const User = require('../models/users');

router.post('/register', function (req, res) {
    console.warn("hello");
    var cipher = crypto.createCipher(ALGO, KEY);
    var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    console.warn("pass", encrypted);

    let data = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: encrypted
    })

    data.save().then((result) => {
        jwt.sign({ result }, JWT_KEY, { expiresIn: '3000s' }, (error, token) => {
            res.status(201).json({ token })
        })
    }).catch((error) => console.log(error));
});


router.post('/login', function (req, res) {
    console.warn(req.body.email);
    User.findOne({ email: req.body.email }).then((data) => {
        console.warn('data', data.password);
        var decipher = crypto.createDecipher(ALGO, KEY);
        var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
        console.warn('decrypted', decrypted);
        if (decrypted == req.body.password) {
            jwt.sign({ data }, JWT_KEY, { expiresIn: '3000s' }, (error, token) => {
                res.status(200).json({ token })
            })
        }
    }).catch((error) => console.log(error));
})

router.get('/list', function (req, res) {
    User.find().then((result) => {
        res.status(200).json(result)
    })

})

module.exports = router;