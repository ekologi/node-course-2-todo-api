const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const { User } = require('./../server/models/user');



//cara 1
// Todo.remove({}).then((result) => {
//     console.log(result);
// });
//#2findOneAndRemove -menggunakan qury object
//'5a586dba52b1c9803a660200'
Todo.findOneAndRemove({_id: '5a586b8552b1c9803a6601ca'}).then((todo) => {
    console.log(todo);
});

// //#3 findByIdAndRemove
// Todo.findByIdAndRemove('5a586b8552b1c9803a6601ca').then((todo) => {
//     console.log(todo);
// });