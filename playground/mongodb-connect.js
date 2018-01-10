// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);
// var url = "mongodb://localhost:27017/TodoApp";
MongoClient.connect('mongodb://localhost:27017/Users', (err, db) => {
    if (err) {
        return console.log('Gak bisa terhubung ke mongdb server');
    }
    console.log('Terhubung ke mongodb');

    // var myObj = {name: 'Ebas', age:47, location:'10640'}
    // db.collection('Users').insertOne(myObj,(err,res)=>{
    //     if (err) {
    //         return console.log('Gak berhasil insert todo', err);
    //     }        
    //     console.log('1 Document added ' + JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
    //     db.close();
    // });
    db.close();
});


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var myobj = { name: "Company Inc", completed: "false" };
//     db.collection("todos").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
//     if (err) {
//         return console.log('Gak bisa terhubung ke mongdb server');
//     }
//     console.log('Terhubung ke mongodb');
//     //insertOne ada 2 argument - 1. Object, 2. adalah function
//     db.collection('Todos').insertOne({
//         text: 'Suatu teks',
//         Completed: false
//     }, (err, result) => {
//         if (err) {
//             return console.log('Gak berhasil insert todo', err);
//         }
//         console.log(JSON.stringify(result.ops,undefined,2));
//     });

//     db.close();
// });

