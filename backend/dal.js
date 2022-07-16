const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
const url         = 'mongodb://database:27017';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");
    // connect to myproject database
    db = client.db('myproject');
});

// find user account
function find(uuid){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({uuid: uuid})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find One user account
function findOne(uuid){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({uuid: uuid})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// insert user account uuid with initial balance 0
function insert(uuid, amount = 0){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {uuid, balance: amount};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// update - deposit/withdraw amount
function update(uuid, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {uuid: uuid},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// withdraw amount
function withdraw(uuid, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {uuid: uuid},
                { $inc: { balance: - amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {insert, findOne, find, update, withdraw, all};