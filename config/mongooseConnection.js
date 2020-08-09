var mongoose = require('mongoose');
var config = require('./db');

mongoose.connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('>.............mongo server start..............');
})