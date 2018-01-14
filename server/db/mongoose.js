var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect('mongodb://ebaskom:kemayoran00@ds247327.mlab.com:47327/ebaskom');

module.exports = (mongoose);