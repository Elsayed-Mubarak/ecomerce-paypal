/*var mongoose = require('mongoose');
var config = require('./db');

mongoose.connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('>.............mongo server start..............');
})


*/

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);
mongoose.connect('mongodb://172.17.0.2:27017/ecomerce-paypal', { useNewUrlParser: true ,useUnifiedTopology: true }, function (err) {

    if (err) return console.error(err);
console.log('*****************');
    console.log('connection successed to mongoDb>>> ecomerce-paypal-managment');
});
// mongoose.connect('mongodb://admin:admin@localhost:27017/tooli-user-managment');
module.exports = {
    mongoose
};
