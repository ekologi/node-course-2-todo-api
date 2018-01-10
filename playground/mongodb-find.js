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

    //find mengembalikan cursor
    // db.collection('Todos').find({ completed:false}).toArray().then((docs)=>{
    //      console.log('Todos');
    //      console.log(JSON.stringify(docs, undefined,2));
    // },(err) => {
    //     console.log('Gak bisa fetch data dari database',err);
    // });
    db.collection('Todos').find({text:'Suatu teks'}).toArray().then ((docs)=> {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err)=>{
        console.log('Tidak bisa ambil data text' + err);
    }); 
    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos');
    //     console.log('Todos count: ' + count);
    // }, (err) => {
    //     console.log('Gak bisa fetch data dari database', err);
    // });
    // db.close();
});

