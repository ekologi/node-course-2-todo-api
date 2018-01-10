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

    // db.collection('Todos').find({ text: 'Suatu teks' }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Tidak bisa ambil data text' + err);
    // });
    //delete many
    // db.collection('Todos').deleteMany({text: 'Suatu teks'}).then ((result)=> {
    //     console.log(result); 
    // });

    //delete one
    // db.collection('Todos').deleteOne({text:'Suatu teks'}).then ((result)=>{
    //     console.log(result);
    // });

    //find one and delete
    // db.collection('Todos').findOneAndDelete({completed:true}).then ((result)=> {
    //     console.log(result);
    // });
    //#1 delete many
    // db.collection('Users').deleteMany({nama:'Martin'}).then((result)=>{
    //     console.log(result);
    // });
    //#2 delete one
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5a5616fdbdd935cdad29d079')}).then ((result)=> {
        console.log(JSON.stringify(result,undefined,2));
    });


    // db.close();
});

