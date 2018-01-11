var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());
//ada 2 argument, 1 adalah URL dan 2. adalah callback dgn req + res
app.post('/todos',(req,res)=> {
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        //console.log('Save sukses',doc);
        res.send(doc);
    }, (e)=>{
        //console.log('Simpan gagal', e);
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todo) => {
        res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});

module.exports = {app};




//# LATIHAN yg SEBELUMNYA
// var newUser = new User ({
//     email: '    ebaskom@gmail.com'
// });

// newUser.save().then((doc)=> {
//     console.log('Simpan sukses',doc)
// }, (e) => {
//     console.log('Simpan gagal ' , e);
// });
// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then ((doc)=>{
//     console.log('Save sukses ' + doc);
// },(e) => {
//     console.log('Error save gagal');
// });

// var myTodo = new Todo ({
//     text: '  Makan Siang       '
// });

// myTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined, 2));
// }, (e)=> {
//     console.log('Gagal simpan');
// });