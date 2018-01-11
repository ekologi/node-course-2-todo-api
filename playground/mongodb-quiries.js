const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const { User } = require('./../server/models/user');

//var id = '5a57141839f20c38ec616d59';
var id = '5a563f5fadf73ba483952890';
// if (!ObjectID.isValid(id)) {
//     return console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos);
// }) ;

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log(todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('user not found');
    }
    console.log(JSON.stringify(user,undefined,2));
}).catch((e) => console.log(e));