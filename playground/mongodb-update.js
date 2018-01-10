// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);
// var url = "mongodb://localhost:27017/TodoApp";
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Gak bisa terhubung ke mongdb server');
    }
    console.log('Terhubung ke mongodb');
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a5616ecbdd935cdad29d075')
    // }, {
    //     $set: {
    //         nama: 'Ebas'
    //     }
    // }, {
    //     returnOriginal: false
    // }).then ((result)=> {
    //     console.log(result);
    // })
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a5616ecbdd935cdad29d075')
    }, {
            $set: {
                nama: 'EkaBaskara'
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        })


    // db.close();
});

