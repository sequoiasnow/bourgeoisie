const MongoClient = require('mongodb').MongoClient

module.exports = new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost:27017/example", (err, db) => {
        if( !err )
            return resolve(db)
        return reject(err)
    });
})
