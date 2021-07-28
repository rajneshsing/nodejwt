const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/db');
console.warn("con",config.DB);
mongoose.connect(config.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => { console.log("connected") })
app.use(bodyParser.json());
const auth = require('./middleware/auth');
//app.use('/list', require('./routes/info'));
app.use('/',auth, require('./routes/users'))
app.listen(5000, () => console.log('Server started on port 5000'));