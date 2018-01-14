require('./config/config');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

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

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    } 
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed ) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

// //PUNYA GW
// app.post('/users', (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//     var user = new User(body);

//     user.save().then(() => {
//         return user.generateAuthToken();
//     }).then((token) => {
//         res.header('x-auth', token).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// });

app.listen(port, ()=>{
    console.log('Server is running on port ' + port);
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