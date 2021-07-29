var router = require('express').Router();
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const { JWT_KEY, ALGO, KEY } = require('./../config/DB');
const User = require('../models/users');
const mongoose = require('mongoose');
router.post('/register', async function (req, res) {
	const user = await User.findOne({ email:req.body.email });
	 if (user)
        return res.status(403).json({ error: { message: 'Email already in use!' } });
    var cipher = crypto.createCipher(ALGO, KEY);
    var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    let data = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: encrypted
    });
   await data.save().then((result) => {
        jwt.sign({ result }, JWT_KEY, { expiresIn: '3000s' }, (error, token) => {
            res.status(201).json({ token })
        })
    }).catch((error) => console.log(error));
});

router.post('/login',async function (req, res) {
	const user = await User.findOne({ email: req.body.email });
	 if (!user)
        return res.status(403).json({ error: { message: 'invalid email' } });
	 var decipher = crypto.createDecipher(ALGO, KEY);
     var decrypted = decipher.update(user.password, 'hex', 'utf8') + decipher.final('utf8');
     if (decrypted == req.body.password) {
            jwt.sign({ user }, JWT_KEY, { expiresIn: '3000s' }, (error, token) => {
                res.status(200).json({ token })
            })
        }
		else{
			 return res.status(403).json({ error: { message: 'invalid password' } });
		}
})
module.exports = router;