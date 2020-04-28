//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://admin:admin@mongo/teste_node_mongo';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
module.exports = mongoose;
//db.createUser({user: "admin", pwd: "admin", roles: [{role: "dbOwner", db: "teste_node_mongo"}]});